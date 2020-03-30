import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './GameHistory.module.scss';
// import container from '../../styles/shared/container.module.scss';

import GameChart from '../../Components/GameChart/GameChart';
import Table from '../../Components/Table/Table';
import Title from '../../Components/StandAloneComponents/Title/Title';
import Spinner from '../../Components/Spinner/Spinner';
import { isMobileOnly, withOrientationChange } from 'react-device-detect';

import chartParser from '../../helpers/chartDataModifier/chartDataModifier';
import pinfallSort from '../../helpers/pinfallSort/pinfallSort';
import tableParser from '../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import generateDate from '../../helpers/generateDate/generateDate';

import axios from '../../Axios/axiosConfig';
import { PERSONAL_GAMES } from '../../Axios/URLS';
import useInfinite from '../../Hooks/useInfinite/useInfinite';

import Anime, { anime } from 'react-anime';

const tHeaders = ['Player', 'Average', 'Pinfall'];

const toObj = (item) => {
    const t = {};
    for (let i in item) {
        t[i] = {
            id: i,
            ...item[i]
        }
    }
    return t;
}


const GameHistory = (props) => {
    const { items, loadMoreBar, searchResultsBar, infiniteLoading } = useInfinite(axios, PERSONAL_GAMES, {});
    const user = useSelector(state => state.user);
    const placeHolder = () => { };

    const all = useMemo(() =>
        items.map((x, y) =>
            <Anime key={y} delay={anime.stagger(150)}
                scale={[.1, .9]}>
                <div className={isMobileOnly ? classes.gameHistory__game_mobile : classes.gameHistory__game_desktop} key={x._id}>
                    <Title label={generateDate(x.createdAt)} />

                    <GameChart
                        players={toObj(x.players)}
                        data={chartParser(x)}
                        width={isMobileOnly ?
                            props.isPortrait
                                ? (window.innerWidth - 10)
                                : (window.innerWidth - 100)
                            : 440
                        }
                    />

                    <Table
                        data={{
                            headers: tHeaders,
                            rows: pinfallSort(tableParser(x))
                        }}
                        showRowNum
                        selectRow={placeHolder}
                        caption=''
                    />
                </div>
            </Anime>
        ), [items]);


    return (
        <div>
            <Title label='History' ttlType='section' />
            {searchResultsBar()}
            <div className={classes.gameHistory}>
                {
                    items.length > 0
                        ? all
                        : infiniteLoading
                            ? <div className={classes.gameHistory__spinner}><Spinner color={user.user.color} /></div>
                            : <NavLink to='/game'>No games to display. Play one?</NavLink>
                }
            </div>
            {loadMoreBar()}
        </div>
    )
}

export default withOrientationChange(GameHistory);