import React from 'react'
import Header from '../../components/Header/Header'
import { useStateValue } from '../../StateProvider'
import Game from '../Game/Game';
import './Play.css';

function Play() {

    const [{userName, difficulty}] = useStateValue();

    return (
        <div className="play">
            <Header userName={userName} difficulty={difficulty}/>

            <Game />

        </div>
    )
}

export default Play
