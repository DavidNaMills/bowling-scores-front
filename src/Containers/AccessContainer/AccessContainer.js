import React from 'react';
import loginFormConfig from '../../formConfigs/loginFormConfig';
import Title from '../../Components/StandAloneComponents/Title/Title';
import InputFactory from '../../Components/Form/InputFactory/InputFactory'
import Button from '../../Components/StandAloneComponents/Button/Button'
import useFormHook from '../../Hooks/useFormHook/useformHook';
import objectToArray from '../../helpers/objectToArray/objectToArray';

const AccessContainer = (props) => {

    const { manageState, formState, completeCheck, clearForm } = useFormHook(props.formConfig);


    const submit = (e) => {
        e.preventDefault();
        const valid = completeCheck();

        if (valid) {
            //make submission
        }
    };

    const clear = () => {
        clearForm();
    };

    return (
        <div>
            <Title label={props.title} ttlType='section' />

            <div>
                <form onSubmit={submit}>
                    {
                        objectToArray(formState).map((x, i) =>
                            <InputFactory
                                key={i}
                                config={x.config}
                                id={x.id}
                                changed={manageState}
                            />, 0)
                    }
                    <Button label='Login' type='default' click={submit} />
                </form>
                <Button label='Clear' type='danger' click={clear} />
            </div>
        </div>
    )
};

export default AccessContainer;