import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/allActions';

import GameDetails from './GameDetails/GameDetails';
import AddScores from './AddScores/AddScores';
import AddPlayersForm from './AddPlayersForm/AddPlayersForm';

import Title from '../../Components/StandAloneComponents/Title/Title';

import classes from './Game.module.scss';


const showDefault = {
    gameDetails: true,
    addPlayers: false,
    addscores: false
}

const Game = (props) => {
    console.log('[Game]');

    const dispatch = useDispatch();
    const liveGame = useSelector(state => state.liveGame);

    const createNewGame = () => dispatch(actions.initGame());
    const addNewPlayerDispatch = (data) => dispatch(actions.addPlayer(data));
    const addNewGameDispatch = (data) => dispatch(actions.addNewGame(data));

    const [showWhich, setWhich] = useState(showDefault);

    // useEffect(() => { }, [liveGame])

    const playerSelect = (id) => {
        setWhich(showDefault);
        props.history.push({
            pathname: '/player',
            state: {
                id
            }
        })
    }

    const changeFromGame = (id) => {
        const base = {
            gameDetails: false,
            addPlayers: false,
            addscores: false
        };
        setWhich({
            ...base,
            [id]: true
        })
    }

    const addNewGame = (data) => {
        addNewGameDispatch(data)
    }

    const buildGameDetails = () => (
        <GameDetails
            liveGame={liveGame}
            addNewPlayers={() => changeFromGame('addPlayers')}
            playerSelect={playerSelect}
            addScores={() => changeFromGame('addscores')}
        />
    )

    const buildAddPlayersForm = () => (
        <AddPlayersForm
            addNewPlayer={addNewPlayerDispatch}
            liveGame={liveGame}
            playerSelect={playerSelect}
            onClose={() => setWhich(showDefault)}
        />
    )

    const buildAddScores = () => (
        <AddScores
            players={liveGame.players}
            addGame={addNewGame}
            close={() => setWhich(showDefault)}
        />
    )

    return (
        <div>
            <Title ttlType='section' label='Play' />
            {showWhich.gameDetails && buildGameDetails()}
            {showWhich.addPlayers && buildAddPlayersForm()}
            {showWhich.addscores && buildAddScores()}

        </div>
    )
}
{/* <GameDetails
    addNewPlayers={addNewPlayers}
    liveGame={liveGame}
    playerSelect={playerSelect}
    onClose={onClose}
/> */}

export default Game;


/**
 * <Button click={startNewGame} label='New Game'/>

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
                selectRow={onClick}
                caption='Click player for more details'
            />
 */