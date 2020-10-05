import React, { useState, useEffect } from 'react';
import Timer from '../../components/Timer/Timer';
import Word from '../../components/Word/Word';
import Input from '../../components/Input/Input';
import jsonData from "../../data/dictionary.json";
import difficulty from '../../data/difficulty.json';
import './Action.css';

function Action(props) {

    const [ timer, setTimer ] = useState(0);
    const [ word, setWord ] = useState('');
    const [ charArray, setCharArray ] = useState([]);
    const [ difficultyLevel, setDifficultyLevel ] = useState(sessionStorage.getItem('difficulty'));
    // const [ reset, setReset ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(undefined);


    const play = () => {
        const word = getRandomWord(jsonData.length);
        setWord(word);
        const timer = calculateTimer(word, difficultyLevel)
        setTimer(timer);
        const charArray = getWordSplits(word, '');
        setCharArray(charArray);
    }


    const computeWords = (value) => {
        if( value === word ) {
            console.log(currentTime);
            props.onSuccess(currentTime);
            play();
        } else {
            const charArray = getWordSplits(word, value);
            setCharArray(charArray);
        }
    }


    const getWordSplits = (word, wordToCompare) => {
        return word.split('').map((char, i) => {
           const charToCompare = wordToCompare[i]; 
           if(!charToCompare) {
                return <span key={i}>{char}</span>
           } else if(char ===  charToCompare) {
                return <span className="word__correct" key={i}>{char}</span>
           } else {
                return <span className="word__incorrect" key={i}>{char}</span>
            }
        })
    }

    const getRandomWord = (max) => {
        const randomNumber = Math.floor(Math.random() * Math.floor(max));
        const word = jsonData[randomNumber];
        return word;
    }

    const calculateTimer = (word, difficulty) => {
        console.log('timer called');
        const timer = Math.ceil(word.length / difficulty);
        return timer > 2 ? timer : 2;
    }

    const timeExpired = () => {
        props.onTimeExpired();
    }

    useEffect(() => {
        play();
    }, []);


    return (
        <div className="action">
            <Timer time={timer} postCurrentUserTime={(time) => {setCurrentTime(time)}} 
            onTimeExpired={() => { timeExpired() }} key={timer}/>
            <Word>
                {charArray}
            </Word>
            <Input
                type="text"
                isTextCenter="true"
                onInputChange={(value) => computeWords(value)}
                key={word}
            />
        </div>
    )
}

export default Action
