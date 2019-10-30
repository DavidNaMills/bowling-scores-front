import { useState, useEffect } from 'react';
import formValidate from '../../helpers/formValidation/formValidation'

function useFormHook(defaultState) {

    const [formState, setFormState] = useState();

    useEffect(() => {
        setFormState(defaultState);
    }, [])

    const completeCheck = () => {
        let tempValid = true;

        for (let key in formState) {
            if (!formState[key].isValid) {
                tempValid = false;
            }
        }
        return tempValid;
    }

    const manageState = (id, val) => {
        const result = formValidate(val, formState, id);

        let t = JSON.parse(JSON.stringify(formState[id]));
        if (!result.isValid) {
            t.hasErr = result.errorMsg;
        } else {
            t.value = val;
        }

        t.touched = true;
        setFormState(prev => ({ ...prev, [id]: t }))
    }

    return {
        manageState,
        formState,
        completeCheck
    }
};

export default useFormHook;