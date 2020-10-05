import React, {  useEffect } from 'react';
import './Timer.css';

function Timer(props) {

    // read initial amount of minutes from props
    let { time } = props;

    let tmpTimeConsumed = 0;
    let tmpMinutes = 0;
    let tmpSeconds = 0;


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

    const setCircleDashArray = () => {
        const circleDashArray = `${( ((time - tmpTimeConsumed) / time) * 283 ).toFixed(0)} 283`;
        document.getElementById('base-timer-path-remaining').setAttribute("stroke-dasharray", circleDashArray);
        document.getElementById('base-timer-label').innerHTML = `${tmpMinutes}:${tmpSeconds}`;
    };


    const timerFunction = (time) => {
        console.log(time);
        if(time) {
            let timeInterval = setInterval(() => {
                if( tmpTimeConsumed < time ) {
                    tmpTimeConsumed += 1;
                    tmpMinutes = getMinutes(time - tmpTimeConsumed);
                    tmpSeconds = getSeconds(time - tmpTimeConsumed);
                    props.postCurrentUserTime({tmpMinutes, tmpSeconds});
                    setCircleDashArray();

                } else {
                    props.onTimeExpired();
                    clearInterval(timeInterval);
                    return null;
                }
            }, 1000);
        }
    }


    useEffect(() => {
        timerFunction(props.time);
    }, [props.time]);



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
                {tmpMinutes}:{tmpSeconds}
            </span>
        </div>
    )
}

export default Timer

