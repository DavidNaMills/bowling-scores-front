import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import GameDetails from './GameDetails/GameDetails';
import AddScores from './AddScores/AddScores';
import AddPlayersForm from './AddPlayersForm/AddPlayersForm';

import Title from '../../Components/StandAloneComponents/Title/Title';

// import classes from './Game.module.scss';


const showDefault = {
    gameDetails: true,
    addPlayers: false,
    addscores: false,
    newGame: false
}

const Game = (props) => {
    const liveGame = useSelector(state => state.liveGame);

    const [showWhich, setWhich] = useState(showDefault);

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

    const buildGameDetails = () => (
        <GameDetails
            liveGame={liveGame}
            addNewPlayers={() => changeFromGame('addPlayers')}
            playerSelect={playerSelect}
            addScores={() => changeFromGame('addscores')}
            newGame={() => changeFromGame('newGame')}
        />
    )

    const buildNewGame = () => (
        <AddPlayersForm
            title='Create New Game'
            liveGame={{}}
            playerSelect={playerSelect}
            onClose={() => setWhich(showDefault)}
            isNew
            close = {()=>changeFromGame('gameDetails')}
        />
    )

    const buildAddPlayersForm = () => (
        <AddPlayersForm
            title='Add Player'
            liveGame={liveGame}
            playerSelect={playerSelect}
            onClose={() => setWhich(showDefault)}
        />
    )

    const buildAddScores = () => (
        <AddScores
            players={liveGame.players}
            close={() => setWhich(showDefault)}
        />
    )

    return (
        <div>
            <Title ttlType='section' label='Play' />
            {showWhich.gameDetails && buildGameDetails()}
            {showWhich.newGame && buildNewGame()}
            {showWhich.addPlayers && buildAddPlayersForm()}
            {showWhich.addscores && buildAddScores()}

        </div>
    )
}

export default Game;