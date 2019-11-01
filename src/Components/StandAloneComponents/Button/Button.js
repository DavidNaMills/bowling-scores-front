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