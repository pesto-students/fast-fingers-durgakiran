import React from 'react';
import './Header.css';

function Header(props) {
    const { userName, difficulty } = props;

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
                        <span>{difficulty}</span>
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

