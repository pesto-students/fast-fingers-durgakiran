import React, { useState, useEffect } from 'react';
import './Header.css';

function Header(props) {
    const { userName, difficulty } = props;
    const [ difficultyString, setDifficultyString ] = useState('NORMAL');

    const updateDifficultyString = () => {
        if( difficulty >= 1 && difficulty < 1.5) {
            setDifficultyString('NORMAL');
        } else if(difficulty >= 1.5 && difficulty < 2) {
            setDifficultyString('MEDIUM');
        } else {
            setDifficultyString('HARD');
        }
    }

    useEffect(() => {
        updateDifficultyString();
        console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.difficulty])

    return (
        <div className="header">
            <div className="header__container">

                <div className="header__user-container">
                    
                    <div className="header__user">
                        <img src="/person.svg" alt="user"/>
                        <span>{userName}</span>
                    </div>

                    <div className="header__difficulty">
                        <img src="/gamepad.svg" alt="gamepad"/>
                        <span>LEVEL : </span>
                        <span>{difficultyString}</span>
                    </div>

                </div>


                <div className="header__name">
                    fast fingers
                </div>
            </div>

        </div>
    )
}


export default Header

