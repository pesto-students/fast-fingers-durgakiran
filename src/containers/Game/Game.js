import React, { useState, useEffect } from "react";
import Board from "../../components/Board/Board";
import "./Game.css";
import Over from "../../components/Over/Over";
import Action from "../Action/Action";

function Game(props) {
    const [ isGameOver, setIsGameOver ] = useState(false);
    const [ currentTimeInPlay, setCurrentTimeInPlay ] = useState(0);
    const [ scores, setScores ] = useState(null);
    const [bestIndex, setBestIndex ] = useState(0);
    let gameNumber = '1';

    useEffect(() => {
        if(props.stopGame) {
            updateScores();
            setCurrentTimeInPlay(0);
        }
        setIsGameOver(props.stopGame);
        createBoardJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.stopGame]);

    const createBoardJSON = () => {
        let currentBestScore = 0;
        let tmpBestIndex = 0;
        gameNumber = Number(sessionStorage.getItem('currentGameNumber'));
        const tmpScores = [];
        for(let i = 1; i <= gameNumber; i+= 1 ) {
            const currentScore = sessionStorage.getItem(String(i));
            if(Number(currentScore) >= Number(currentBestScore) ) {
                currentBestScore = Number(currentScore);
                tmpBestIndex = i - 1;
                sessionStorage.setItem('bestIndex', tmpBestIndex);
                setBestIndex((i-1));
            }
            tmpScores.push({
                best: false,
                number: Number(i),
                score: sessionStorage.getItem(String(i))
            });
        }
        if(tmpScores[tmpBestIndex]) {
            tmpScores[tmpBestIndex].best = true;
        }
        console.log(currentBestScore);
        setScores(tmpScores);
    }


    const play = () => {
        console.log("I am here too");
        props.playAgain();
        setIsGameOver(false);
    }

    const updateScores = () => {
        console.log(currentTimeInPlay);
        const currentGameNumber = sessionStorage.getItem('currentGameNumber');
        gameNumber = String(Number(currentGameNumber) + 1);
        sessionStorage.setItem(gameNumber, currentTimeInPlay);
        sessionStorage.setItem('currentGameNumber', gameNumber);
        createBoardJSON();
    }

    const gameOver =() => {
        props.onStopGame();
        setCurrentTimeInPlay(0);
        setIsGameOver(true);
    }

    const updateCurrentTime = (time) => {
        console.log("current success time", time);
        setCurrentTimeInPlay(time + currentTimeInPlay);
    }
    

    return (
        <div className="game">
            <div className="game__scores">
                <Board scores={scores} key={scores}/>
            </div>
            {
                isGameOver ? <div className="game__area">
                                <Over currentTimeInPlay={currentTimeInPlay} bestIndex={bestIndex}/>
                                <div className="game-complete__button" onClick={() => play()}>
                                    <img src="/reload.svg" alt="play again" />
                                    PLAY AGAIN
                                </div> 
                            </div>
                            :
                            <div className="game__area">
                                <Action onSuccess={(currentTime) => updateCurrentTime(currentTime) } onTimeExpired={ () => gameOver()}/>
                            </div>

            }
            <div className="game__occ-space"></div>
        </div>
    );
}

export default Game;
