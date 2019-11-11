import React from 'react';

import body from '../../../styles/shared/container.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';

import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';

import useGetDimensions from '../../../Hooks/useGetDimensions/useGetDimensions';

import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import pinfallSort from '../../../helpers/pinfallSort/pinfallSort';

const tHeaders = ['Player', 'Average', 'Pinfall'];

const GameDetails = ({ liveGame, addNewPlayers, playerSelect, addScores, newGame }) => {
    const { dimensions } = useGetDimensions();
    console.log(dimensions);

    return (
        <div className={[body.contentContainer].join(' ')}>
            <div className={spacing.btns}>
                <Button isFull click={addScores} type='blue' label='Add Scores' />
            </div>

            <GameChart
                players={liveGame.players}
                data={chartParser(liveGame)}
                width={dimensions.width}
            />
            <div className={spacing.btns}>

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

            <div className={spacing.largeExtra}>
                <Button isFull type='blue' click={addNewPlayers} label='Add Players' />

                <div className={spacing.extra}>
                    <Button type='darkgreen' click={newGame} label='Start new game' />
                </div>
            </div>
        </div>
    )
}



export default GameDetails;