import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useLocalStorage from '../../Hooks/useLocalStorage/useLocalStorage';
import useDispatchHook from '../../Hooks/useDispatchHook/useDispatchHook';

import GameDetails from './GameDetails/GameDetails';
import AddScores from './AddScores/AddScores';
import AddPlayersForm from './AddPlayersForm/AddPlayersForm';

import Popup from '../../Components/StandAloneComponents/Popup/Popup';
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

    const { readFromLocalStorage, writeToLocalStorage } = useLocalStorage();
    const { initGameDispatch } = useDispatchHook();

    const [showWhich, setWhich] = useState(showDefault);
    const [showPopup, setPopup] = useState(false);


    useEffect(() => {
        const hasExistingGame = readFromLocalStorage();
        const plr = Object.keys(liveGame.players).length;
        const gms = Object.keys(liveGame.games).length;

        if (hasExistingGame && plr===0 && gms===0) {
            initGameDispatch(JSON.parse(hasExistingGame));
            setPopup(true);
        }
    }, []);

    useEffect(() => {
        writeToLocalStorage(liveGame);
    }, [liveGame]);



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
            addscores: false,
            newGame: false
        }
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
            close={() => changeFromGame('gameDetails')}
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

    const buildPopup = () => (
        <Popup
            title={{
                label: 'Game in Progress',
                ttlType: 'sub'
            }}
            message='Hey!!! you have already started a game. would you like to continue or start a new game?'
            action1={{
                label: 'Start New Game',
                type: 'default',
                click: () => {changeFromGame('newGame'); setPopup(false)}
            }}
            action2={{
                label: 'Continue',
                type: 'blue',
                click: () => setPopup(false)
            }}
            close={() => setPopup(false)}
        />
    )

    return (
        <div>
            <Title ttlType='section' label='Bowling Scores: Play' />
            {showPopup && buildPopup()}
            {showWhich.gameDetails && buildGameDetails()}
            {showWhich.newGame && buildNewGame()}
            {showWhich.addPlayers && buildAddPlayersForm()}
            {showWhich.addscores && buildAddScores()}

        </div>
    )
}

export default Game;