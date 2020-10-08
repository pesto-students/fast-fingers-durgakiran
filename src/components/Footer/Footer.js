import React from 'react';
import './Footer.css';

function Footer(props) {
    const onStopGame = () =>  {
        props.onStopGame();
    }

    const clearSession = () => {
        props.onClearSession();
    }

    return (
        <footer className="footer">
            {
                props.isGameOver ? <div className="footer-button__quit" onClick={ () => clearSession() }>QUIT</div> 
                                : <div className="footer-button__stop" onClick={ () => onStopGame() }>
                                    <img src='/cross.svg'  alt="stop game"/>
                                    STOP GAME
                                  </div>
            }
            <div className="occ-space"></div>

            <div className="footer-button__home">
                <img src='/home.svg'  alt="stop game" onClick={ () => onStopGame() }/>
            </div>
            
        </footer>
    )
}

export default Footer

