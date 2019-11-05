import React, { useEffect, useCallback } from 'react';
import CombinedInput from './CombinedInput/CombinedInput';
import objectToArray from '../../../helpers/objectToArray/objectToArray'
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Title from '../../../Components/StandAloneComponents/Title/Title';

import useScoreInput from '../../../Hooks/useScoreInput/useScoreInput';

const AddScores = ({ players, addGame, close }) => {
    const { values, addValue } = useScoreInput(players);

    const updateScore = (e) => {
        e.preventDefault();
        addGame(values);
        close();
    }

    useEffect(() => { }, [values]);

    return (
        <div>
            <Title label='Add Scores' ttlType='sub' />

            {
                values ?
                    <React.Fragment>

                        <form onSubmit={updateScore}>
                            {
                                objectToArray(players).map(x =>
                                    <CombinedInput
                                        name={x.config.name}
                                        color={x.config.color}
                                        updateScore={addValue}
                                        id={x.id}
                                        value={values[x.id].score}
                                    />
                                )}
                            <Button click={() => { }} isFull label='Save Scores' />
                        </form>

                        <div>
                            <Button isFull click={close} label='Close' />
                        </div>
                    </React.Fragment>
                    : <p>Please wait</p>
            }
        </div>
    )
}

export default AddScores;