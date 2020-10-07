import React, { useState } from 'react'
import keyboard from './keyboard.svg';
import './Login.css';
import Input from '../../components/Input/Input';
import { useStateValue } from '../../StateProvider';

function Login(props) {
    const options = [
        {level: 'Normal', value: 1},
        {level: 'Medium', value: 1.5}, 
        {level: 'Difficult', value: 2}
    ];

    const [ {}, dispatch ] = useStateValue();

    const [ userName, setUserName ] = useState('');
    const [ difficultLevel, setDifficultyLevel ] = useState(1);

    const addToStorage = (userName, difficultLevel) => {
        dispatch({
            type: "ADD_USER_NAME",
            userName: userName,
            difficulty: difficultLevel
        })
    }

    const startGame = (userName, difficultLevel) => {
        setSession(userName, difficultLevel);
        props.onUserUpdate(userName);
        addToStorage(userName, difficultLevel);

    }

    const setSession = (userName, difficultLevel) => {
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('difficulty', difficultLevel);
    }



    return (
        <div className="login">
            <div className="login__container">
                
                <img src={keyboard} alt="keyboard logo" className="login__logo"/>

                <div className="login__brand-name">
                    <h1 className="login__brand-title">fast fingers</h1>
                    <div className="login__brand-name-subtitle">
                        <div className="login__brand-name-subtitle-left-line"></div>
                        <p>the ultimate typing game</p>
                        <div className="login__brand-name-subtitle-right-line"></div>
                    </div>
                </div>


                <div className="login__name-input">
                    <Input type='text' placeholder="Type your Name" onInputChange={(value) => setUserName(value)}/>
                </div>

                <div className="login__name-select">
                    <Input type='select' options={options} onInputChange={(value) => setDifficultyLevel(value)} placeholder="Difficulty Level"/>
                </div>

                <div className="login__start-button" onClick={() => startGame(userName, difficultLevel)}>
                    <img src='/play-fill.svg' alt="play" />
                    <p>Start Game</p>
                </div>


            </div>
            
        </div>
    )
}

export default Login
