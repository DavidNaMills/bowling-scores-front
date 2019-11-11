import {useState, useEffect} from 'react';

const useGetDimensions = () => {
    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    });


    const setSize = () =>{
        // console.log('changed');
        // console.log(window.innerWidth);
        // const { innerWidth: width, innerHeight: height } = window;

        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })
    };

    useEffect(() => {
        if(!dimensions.width){
            setSize();
        }

        // window.addEventListener('resize', setSize);
        // return () => window.removeEventListener('resize', setSize);
      }, []);

    return {
        dimensions
    }    
}

export default useGetDimensions;