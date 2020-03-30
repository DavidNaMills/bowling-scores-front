import React from 'react';
import classes from '../../../styles/shared/Popup.module.scss';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button';

import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';
import generateDate from '../../../helpers/generateDate/generateDate';

const Popup1Body = ({ openPopup, hasExistingGame, id }) => {
    const { initGameDispatch } = useDispatchHook();
    
    return (
        <React.Fragment>
            <Title label={'Game in Progress'} ttlType={'sub'} />
            <p className={classes.popup__message}>{`We found a game that was started on ${generateDate(hasExistingGame.createdAt)}.`}</p>
            <p className={classes.popup__message2}>{`would you like to continue or start a new game?`}</p>
            <div className={classes.popup__btnContainer}>
                <Button
                    label={'Start New Game'}
                    type='default'
                    click={() => {
                        openPopup(id)
                    }}
                />
                <Button
                    label={'Continue'}
                    type={'blue'}
                    click={() => {
                        initGameDispatch(hasExistingGame);
                        openPopup(id)
                    }}
                />
            </div>
        </React.Fragment>
    )
};

export default Popup1Body;