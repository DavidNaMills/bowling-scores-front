import React from 'react';
import classes from './Title.module.scss';

const Title = ({ label = '', ttlType = 'sub' }) => {
    let item;

    switch (ttlType.toLowerCase()) {
        case 'main':
            item = <h1 className={classes.title__main}>{label}</h1>
            break;
        case 'section':
            item = <h2 className={classes.title__section}>{label}</h2>
            break;
        case 'sub':
            item = <h3 className={classes.title__sub}>{label}</h3>
            break;
        default:
            item = <h3 className={classes.title__sub}>{label}</h3>
            break;
    }

    return (
        <div className={classes.title}>
            {item}
        </div>
    )
}

export default Title;