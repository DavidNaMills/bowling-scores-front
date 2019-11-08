import React from 'react';
import classes from './Popup.module.scss';

import useBodyLock from '../../../Hooks/useBodyLock/useBodyLock';
import Button from '../Button/Button';
import Title from '../Title/Title';

const Popup = ({ message, title = null, action1 = null, action2 = null, close = null }) => {
    useBodyLock();

    return (
        <div className={classes.popup__container}>
            <div className={classes.popup__module}>
                {close &&
                    <div className={classes.popup__closeBar}>
                        <p onClick={close} className={classes.popup__closeBar_cls}>CLOSE</p>
                    </div>
                }
                <div>

                    {title && <Title {...title} />}
                    <p className={classes.popup__message}>{message}</p>
                    <div className={classes.popup__btnContainer}>
                        {action1 && <Button {...action1} />}
                        {action2 && <Button {...action2} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;