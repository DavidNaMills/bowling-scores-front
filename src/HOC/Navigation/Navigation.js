import React from 'react';
import { NavLink } from 'react-router-dom';


const Navigation = (props) => {

    return (
        <div>
            <div>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/game'>Game</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
            </div>
            {
                props.children
            }
        </div>
    )
}

export default Navigation;