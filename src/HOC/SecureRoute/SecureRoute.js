import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

import {useSelector} from 'react-redux';


const SecureRoute = ({component: Component, ...rest}) =>{
    console.log('secure');
    const token = useSelector(state=>state.user.token);
    return (
        <Route {...rest} component={(props)=>(
            token 
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
    )
}

export default React.memo(SecureRoute);