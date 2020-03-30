import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Navigation.module.scss';
import ball from '../../../images/ball.png';

const LoggedInNavigation = (props) => (
    <div className={classes.navigation}>
        <div className={classes.navigation_section}>
            <NavLink exact className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/dashboard'><img src={ball} height='25' width='25' /></NavLink>
            <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/game'>Play</NavLink>
        </div>
        <div className={classes.navigation_section}>
            <p className={classes.navigation__username} style={{ color: `rgb(${props.user.color})` }}>{props.user.username}</p>
            <NavLink className={classes.navigation__link} activeClassName={classes.navigation__link_active} to='/logout'>Logout</NavLink>
        </div>
    </div>
)

export default React.memo(LoggedInNavigation);