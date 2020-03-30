import {useState, useRef, useEffect} from 'react';

const useShowHook = (initState={}, defaultOpen=null) =>{
    const [isShow, setShow] = useState({});
    const emptyRef = useRef(initState);
    const defaultRef = useRef(initState);

    useEffect(()=>{
        if(defaultOpen ){
            const t ={
                ...initState,
                [defaultOpen] : true
            }
            setShow(t);
            defaultRef.current = t;
        }
    }, [])

    const changeShow = (key=null) =>{
        if(key){
            setShow({
                ...emptyRef.current,
                [key]: true
            });
        } else {
            setShow(defaultRef.current);
        }

        // if(typeof(initState)==='boolean'){
        //     setShow(newValue);
        // } else if (Object.prototype.toString.call(initState) === '[object Object]'){
        //     let changed = false;
        //     const temp = JSON.parse(JSON.stringify(isShow));
        //     for(let x in newValue){
        //         if((x in temp)){
        //             temp[x] = newValue[x];
        //             changed = true;
        //         }
        //     };
        //     if(changed){
        //         setShow(temp);
        //     }
        // }
    }

    return{
        isShow,
        changeShow
    }
}

export default useShowHook;