import React, { useState } from "react";
import Board from "../../components/Board/Board";
import "./Game.css";
import Over from "../../components/Over/Over";
import Action from "../Action/Action";

function Game() {
    const [ isGameOver, setIsGameOver ] = useState(false);

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
        console.log("I am here");
        setIsGameOver(true);
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
                                <Action onTimeExpired={ () => gameOver()}/>
                            </div>

            }
            <div className="game__occ-space"></div>
        </div>
    );
}

export default Game;
