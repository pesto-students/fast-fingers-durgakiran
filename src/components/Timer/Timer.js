import React, { Component } from 'react';
import './Timer.css';

export default class Timer extends Component {

    state = {
        timer: undefined,
        minutes: undefined,
        seconds: undefined
    }

    interval = undefined;

    getMinutes(time) {
        return Math.floor( time/ 60);
    }

    getSeconds(time) {
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return seconds;
    }

    clearSetInterval() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    start() {
        this.clearSetInterval();
        this.interval = setInterval(() => {
            if(this.state.timer > 0) {
                const timer = this.state.timer - 1;
                const minutes = this.getMinutes(timer);
                const seconds = this.getSeconds(timer);
                this.setState({timer, minutes, seconds});
                this.props.postCurrentUserTime(this.props.time - this.state.timer);
                this.setCircleDashArray();
            } else {
                this.clearSetInterval();
                this.props.onTimeExpired();
            }
        }, 1000);
    }

    setCircleDashArray() {
        const circleDashArray = `${( ((this.state.timer) / this.props.time) * 283 ).toFixed(0)} 283`;
        if(document.getElementById('base-timer-path-remaining')) {
            document.getElementById('base-timer-path-remaining')
                    .setAttribute("stroke-dasharray", circleDashArray);
        }
    };

    componentDidMount() {
        const { time } = this.props;
        const minutes = this.getMinutes(time);
        const seconds = this.getSeconds(time);
        this.setState({timer: time, minutes, seconds});
        this.start();
    }
    

    componentWillUnmount() {
		this.clearSetInterval();
	}

    render() {
        const { minutes, seconds } = this.state;
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
}




// import React, {  useEffect } from 'react';
// import './Timer.css';

// function Timer(props) {

//     // read initial amount of minutes from props
//     let { time } = props;

//     let tmpTimeConsumed = 0;
//     let tmpMinutes = 0;
//     let tmpSeconds = 0;
//     let timeInterval;

//     const getMinutes = (time) => {
//         return Math.floor( time/ 60);
//     }

//     const getSeconds = (time) => {
//         let seconds = time % 60;

//         if (seconds < 10) {
//             seconds = `0${seconds}`;
//         }

//         return seconds;
//     }

//     const setCircleDashArray = () => {
//         const circleDashArray = `${( ((time - tmpTimeConsumed) / time) * 283 ).toFixed(0)} 283`;
//         if(document.getElementById('base-timer-path-remaining')) {
//             document.getElementById('base-timer-path-remaining')
//                     .setAttribute("stroke-dasharray", circleDashArray);
//         }
//         if( document.getElementById('base-timer-label') ) {
//             document.getElementById('base-timer-label')
//                 .innerHTML = `${tmpMinutes}:${tmpSeconds}`;
//         }
        
//     };


//     const timerFunction = (time) => {
//         const timeInterval = setInterval(() => {
//             if( tmpTimeConsumed < time ) {
//                 tmpTimeConsumed += 1;
//                 console.log("Inside loop", tmpTimeConsumed);
//                 tmpMinutes = getMinutes(time - tmpTimeConsumed);
//                 tmpSeconds = getSeconds(time - tmpTimeConsumed);
//                 props.postCurrentUserTime(tmpTimeConsumed);
//                 setCircleDashArray();

//             } else {
//                 props.onTimeExpired();
//                 clearInterval(timeInterval);
//                 return null;
//             }
//         }, 1000);
//         console.log(timeInterval);
//         return (() => clearInterval(timeInterval));
//     }


//     useEffect(() => {
//         timerFunction(props.time);
//     }, [props.time]);



//     return (
//         <div className="timer">
//             <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//                 <g className="base-timer__circle">
//                     <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
//                     <path
//                         id="base-timer-path-remaining"
//                         strokeDasharray="283"
//                         className="base-timer__path-remaining"
//                         d="
//                         M 50, 50
//                         m -45, 0
//                         a 45,45 0 1,0 90,0
//                         a 45,45 0 1,0 -90,0
//                         "
//                     ></path>
//                 </g>
//             </svg>
//             <span id="base-timer-label" className="base-timer__label">
//                 {tmpMinutes}:{tmpSeconds}
//             </span>
//         </div>
//     )
// }

// export default Timer

