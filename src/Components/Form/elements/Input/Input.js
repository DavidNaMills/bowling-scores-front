import React from 'react';
import classes from './Input.module.scss';
import { CreateSharp, ErrorSharp } from '@material-ui/icons'

const iconOk = [classes.icon, classes.icon__required];
const iconErr = [classes.icon, classes.icon__error];

const Input = ({ changed, id, type = 'text', label = null, placeholder = '', error = [], isValid = false, isRequired = false }) => {
    let styles = [classes.input, classes.input__default]

    if (isValid) {
        styles = styles.concat(classes.input__valid);
    }

    if (error.length > 0) {
        styles = styles.concat(classes.input__error);
    }

    return (
        <div className={classes.input__label}>
            {label && <label htmlFor={id}>{label}</label>}
            <div>
                <input
                    className={styles.join(' ')}
                    id={id}
                    type={type}
                    onChange={e => changed(e, id)}
                    placeholder={placeholder}
                />

                {
                    error.length > 0
                        ? <ErrorSharp className={iconErr.join(' ')} />
                        : isRequired && <CreateSharp className={iconOk.join(' ')} />
                }
            </div>
            {error.length > 0 &&
                <div className={classes.input__errorContainer}>
                    {
                        error.map((x, i) => <p key={i} className={classes.input__errorContainer_errorMsg}>{x}</p>, 0)
                    }
                </div>
            }
        </div>
    )
}

export default Input;