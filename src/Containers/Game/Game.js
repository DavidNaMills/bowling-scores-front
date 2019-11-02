import React from 'react';
import Title from '../../Components/StandAloneComponents/Title/Title';
import Button from '../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../Components/GameChart/GameChart';
import Table from '../../Components/Table/Table';

import classes from './Game.module.scss';

import realData from '../../helpers/tableGamesDataModifier/testData';
import tableParser from '../../helpers/tableGamesDataModifier/tableGamesDataModifier';


const tHeaders = ['Player', 'Average', 'Pinfall'];
// const tData = [
//     {
//         id: '',
//         values: ['david', 135, 2445, '+2'],
//     },
//     {
//         id: 'supertestdogman',
//         values: ['alan', 189, 2222, '-2'],
//     },
//     {
//         values: ['bear', 300, 7777, '+2']
//     }
// ];

const testData = {
    headers: tHeaders,
    rows: tableParser (realData)
}


const Game = () =>{

    const onClick=(id)=>{
        alert(`clicked on ${id}`);
    }

    return (
        <div>
            <Title ttlType='section' label='Play'/>
            <p>
                <GameChart />
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