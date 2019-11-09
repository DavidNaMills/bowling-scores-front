import React from 'react';

import form from '../../styles/shared/form.module.scss';
import body from '../../styles/shared/container.module.scss';
import spacing from '../../styles/shared/spacing.module.scss';

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

            <div className={body.contentContainer}>
                <div className={form.form__container}>
                    <form onSubmit={submit} className={form.form__form}>
                        {
                            objectToArray(formState).map((x, i) =>
                                <InputFactory
                                    key={i}
                                    config={x.config}
                                    id={x.id}
                                    changed={manageState}
                                />, 0)
                        }
                        <div className={spacing.largeExtra}>

                            <Button label='Login' type='default' click={submit} isFull isDisabled={isLoading} />
                            <div className={spacing.extra}>
                                <Button label='Clear' type='danger' click={clear} isFull isDisabled={isLoading} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AccessContainer;