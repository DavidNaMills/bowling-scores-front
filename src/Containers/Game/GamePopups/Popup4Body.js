import React from 'react';
import classes from '../../../styles/shared/Popup.module.scss';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button';

const Popup4Body = ({ openPopup, id }) => {
    
    return (
        <React.Fragment>
            <Title label={'Sorry'} ttlType={'sub'} />
            <p className={classes.popup__message}>{`The game in storage was not one of yours`}</p>
            <p className={classes.popup__message2}>{`You will need to create a new game`}</p>
            <div className={classes.popup__btnContainer}>
                <Button
                    label={'Start New Game'}
                    type='default'
                    click={() => {
                        openPopup(id)
                    }}
                />
            </div>
        </React.Fragment>
    )
};

export default Popup4Body;