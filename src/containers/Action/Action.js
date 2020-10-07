import React, { useState, useEffect } from 'react';
import Timer from '../../components/Timer/Timer';
import Word from '../../components/Word/Word';
import Input from '../../components/Input/Input';
import jsonData from "../../data/dictionary.json";
import difficulty from '../../data/difficulty.json';
import './Action.css';
import { useStateValue } from '../../StateProvider';

function Action(props) {

    const [ timer, setTimer ] = useState(0);
    const [ word, setWord ] = useState('');
    const [ charArray, setCharArray ] = useState([]);
    const [ difficultyLevel, setDifficultyLevel ] = useState(sessionStorage.getItem('difficulty'));
    // const [ reset, setReset ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(undefined);
    const [ {}, dispatch ] = useStateValue();


    const updateDifficultAtSession = () => {

    }

    const play = () => {
        let newWord = getDifferentWord(jsonData.length);
        
        setWord(newWord);
        const timer = calculateTimer(newWord, difficultyLevel)
        setTimer(timer);
        const charArray = getWordSplits(newWord, '');
        setCharArray(charArray);
    }


    const computeWords = (value) => {
        if( value === word ) {
            console.log(currentTime);
            props.onSuccess(currentTime);
            computeDifficulty();
            play();
        } else {
            const charArray = getWordSplits(word, value);
            setCharArray(charArray);
        }
    }

    const computeDifficulty = () => {
        const difficulty = Number(difficultyLevel) + 0.01;
        sessionStorage.setItem('difficulty', difficulty);
        setDifficultyLevel(difficulty);
        dispatch({
            type: "ADD_SCORE_LEVEL",
            difficulty: difficultyLevel
        });
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

    const getDifferentWord = (length) => {
        let newWord = getRandomWord(length);
        return newWord
    }

    const calculateTimer = (word, difficulty) => {
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
            onTimeExpired={() => { timeExpired() }} key={difficultyLevel}/>
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
