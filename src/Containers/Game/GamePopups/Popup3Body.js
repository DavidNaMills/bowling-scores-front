import React from 'react';
import classes from '../../../styles/shared/Popup.module.scss';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button'
import generateDate from '../../../helpers/generateDate/generateDate';

const Popup3Body = ({openPopup, hasExistingGame, id, changeFromGame }) => {

    return (
        <React.Fragment>
            <Title label={'SO....'} ttlType={'sub'} />
            <p className={classes.popup__message}>{`We found a game that was started on ${generateDate(hasExistingGame.createdAt)}, but unsure if this is your game.`}</p>
            <p className={classes.popup__message2}>{`Would you like to check and continue this game?`}</p>
            <div className={classes.popup__btnContainer}>
                <Button
                    label={'Start New Game'}
                    type='default'
                    click={() => {
                        openPopup(id);
                    }}
                />
                <Button
                    label={'Continue'}
                    type={'darkBlue'}
                    click={() => {
                        openPopup(id);
                        changeFromGame('selectPlayer');
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default Popup3Body;