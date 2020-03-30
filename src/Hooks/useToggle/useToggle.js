import { useState } from 'react';

const useToggle = (defaultState) => {
    const [toggle, setToggle] = useState(defaultState);

    const makeToggle = id => {
        setToggle(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return {
        toggle,
        makeToggle
    }
}

export default useToggle;