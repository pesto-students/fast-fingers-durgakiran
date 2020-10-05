import React from 'react';
import './OVER.css';

function Over(props) {
    return (
        <div className="game-complete">

            <div className="game-complete__number">
                <span>SCORE : </span><span>GAME {props.number}</span>
            </div>
            <div className="game-complete__score">
                <span>{props.minutes}: {props.seconds}</span>
            </div>
            <div className="game-complete__message">
                New High Score
            </div>
            {/* <div className="game-complete__button" onClick={props.onPlayAgain()}>
                <img src="/reload.svg" alt="play again" />
                PLAY AGAIN
            </div> */}
            
        </div>
    )
}

export default Over

