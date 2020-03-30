import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Navigation.module.scss';
import ball from '../../../images/ball.png';

const UnLoggedInNavigation = (props) => (
    <div className={classes.navigation}>
        <div className={classes.navigation_section}>
            <NavLink exact className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/'><img src={ball} height='25' width='25' /></NavLink>
            <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/game'>Play</NavLink>
        </div>
        <div className={classes.navigation_section}>
            <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/login'>Login</NavLink>
            <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/signup'>Signup</NavLink>
        </div>
    </div>
)


export default React.memo(UnLoggedInNavigation);