import React from 'react';
import UnLoggedInNavigation from './UnLoggedInNavigation/UnLoggedInNavigation';
import LoggedInNavigation from './LoggedInNavigation/LoggedInNavigation';

const Navigation = (props) => {
    return (
        <header>
            <div>
                {
                    props.user.token
                        ? <LoggedInNavigation user={props.user.user} />
                        : <UnLoggedInNavigation />
                }
            </div>
            {
                props.children
            }
        </header>
    )
}

export default Navigation;