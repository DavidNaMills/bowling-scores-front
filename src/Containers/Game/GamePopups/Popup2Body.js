import React from 'react';
import classes from '../../../styles/shared/Popup.module.scss';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button'
import generateDate from '../../../helpers/generateDate/generateDate';

const Popup2Body = ({openPopup, hasExistingGame, id, push }) => {

    return (
        <React.Fragment>
            <Title label={'Slight problem...'} ttlType={'sub'} />
            <p className={classes.popup__message}>{`We found a game that was started on ${generateDate(hasExistingGame.createdAt)}, but you need to login to continue this game.`}</p>
            <p className={classes.popup__message2}>{`If the game belongs to you that is...`}</p>
            <div className={classes.popup__btnContainer}>
                <Button
                    label={'Start New Game'}
                    type='default'
                    click={() => {
                        openPopup(id);
                    }}
                />
                <Button
                    label={'Login'}
                    type={'darkBlue'}
                    click={() => {
                        openPopup(id);
                        push('/login')
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default Popup2Body;