import React from 'react';
import './Board.css';

function Board(props) {
    return (
        <div className="board">
            <div className="board__title">score board</div>
            {
                props.scores.map((value, i) =>  { 
                    return (
                        value.best ? <div key={i} className="score">
                                        <div className="slcore board__best"> PERSONAL BEST </div> 
                                        <div  className="board__scores">Game {value.number} : {value.score}</div>
                                    </div> :
                                    <div key={i} className="score board__scores">Game {value.number} : {value.score}</div>
                    )
                })
            }
        </div>
    )
}


export default Board

