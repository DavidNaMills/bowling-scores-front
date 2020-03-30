import React from 'react';
import classes from '../../../styles/shared/Popup.module.scss';

import useBodyLock from '../../../Hooks/useBodyLock/useBodyLock';

const Popup = ({ close = null, children }) => {
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
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Popup;