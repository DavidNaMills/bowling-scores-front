import React from 'react';

import body from '../../../styles/shared/container.module.scss';
import form from '../../../styles/shared/form.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';

import objectToArray from '../../../helpers/objectToArray/objectToArray'

import CombinedInput from './CombinedInput/CombinedInput';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Title from '../../../Components/StandAloneComponents/Title/Title';

import useScoreInput from '../../../Hooks/useScoreInput/useScoreInput';
import useDispatchHook from '../../../Hooks/useDispatchHook/useDispatchHook';


// const addNewGameDispatch = () =>{};

const isDisabled = (values) =>{
    let disabled = true
    for (let k in values) {
        if (values[k].score > 0) {disabled = false};
    }
    return disabled
}

const AddScores = ({ players, close }) => {
    const { values, addValue } = useScoreInput(players);
    const { addNewGameDispatch } = useDispatchHook();
    const updateScore = (e) => {
        e.preventDefault();
        addNewGameDispatch(values);
        close();
    }

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
                                <div className={spacing.largeExtra}>
                                    <Button click={() => { }} isFull label='Save Scores'  isDisabled={isDisabled(values)} />
                                </div>
                            </form>
                        </div>
                        <div className={spacing.largeExtra}>
                            <Button isFull click={close} type='warning' label='Close'/>
                        </div>
                    </React.Fragment>
                    : <p>Please wait</p>
            }
        </div>
    )
}

export default AddScores;