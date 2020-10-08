import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { useStateValue } from '../../StateProvider'
import Game from '../Game/Game';
import './Play.css';
import Footer from '../../components/Footer/Footer';

function Play(props) {

    const [ stopGame, setStopGame ] = useState(false);

    const [{userName, difficulty}, dispatch] = useStateValue();

    const addToStorage = (userName, difficultLevel) => {
        dispatch({
            type: "ADD_USER_NAME",
            userName: userName,
            difficulty: difficultLevel
        });
    }

    const setSession = () => {
        sessionStorage.clear();
        addToStorage(undefined, undefined);
        props.resetSession();
    }

    return (
        <div className="play">
            <Header userName={userName} difficulty={difficulty} />

            <Game playAgain={() => setStopGame(false)} onStopGame={() => setStopGame(true)} stopGame={stopGame} />

            <Footer onStopGame={() => setStopGame(true)} isGameOver={stopGame} onClearSession={() => setSession()}/>

            

        </div>
    )
}

export default Play
