import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.scss';


const Navigation = (props) => {

    return (
        <header>
            <div className={classes.navigation}>
                <div className={classes.navigation_section}>
                    <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/'>Home</NavLink>
                    <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active}  to='/game'>Game</NavLink>
                </div>
                <div className={classes.navigation_section}>
                    <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/login'>Login</NavLink>
                    <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/signup'>Signup</NavLink>
                </div>
            </div>
            {
                props.children
            }
        </header>
    )
}

export default Navigation;