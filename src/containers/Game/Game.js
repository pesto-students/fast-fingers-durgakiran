import React, { useState } from "react";
import Board from "../../components/Board/Board";
import "./Game.css";
import Over from "../../components/Over/Over";
import Action from "../Action/Action";

function Game() {
    const [ isGameOver, setIsGameOver ] = useState(false);
    let currentTime = 0;
    const gameNumber = '1';

    const scores = [
        {
            best: false,
            number: 1,
            score: "2:45",
        },
        {
            best: false,
            number: 2,
            score: "2:45",
        },
        {
            best: true,
            number: 3,
            score: "2:17",
        },
    ];

    

    const play = () => {
        console.log("I am here too");
        setIsGameOver(false);
    }

    const gameOver =() => {
        localStorage.setItem(gameNumber, currentTime);
        setIsGameOver(true);
    }

    const updateCurrentTime = (time) => {
        console.log("current success time", time);
        if (time > currentTime ) {
            currentTime = time;
        }
    }
    

    return (
        <div className="game">
            <div className="game__scores">
                <Board scores={scores} />
            </div>
            {
                isGameOver ? <div className="game__area">
                                <Over number="1" minutes="01" seconds="12"/>
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
