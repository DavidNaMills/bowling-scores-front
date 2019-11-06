import React from 'react';

import axios from '../../Axios/axiosConfig';

import useFetchHook from '../../Hooks/useFetchHook/useFetchHook';
import useFormHook from '../../Hooks/useFormHook/useformHook';

import Title from '../../Components/StandAloneComponents/Title/Title';
import InputFactory from '../../Components/Form/InputFactory/InputFactory'
import Button from '../../Components/StandAloneComponents/Button/Button'

import objectToArray from '../../helpers/objectToArray/objectToArray';

const AccessContainer = (props) => {

    const { manageState, formState, completeCheck, clearForm, buildForm } = useFormHook(props.formConfig);
    const { isLoading, makeCall } = useFetchHook();
    // const { isLoading, result, makeCall, resetData } = useFetchHook();

    const submit = (e) => {
        e.preventDefault();
        const valid = completeCheck();
        if (valid) {
            makeCall(axios, 'POST', props.url, buildForm());
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
                    <Button label='Login' type='default' click={submit} isFull isDisabled={isLoading} />
                </form>
                <Button label='Clear' type='danger' click={clear} isFull isDisabled={isLoading} />
            </div>
        </div>
    )
};

export default AccessContainer;