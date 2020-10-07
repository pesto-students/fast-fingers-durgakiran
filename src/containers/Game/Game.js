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
    }, [props.stopGame]);

    const createBoardJSON = () => {
        let currentBestScore = 0;
        gameNumber = localStorage.getItem('currentGameNumber');
        const tmpScores = [];
        for(let i = 1; i <= gameNumber; i+= 1 ) {
            const currentScore = localStorage.getItem(String(i));
            if(currentScore >= currentBestScore ) {
                currentBestScore = currentScore;
                setBestIndex((i-1));
            }
            tmpScores.push({
                best: false,
                number: Number(i),
                score: localStorage.getItem(String(i))
            });
        }
        tmpScores[bestIndex].best = true;
        setScores(tmpScores);
    }


    const play = () => {
        console.log("I am here too");
        props.playAgain();
        setIsGameOver(false);
    }

    const updateScores = () => {
        console.log(currentTimeInPlay);
        const currentGameNumber = localStorage.getItem('currentGameNumber');
        gameNumber = String(Number(currentGameNumber) + 1);
        localStorage.setItem(gameNumber, currentTimeInPlay);
        localStorage.setItem('currentGameNumber', gameNumber);
        createBoardJSON();
    }

    const gameOver =() => {
        props.onStopGame();
        setCurrentTimeInPlay(0);
        setIsGameOver(true);
    }

    const updateCurrentTime = (time) => {
        console.log("current success time", time);
        if (time > currentTimeInPlay ) {
            setCurrentTimeInPlay(time);
        }
    }
    

    return (
        <div className="game">
            <div className="game__scores">
                <Board scores={scores} />
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
