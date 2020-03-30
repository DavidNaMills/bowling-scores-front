import React, {useMemo} from 'react';

import body from '../../../styles/shared/container.module.scss';
import spacing from '../../../styles/shared/spacing.module.scss';
import classes from './GameDetails.module.scss';

import { isMobileOnly, isTablet, withOrientationChange } from 'react-device-detect';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';
import StaticPrompt from '../../../Components/StandAloneComponents/StaticPrompt/StaticPrompt';
import Title from '../../../Components/StandAloneComponents/Title/Title';

import tableParser from '../../../helpers/tableGamesDataModifier/tableGamesDataModifier';
import pinfallSort from '../../../helpers/pinfallSort/pinfallSort';
import chartParser from '../../../helpers/chartDataModifier/chartDataModifier';
import generateDate from '../../../helpers/generateDate/generateDate';

const tHeaders = ['Player', 'Average', 'Pinfall'];
let width = 0

const message = "Login or Signup to save your game!";


const GameDetails = ({ liveGame, addNewPlayers, playerSelect, addScores, newGame, user, history, ...rest }) => {
    const button1 = useMemo(()=>({
        label: "Signup",
        type: 'darkGreen',
        click: () => { history.push('/signup') }
    }), []);

    // useMemo
    const button2 = useMemo(()=>({
        label: "Login",
        type: 'darkBlue',
        click: () => { history.push('/login') }
    }), []);



    if (isMobileOnly) {
        width = rest.isPortrait
            ? (window.innerWidth - 50)
            : (window.innerWidth - 100);
    } else if (isTablet) {
        width = rest.isPortrait
            ? 700
            : 800;
    } else {
        width = 800;
    }

    return (
        <div className={[body.contentContainer].join(' ')}>
            {
                !user &&
                <StaticPrompt message={message} button1={button1} button2={button2} />
            }

            <Title label={useMemo(()=>generateDate(liveGame.createdAt), [liveGame.createdAt])} />

            <div className={classes.gameDetails__center}>
                <GameChart
                    players={liveGame.players}
                    data={useMemo(()=>chartParser(liveGame), [liveGame])}
                    width={width}
                />
            </div>
            <div className={classes.gameDetails__width}>
                <div className={spacing.btns}>
                    <Button isFull click={addScores} label='Add Scores' />
                </div>
                <div className={spacing.btns}>
                    <Button isFull type='blue' click={addNewPlayers} label='Add Players' />
                </div>
                <div className={spacing.btns}>

                    <Table
                        data={{
                            headers: tHeaders,
                            rows: useMemo(()=>pinfallSort(tableParser(liveGame)), [liveGame])
                        }}
                        showRowNum
                        selectRow={playerSelect}
                        caption='Click player for more details'
                    />
                </div>

                <div className={spacing.largeExtra}>


                    <div className={spacing.extra}>
                        <Button type='darkgreen' click={newGame} label='Start new game' />
                    </div>
                </div>
            </div>

        </div>
    )
}



export default withOrientationChange(GameDetails);