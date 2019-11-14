import React from 'react';
import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({ msg, close = null }) => (
    <div className={classes.errorMessage}>
        {close &&
            <div className={classes.errorMessage__closeBar}>
                <p onClick={close} className={classes.errorMessage__closeBar_cls}>CLOSE</p>
            </div>
        }
        <p className={classes.errorMessage__msg}>{msg}</p>
    </div>
);

export default ErrorMessage;