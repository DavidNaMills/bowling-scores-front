import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import useDispatchHook from '../../Hooks/useDispatchHook/useDispatchHook';

const Logout = () =>{
    const {logoutUserDispatch} = useDispatch();

    useEffect(()=>{
        logoutUserDispatch();
    }, []);

    return (
        <Redirect to='/'/>
    )
}

export default Logout;