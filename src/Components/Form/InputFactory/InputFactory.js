import React from 'react';
import Input from '../elements/Input/Input';

const Inputfactory = ({ config, id, changed }) => {
    let element = null;

    switch (config.elementtype.toLowerCase()) {
        case 'input':
            element = <Input
                changed={changed}
                id={id}
                {...config.elementConfig}
                isValid={config.isValid}
                label={config.elementConfig.placeholder}
                value={config.value}
                error={config.hasErr}
                isRequired={config.shouldValidate}
            />
            break;
        default:
            element = <p>ERROR</p>
    }

    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    )
};

export default Inputfactory;