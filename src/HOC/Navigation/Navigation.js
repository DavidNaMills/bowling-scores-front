import React from 'react';
import UnLoggedInNavigation from './UnLoggedInNavigation/UnLoggedInNavigation';
import LoggedInNavigation from './LoggedInNavigation/LoggedInNavigation';
import StatsBar from './StatsBar/StatsBar';

const Navigation = (props) => {
    return (
        <header>
            <div>
                {
                    props.user.token
                        ? <React.Fragment>
                            <LoggedInNavigation user={props.user.user} />
                            <StatsBar stats={props.stats} />
                        </React.Fragment>
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