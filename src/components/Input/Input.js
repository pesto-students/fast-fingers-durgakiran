import React from 'react'
import classes from './Input.css';

function Input(props) {
    let inputElement = null;

    const handleInputChange = (value) => {
        props.onInputChange(value);
    };

    switch (props.type) {
        case 'text':
            inputElement = <input type="text" placeholder={props.placeholder} 
                            onChange={(event) => handleInputChange(event.target.value)}
                            value={ props.cleanInput ? '' : props.value }
                            className={['input__text', `${props.isTextCenter ? 'text-center' : ''}`].join(' ')}/>;
            break;
        case 'select':
            inputElement = (
            <select type="select" className={classes.input__select} 
            onChange={(event) => handleInputChange(event.target.value)} placeholder={props.placeholder}>
              {props.options.map((value, i) =>  <option value={value} key={i}>{value}</option>)}      
            </select>
            );
            break;
        default:
            inputElement = null;
            break;
    }
    return (
        <div className={classes.input}>
            {inputElement}
        </div>
    )
}

export default Input
