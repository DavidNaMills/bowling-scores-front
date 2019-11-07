import React from 'react';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';

import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';

const tHeaders = ['Player', 'Average', 'Pinfall'];

const GameDetails = ({ liveGame, addNewPlayers, playerSelect, addScores, newGame }) => {
    return (
        <div>
            <Button click={newGame} label='Start new game' />
            <Button click={addScores} label='Add Scores' />

            <GameChart
                players={liveGame.players}
                data={chartParser(liveGame)}
            />
            <Table
                data={{
                    headers: tHeaders,
                    rows: tableParser(liveGame)
                }}
                showRowNum
                selectRow={playerSelect}
                caption='Click player for more details'
            />
            <Button click={addNewPlayers} label='Add Players' />
        </div>
    )
}


export default GameDetails;