import React from 'react';
import classes from './CombinedInput.module.scss';

import Input from '../../../../Components/Form/elements/Input/Input';
import {playerTableStyle} from '../../playerTableStyle';

//Avatar when built

const CombinedInput = ({name, color, value, updateScore, id}) => {

    // <div style={playerTableStyle()}>
    return (
        <div style={playerTableStyle(color)} className={classes.combinedInput}>
            <p className={classes.combinedInput__name}>{name}</p>
            <Input 
                value={value}
                changed={e=>updateScore({id, data: e.target.value})}
                id={id}
                type='number'
                max={300}
                min={0}
            />
        </div>
    )
}

export default CombinedInput;