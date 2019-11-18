import React from 'react';

import body from '../../../styles/shared/container.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';

import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';
import StaticPrompt from '../../../Components/StandAloneComponents/StaticPrompt/StaticPrompt';

import useGetDimensions from '../../../Hooks/useGetDimensions/useGetDimensions';

import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import pinfallSort from '../../../helpers/pinfallSort/pinfallSort';

const tHeaders = ['Player', 'Average', 'Pinfall'];

const GameDetails = ({ liveGame, addNewPlayers, playerSelect, addScores, newGame, user, history }) => {
    const { dimensions } = useGetDimensions();

    const message = "Login or Signup to save your game!";
    const button1 = {
        label: "Signup",
        type: 'darkGreen',
        click: ()=>{history.push('/signup')}
    }
    const button2 = {
        label: "Login",
        type: 'darkBlue',
        click: ()=>{history.push('/login')}
    }

    return (
        <div className={[body.contentContainer].join(' ')}>
            {
                !user&&
                <StaticPrompt message={message} button1={button1} button2={button2}/>
            }

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