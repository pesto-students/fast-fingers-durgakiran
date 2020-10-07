import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { useStateValue } from '../../StateProvider'
import Game from '../Game/Game';
import './Play.css';
import Footer from '../../components/Footer/Footer';

function Play() {

    const [ stopGame, setStopGame ] = useState(false);

    const [{userName, difficulty}] = useStateValue();

    return (
        <div className="play">
            <Header userName={userName} difficulty={difficulty} />

            <Game playAgain={() => setStopGame(false)} onStopGame={() => setStopGame(true)} stopGame={stopGame} />

            <Footer onStopGame={() => setStopGame(true)} isGameOver={stopGame}/>

            

        </div>
    )
}

export default Play
