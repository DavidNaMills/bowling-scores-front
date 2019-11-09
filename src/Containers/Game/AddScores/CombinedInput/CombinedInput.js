import React from 'react';
import classes from './CombinedInput.module.scss';

import Input from '../../../../Components/Form/elements/Input/Input';
import { playerTableStyle } from '../../playerTableStyle';

//Avatar when built

const CombinedInput = ({ name, color, value, updateScore, id }) => {

    // <div style={playerTableStyle()}>
    return (
        <div style={playerTableStyle(color)} className={classes.combinedInput}>
            <div className={[classes.combinedInput__name, classes.combinedInput].join(' ')}>
                <p>{name}</p>
            </div>

            <div className={[classes.combinedInput__input, classes.combinedInput].join(' ')}>
                <Input
                    value={value}
                    changed={e => updateScore({ id, data: e.target.value })}
                    id={id}
                    type='number'
                    max={300}
                    min={0}
                />
            </div>
        </div>
    )
}

export default CombinedInput;