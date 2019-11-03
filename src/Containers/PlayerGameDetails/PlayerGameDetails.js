import React, {useMemo} from 'react';
import Title from '../../Components/StandAloneComponents/Title/Title';
import Button from '../../Components/StandAloneComponents/Button/Button';
import GameChart from '../../Components/GameChart/GameChart';
import Table from '../../Components/Table/Table';

import tableModifier from '../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../helpers/chartDataModifier/chartDataModifier';
import singlePlayerScores from '../../helpers/singlePlayerScores/singlePlayerScores';

const tHeaders = ['Average', 'Pinfall']
const tHeaders2 = ['Score']


const PlayerGameDetails = (props) => {
    const id = useMemo(()=>props.location.state.id);
    const gameData = useMemo(()=>props.location.state.gameData);
    
    const table1 = useMemo(()=>({
        headers: tHeaders,
        rows: tableModifier(gameData, id)
    }));
    
    const scoreData = useMemo(()=>({
        headers: tHeaders2,
        rows: singlePlayerScores(gameData, id)
    }));

    return (
        <div>
            <Title label={gameData.players[id].name} ttlType='section' />
            <Table
                data={table1}
            />

            <GameChart
                players={gameData.players}
                data={chartParser(gameData, id)}
            />

            <Table
                data={scoreData}
                showRowNum
            />
            <br/>
            <Button isFull label='Edit Scores' type='warning' click={()=>{alert('Edit Scores')}}/>
            <br/>
            <Button isFull label='Back' type='default' click={()=>{props.history.goBack()}}/>
            <br/>
            <Button isFull label='Remove Player' type='danger' click={()=>{alert('delete player')}}/>
        </div>
    )
}

export default PlayerGameDetails;

/**
 *
 */
