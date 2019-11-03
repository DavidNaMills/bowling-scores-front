import React from 'react';
import Title from '../../Components/StandAloneComponents/Title/Title';
import Button from '../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../Components/GameChart/GameChart';
import Table from '../../Components/Table/Table';

import classes from './Game.module.scss';

import realData from '../../helpers/tableGamesDataModifier/testData';
import tableParser from '../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../helpers/chartDataModifier/chartDataModifier';

const tHeaders = ['Player', 'Average', 'Pinfall'];


const testData = {
    headers: tHeaders,
    rows: tableParser(realData)
}


const Game = (props) => {

    const onClick = (id) => {
        props.history.push({
            pathname: '/player',
            state: { 
                id,
                gameData: realData
             }
          })
    }

    return (
        <div>
            <Title ttlType='section' label='Play' />
            <p>
                <GameChart
                    players={realData.players}
                    data={chartParser(realData)}
                />
                <Table
                    data={testData}
                    showRowNum
                    selectRow={onClick}
                    caption='Click player for more details'
                />
            </p>
        </div>
    )
}

export default Game;