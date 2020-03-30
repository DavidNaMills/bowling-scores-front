import React from 'react';
import InputFactory from '../../../Components/Form/InputFactory/InputFactory'
import Button from '../../../Components/StandAloneComponents/Button/Button'
import Spinner from '../../../Components/Spinner/Spinner';

import form from '../../../styles/shared/form.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';

import objectToArray from '../../../helpers/objectToArray/objectToArray';


const FormRender = ({submit, formState, manageState, isLoading, clear, label=''}) =>{

    return (
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

                    <Button type='default' label={label} click={submit} isFull isDisabled={isLoading} >
                        {isLoading && <Spinner size={16} />}
                    </Button>
                    <div className={spacing.extra}>
                        <Button label='Clear' type='lightred' click={clear} isFull isDisabled={isLoading} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormRender;