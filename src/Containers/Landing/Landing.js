import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';

import container from '../../styles/shared/container.module.scss';
import classes from './Landing.module.scss';

import Title from '../../Components/StandAloneComponents/Title/Title';
import Button from '../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../Components/GameChart/GameChart';
import Table from '../../Components/Table/Table';

import tableParser from '../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import pinfallSort from '../../helpers/pinfallSort/pinfallSort';
import chartParser from '../../helpers/chartDataModifier/chartDataModifier';

import marker from '../../images/icons8-marker-pen-100.png';
import friends from '../../images/icons8-friends-100.png';
import discussion from '../../images/icons8-discussion-forum-100.png';
import teams from '../../images/icons8-teams-100.png';


const players = {
    'f8907882-9c37-4116-a5fa-242c7dedb093': { name: "David", color: "3, 169, 244", id: "f8907882-9c37-4116-a5fa-242c7dedb093" },
    '9bebacf0-d285-47e6-adff-53f9a48f43cd': { name: "Paul", color: "233, 30, 99", id: "9bebacf0-d285-47e6-adff-53f9a48f43cd" },
    '3c291f44-be6d-4d80-bdf7-33094c8a59be': { name: "Kelby", color: "76, 175, 80", id: "3c291f44-be6d-4d80-bdf7-33094c8a59be" }
};

const genData = () => ({
    games: {
        "1":{
            'f8907882-9c37-4116-a5fa-242c7dedb093': {
                name: 'David',
                score: random()
            },
            '9bebacf0-d285-47e6-adff-53f9a48f43cd': {
                name: 'Paul',
                score: random()
            },
            '3c291f44-be6d-4d80-bdf7-33094c8a59be': {
                name: 'Kelby',
                score: random()
            }
        },
        "2":{
            'f8907882-9c37-4116-a5fa-242c7dedb093': {
                name: 'David',
                score: random()
            },
            '9bebacf0-d285-47e6-adff-53f9a48f43cd': {
                name: 'Paul',
                score: random()
            },
            '3c291f44-be6d-4d80-bdf7-33094c8a59be': {
                name: 'Kelby',
                score: random()
            }
        },
        "3":{
            'f8907882-9c37-4116-a5fa-242c7dedb093': {
                name: 'David',
                score: random()
            },
            '9bebacf0-d285-47e6-adff-53f9a48f43cd': {
                name: 'Paul',
                score: random()
            },
            '3c291f44-be6d-4d80-bdf7-33094c8a59be': {
                name: 'Kelby',
                score: random()
            }
        }
    },
    players
});

const random = () => { return Math.floor(Math.random() * (300 - 1 + 1) + 1) };
const tHeaders = ['Player', 'Average', 'Pinfall'];

const Landing = (props) => {
    const [data, setData] = useState(genData());

    useEffect(() => {
        const genDataTimer = setInterval(() => {

            setData(genData());
        }, 3500);

        return () => clearInterval(genDataTimer);
    }, []);

    const buttons = () => (
        <div className={classes.landing__btn}>
            <div className={classes.landing__btn_container}>
                <Button isFull click={() => access('/game')} type='darkblue' label='Play' largeText>
                    {/* <img src={'/images/ball.png'} height='40' /> */}
                </Button>
            </div>
            <div className={classes.landing__btn_container}>
                <Button isFull click={() => access('/login')} type='darkgreen' label='Login' largeText />
            </div>
        </div>
    )

    const access = (where) => {
        props.history.push(where);
    }
    
    return (
        <div className={[container.contentContainer, classes.landing__top].join(' ')}>
            <div className={classes.landing__withImg}>
                <Title ttlType='main' label='Bowling Scores' />
            </div>


            <div className={classes.landing__about}>
                    <div className={classes.landing__about_inner}>
                <div className={classes.landing__about_row}>
                        <div>
                            <Title ttlType='sub' label='Play and Track' />
                            <div className={classes.landing__img}>
                                <img src={marker} />
                            </div>
                            <ul>
                                <li>Easiest way to track your scores</li>
                                <li>Record final score</li>
                                <li>Track your progress over time</li>
                                <li>Continue playing</li>
                            </ul>
                        </div>

                        {!isMobileOnly && <div>
                            <GameChart
                                data={chartParser(data)}
                                players={data.players}
                                width={isMobileOnly ? 300 : 350}
                            />
                        </div>}
                    </div>

                    {!isMobileOnly && <Table
                        data={{
                            headers: tHeaders,
                            rows: pinfallSort(tableParser(data))
                        }}
                        showRowNum
                    />}
                    </div>


                {buttons()}
            </div>


            <div className={classes.landing__comingsoon}>
                <Title ttlType='section' label='Coming Soon' />
                <div className={classes.landing__comingsoon_inside}>
                    <div className={classes.landing__item}>
                        <Title ttlType='sub' label='Community' />
                        {!isMobileOnly && <div className={classes.landing__img}>
                            <img src={friends} />
                        </div>}
                        <ul>
                            <li>Add friends</li>
                            <li>Share stats</li>
                            <li>Challenge</li>
                        </ul>
                    </div>
                    <div className={classes.landing__item}>
                        <Title ttlType='sub' label='Discussion Forum' />
                        {!isMobileOnly && <div className={classes.landing__img}>
                            <img src={discussion} />
                        </div>}

                        <ul>
                            <li>Ask questions</li>
                            <li>Find solutions</li>
                        </ul>
                    </div>
                    <div className={classes.landing__item}>
                        <Title ttlType='sub' label='Teams' />
                        {!isMobileOnly && <div className={classes.landing__img}>
                            <img src={teams} />
                        </div>}
                        <ul>
                            <li>Join a team</li>
                            <li>Record as a team</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={classes.landing__footer}></div>
        </div>
    )
}

export default Landing;