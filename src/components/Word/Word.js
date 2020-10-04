import React from 'react';
import './Word.css';

function Word(props) {
    const { correctlyTypedWord, unTypedWord } = props;
    return (
        <div className="word">
            <span className="word__typed">{correctlyTypedWord}</span>
            <span className="word__untyped">{unTypedWord}</span>
        </div>
    )
}


export default Word

