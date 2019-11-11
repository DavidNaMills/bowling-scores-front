import {useState, useEffect} from 'react';

const useGetDimensions = () => {
    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    });


    const setSize = () =>{
        console.log('changed');
        const { innerWidth: width, innerHeight: height } = window;
        setDimensions({
            width,
            height
        })
    };

    useEffect(() => {
        if(!dimensions.width){
            setSize();
        }

        window.addEventListener('resize', setSize);
        return () => window.removeEventListener('resize', setSize);
      }, []);

    return {
        dimensions
    }    
}

export default useGetDimensions;