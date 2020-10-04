import React from 'react';
import './Word.css';

function Word(props) {
    const { correctlyTypedWord, unTypedWord } = props;
    return (
        <div className="word">
            {props.children}
        </div>
    )
}


export default Word

