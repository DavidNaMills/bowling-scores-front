import React from 'react';
import classes from './StatsBar.module.scss';

const StatsBar = ({stats}) =>(
    <div className={classes.StatsBar}>
        <p>{`Average: ${stats.average}`}</p>
        <p>{`Games Played: ${stats.ttlGames}`}</p>
    </div>
)
export default React.memo(StatsBar);