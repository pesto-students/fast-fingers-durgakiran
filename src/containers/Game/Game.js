import React from 'react'
import Board from '../../components/Board/Board';
import Word from '../../components/Word/Word';
import './Game.css';
import Timer from '../../components/Timer/Timer';
import Input from '../../components/Input/Input';

function Game() {

    const scores = [
        {
            best: false,
            number: 1,
            score: "2:45"
        },
        {
            best: false,
            number: 2,
            score: "2:45"
        },
        {
            best: true,
            number: 3,
            score: "2:17"
        }
    ]


    return (
        <div className="game">
            <div className="game__scores">
                <Board scores={scores}/>
            </div>
            <div className="game__area">
                <Timer time="330"/>
                <Word correctlyTypedWord="Hello" unTypedWord="World"/>
                <Input type="text" />
            </div>
            <div className="game__occ-space">
            </div>
        </div>
    )
}

export default Game
