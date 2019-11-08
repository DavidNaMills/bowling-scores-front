import React from 'react';

import body from '../../../styles/shared/container.module.scss';
import classes from './GameDetails.module.scss';

import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';

import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import pinfallSort from '../../../helpers/pinfallSort/pinfallSort';

const tHeaders = ['Player', 'Average', 'Pinfall'];

const GameDetails = ({ liveGame, addNewPlayers, playerSelect, addScores, newGame }) => (
    <div className={[body.contentContainer].join(' ')}>
        <div className={classes.gameDetails__btns}>
            <Button isFull click={addScores} label='Add Scores' />
        </div>

        <GameChart
            players={liveGame.players}
            data={chartParser(liveGame)}
        />
        <div className={classes.gameDetails__btns}>

            <Table
                data={{
                    headers: tHeaders,
                    rows: pinfallSort(tableParser(liveGame))
                }}
                showRowNum
                selectRow={playerSelect}
                caption='Click player for more details'
            />
        </div>

        <div className={classes.gameDetails__largeExtra}>
            <Button isFull click={addNewPlayers} label='Add Players' />

            <div className={classes.gameDetails__extra}>
            <Button type='danger' click={newGame} label='Start new game' />
            </div>
        </div>
    </div>
)



export default GameDetails;