import React, { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import Word from "../../components/Word/Word";
import "./Game.css";
import Timer from "../../components/Timer/Timer";
import Input from "../../components/Input/Input";
import jsonData from "../../data/dictionary.json";

function Game() {
    const [randomWord, setRandomWord] = useState("");
    const [charArray, setCharArray] = useState([]);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ cleanInput, setCleanInput ] = useState(false);

    const scores = [
        {
            best: false,
            number: 1,
            score: "2:45",
        },
        {
            best: false,
            number: 2,
            score: "2:45",
        },
        {
            best: true,
            number: 3,
            score: "2:17",
        },
    ];

    useEffect(() => {
        const randomWord = getRandomWord();
        setRandomWord(randomWord);
        setCharArray(getWordSplitSpans(randomWord));
    }, []);

    const computeWords = (value) => {
        setCharArray(computeWordTypings(randomWord, value));
        const tmpIsSuccess = compareTypedAndOriginal(randomWord, value);
        setIsSuccess(tmpIsSuccess);
        if(tmpIsSuccess) {
            const newRandomWOrd = getRandomWord();
            setRandomWord(newRandomWOrd);
            setCharArray(getWordSplitSpans(newRandomWOrd));
            setCleanInput(true);
        } else {
            setCleanInput(false);
        }
    };

    return (
        <div className="game">
            <div className="game__scores">
                <Board scores={scores} />
            </div>
            <div className="game__area">
                <Timer time="330" />
                <Word>
                    {charArray}
                </Word>
                <Input
                    type="text"
                    isTextCenter="true"
                    cleanInput={cleanInput}
                    onInputChange={(value) => computeWords(value)}
                />
            </div>
            <div className="game__occ-space"></div>
        </div>
    );
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomWord() {
    const randomInt = getRandomInt(jsonData.length);
    const randomWord = jsonData[randomInt];
    return randomWord;
}

export function getWordSplitSpans(word) {
    return word.split('').map((value, index) => {
        return <span key={index}>{value}</span>;;
    })
}

export function computeWordTypings(originalWord, typedWord) {
    return originalWord.split('').map((value, index) => {
        const typedChar = typedWord[index];
        if (!typedChar) {
            return <span key={index}>{value}</span>;
        } else if (value.toUpperCase() === typedChar.toUpperCase()) {
            return <span className="word__correct" key={index}>{value}</span>;
        } else {
            return <span className="word__incorrect" key={index}>{value}</span>;
        }
    });
}

export function compareTypedAndOriginal(originalWord, typedWord) {
    console.log(originalWord.toUpperCase(), typedWord.toUpperCase());
    return (originalWord.toUpperCase() === typedWord.toUpperCase());
}

export default Game;
