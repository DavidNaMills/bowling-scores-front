import React from 'react';
import classes from '../../../styles/shared/Popup.module.scss';
import Title from '../Title/Title';
import Button from '../Button/Button';

const AreYouSure = ({ message1, message2 = null, dangerLbl = 'Danger', safeLbl = 'Safe', dangerClick, safeClick }) => (
    <React.Fragment>
        <Title label={'Are you sure?'} ttlType={'sub'} />
        <p className={classes.popup__message}>{message1}</p>
        {message2 && <p className={classes.popup__message2}>{message2}</p>}
        <div className={classes.popup__btnContainer}>
            <Button
                label={dangerLbl}
                type='danger'
                click={dangerClick}
            />
            <Button
                label={safeLbl}
                type={'confirm'}
                click={safeClick}
            />
        </div>
    </React.Fragment>
)

export default AreYouSure;