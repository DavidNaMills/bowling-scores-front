import { useState } from 'react';


const initData = {
    data: null,
    error: false
}

const useFetchHook = () => {
    const [isLoading, setLoading] = useState(false);
    const [result, setResult] = useState(initData);

    const makeCall = (axios, type, url, data = null) => {
        const base = {
            method: type,
            url
        };

        const config = data
            ? { ...base, data }
            : { ...base }
        setLoading(true);
        axios(config)
            .then(res => {
                setResult({
                    data: res.data,
                    error: false
                });
                setLoading(false);
            })
            .catch(err => {
                setResult({
                    data: null,
                    error: err.error
                });
                setLoading(false);
            })
    }

    const resetData = () => { }

    return {
        isLoading,
        result,
        makeCall,
        resetData
    }
};

export default useFetchHook;