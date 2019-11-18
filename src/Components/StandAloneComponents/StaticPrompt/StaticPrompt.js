import React from 'react';
import Button from '../Button/Button';
import popup from '../Popup/Popup.module.scss';
import classes from './StaticPrompt.module.scss';

const StaticPrompt = ({ message, button1 = null, button2 = null, close=null }) => (
    <div className={classes.staticPrompt}>
        {close &&
            <div className={popup.popup__closeBar}>
                <p onClick={close} className={popup.popup__closeBar_cls}>CLOSE</p>
            </div>
        }
        <div>
            <p>{message}</p>
            <div className={classes.staticPrompt__btn}>
                {button1 && <div className={button1&&button2
                    ? classes.staticPrompt__btn_hf
                    : classes.staticPrompt__btn_fl
                }><Button isFull {...button1} /></div>}
                {button2 && <div className={button1&&button2
                    ? classes.staticPrompt__btn_hf
                    : classes.staticPrompt__btn_fl
                }><Button isFull {...button2} /></div>}
            </div>
        </div>
    </div>
);

export default StaticPrompt;