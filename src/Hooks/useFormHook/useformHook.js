import { useState, useEffect } from 'react';
import formValidate from '../../helpers/formValidation/formValidation'

function useFormHook(defaultState) {

    const [formState, setFormState] = useState();

    useEffect(() => {
        setFormState(defaultState);
    }, [])
    
    const clearForm = () =>{
        setFormState(defaultState);
    }

    const buildForm = ()=>{
        const temp = {};
        for(let key in formState){
            temp[key] = formState[key].value
        }
        return temp;
    }

    const completeCheck = () => {
        let tempValid = true;
        let temp = JSON.parse(JSON.stringify(formState));

        for (let key in temp) {
            const result = formValidate(temp[key].value, temp, key);
            if (!result.isValid) {
                temp[key].hasErr = result.errorMsg;
                temp[key].isValid = false;
            } else {
                temp[key].hasErr = [];
                temp[key].isValid = true;
            }
        }

        for (let key in temp) {
            if (!temp[key].isValid) {
                tempValid = false;
            }
        }
        setFormState(temp);
        return tempValid;
    }

    const manageState = (e, id) => {
        const val = e.target.value;

        let t = JSON.parse(JSON.stringify(formState[id]));
        t.value = val;

        t.touched = true;
        setFormState(prev => ({ ...prev, [id]: t }))
    }

    return {
        manageState,
        formState,
        completeCheck,
        clearForm,
        buildForm
    }
};

export default useFormHook;