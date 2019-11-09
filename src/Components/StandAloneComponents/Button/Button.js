import React from 'react';
import classes from './Button.module.scss';



const Button = ({ click = () => { }, label, isDisabled = false, type = 'default', isFull=false}) => {
    let style = [classes.button];

    if(isFull){
        style = style.concat(classes.button__isFull);
    }
    if (isDisabled) {
        style = style.concat(classes.button__disabled);
    } else {

        switch (type.toLowerCase()) {
            case 'lightgreen':
                style = style.concat(classes.button__lightGreen);
                break;
            case 'darkgreen':
                style = style.concat(classes.button__darkGreen);
                break;
            case 'blue':
                style = style.concat(classes.button__blue);
                break;
            case 'lightblue':
                style = style.concat(classes.button__lightBlue);
                break;
            case 'darkblue':
                style = style.concat(classes.button__darkBlue);
                break;
            case 'lightred':
                style = style.concat(classes.button__lightRed);
                break;
            case 'lightyellow':
                style = style.concat(classes.button__lightYellow);
                break;
            case 'warning':
                style = style.concat(classes.button__warning);
                break;
            case 'danger':
                style = style.concat(classes.button__danger);
                break;
            default:
                style = style.concat(classes.button__default);
                break;
        }
    }

    return (
        <button onClick={click} disabled={isDisabled} className={style.join(' ')}>{label}</button>
    );
};

export default Button;