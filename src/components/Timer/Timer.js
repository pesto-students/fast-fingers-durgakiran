import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer(props) {

    let timeConsumed = 0;

    const getMinutes = (time) => {
        return Math.floor( time/ 60);
    }

    const getSeconds = (time) => {
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return seconds;
    }

    // read initial amount of minutes from props
    let { time = 0 } = props;
    const [ timer, setTimer ]  = useState(time);
    const [ minutes, setMinutes ] = useState(getMinutes(time));
    const [ seconds, setSeconds ] = useState(getSeconds(time));

    const setCircleDashArray = () => {
        const circleDashArray = `${( (timer / time) * 283 ).toFixed(0)} 283`;
        document.getElementById('base-timer-path-remaining').setAttribute("stroke-dasharray", circleDashArray);
    };


    useEffect(() => {
        let timerFunction =  setInterval(() => {
                            if( timer > 0 ) {
                                setTimer(timer - 1)
                                setMinutes(getMinutes(timer));
                                setSeconds(getSeconds(timer));
                                setCircleDashArray();
                            } else {
                                clearInterval(timerFunction);
                            }
                        }, 1000);
                        return () => {
                            clearInterval(timerFunction);
                        }
    });



    return (
        <div className="timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className="base-timer__path-remaining"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">
                {minutes}:{seconds}
            </span>
        </div>
    )
}

export default Timer

