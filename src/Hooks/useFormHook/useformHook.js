import {useState, useEffect} from 'react';

function useFormHook (defaultState) {
    const [formState, setFormState] = useState();

    useEffect(()=>{
        setFormState(defaultState);
    }, [])

    const manageState = (id, val) =>{
        const t = JSON.parse(JSON.stringify(formState[id]));
        t.value = val;
        t.touched = true;

        setFormState(prev=>({...prev, [id]: t}))
    }

    return {
        manageState,
        formState
    }
};

export default useFormHook;