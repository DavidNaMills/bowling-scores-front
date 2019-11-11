import React from 'react';

import container from '../../styles/shared/container.module.scss';
import classes from './Landing.module.scss';

import Title from '../../Components/StandAloneComponents/Title/Title';
import Button from '../../Components/StandAloneComponents/Button/Button';



const Landing = (props) => {

    const access = (where) => {
        props.history.push(where);
     }

    return (
        <div className={[container.contentContainer].join(' ')}>
            <Title ttlType='main' label='Bowling Scores' />


            <div className={[classes.landing, classes.landing__prof].join(' ')}>
                <Title ttlType='sub' label='A Serious Bowler?' />
                <div>
                    <ul>
                        <li>Games and statistics are recorded</li>
                        <li>View and compare past games</li>
                        <li>Track your progress</li>
                        <li>Play against friends</li>
                        <li>Join the community of bowlers</li>
                    </ul>
                    <div className={classes.landing__btn}>
                        <div className={classes.landing__btn_container}>
                            <Button isFull click={()=>access('/signup')} type='darkgreen' label='Signup' />
                        </div>
                        <div className={classes.landing__btn_container}>
                            <Button isFull click={()=>access('/login')}  type='darkblue' label='Login' />
                        </div>
                    </div>
                </div>
            </div>


            <div className={[classes.landing, classes.landing__casual].join(' ')}>
                <Title ttlType='sub' label='A Casual Bowler?' />
                <div>
                    <ul>
                        <li>No problem!!!</li>
                        <li>Take advantage of the quick game</li>
                        <li>Enjoy all the fun stuff without logging in</li>
                    </ul>

                    <div>
                        <div>
                            <Button isFull click={()=>access('/game')} type='blue' label='Quick Game' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing;