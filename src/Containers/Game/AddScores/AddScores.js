import React, { useEffect } from 'react';

import body from '../../../styles/shared/container.module.scss';
import form from '../../../styles/shared/form.module.scss';
import classes from '../GameDetails/GameDetails.module.scss';

import CombinedInput from './CombinedInput/CombinedInput';
import objectToArray from '../../../helpers/objectToArray/objectToArray'
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Title from '../../../Components/StandAloneComponents/Title/Title';

import useScoreInput from '../../../Hooks/useScoreInput/useScoreInput';
import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';

const AddScores = ({ players, close }) => {
    const { values, addValue } = useScoreInput(players);
    const { addNewGameDispatch } = useDispatchHook();

    const updateScore = (e) => {
        e.preventDefault();
        let touched = false;

        for (let k in values) {
            if (values[k].score > 0) touched = true;
        }
        if (touched) {
            addNewGameDispatch(values);
            console.log(values);
            close();
        } else {
            alert('must add at least 1 score')
        }
    }

    useEffect(() => { }, [values]);

    return (
        <div className={body.contentContainer}>
            <Title label='Add Scores' ttlType='sub' />
            {
                values ?
                    <React.Fragment>
                        <div className={form.form__container}>

                            <form onSubmit={updateScore} className={form.form__form}>
                                {
                                    objectToArray(players).map((x, i) =>
                                        <CombinedInput
                                            key={i}
                                            name={x.config.name}
                                            color={x.config.color}
                                            updateScore={addValue}
                                            id={x.id}
                                            value={values[x.id].score}
                                        />
                                    )}
                                <div className={classes.gameDetails__largeExtra}>
                                    <Button click={() => { }} isFull label='Save Scores' />
                                </div>
                            </form>
                        </div>
                        <div className={classes.gameDetails__largeExtra}>
                            <Button isFull click={close} label='Close' />
                        </div>
                    </React.Fragment>
                    : <p>Please wait</p>
            }
        </div>
    )
}

export default AddScores;