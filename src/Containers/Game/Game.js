import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useLocalStorage from '../../Hooks/useLocalStorage/useLocalStorage';
import useDispatchHook from '../../Hooks/useDispatchHook/useDispatchHook';

import GameDetails from './GameDetails/GameDetails';
import AddScores from './AddScores/AddScores';
import AddPlayersForm from './AddPlayersForm/AddPlayersForm';

import Popup from '../../Components/StandAloneComponents/Popup/Popup';
import Title from '../../Components/StandAloneComponents/Title/Title';

import {PLACEHOLDER_ID} from '../../consts/placeHolderGameId';

// import classes from './Game.module.scss';


const showDefault = {
    gameDetails: true,
    addPlayers: false,
    addscores: false,
    newGame: false
}

const Game = (props) => {
    const liveGame = useSelector(state => state.liveGame);
    const user = useSelector(state => state.user);

    const { readFromStorage } = useLocalStorage();
    const { initGameDispatch, resetLiveGameDispatch} = useDispatchHook();

    const [showWhich, setWhich] = useState(showDefault);
    const [showPopup, setPopup] = useState(false);
    const [showPopup2, setPopup2] = useState(false);


    useEffect(() => {
        const hasExistingGame = readFromStorage();
        const plr = Object.keys(liveGame.players).length;

        if(hasExistingGame._id !== PLACEHOLDER_ID && !user.token || user.user._id !== hasExistingGame._id) {
            setPopup2(true);
        }else if (hasExistingGame && plr === 0) {
            initGameDispatch(JSON.parse(hasExistingGame));
            setPopup(true);
        }
    }, []);


    // useEffect(() => {
    //     const plr = Object.keys(liveGame.players).length;
    //     if (plr > 0) {
    //         writeToLocalStorage(liveGame);
    //     }
    // }, [liveGame]);



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
            history={props.history}
            user={user.token}
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
                click: () => { changeFromGame('newGame'); setPopup(false) }
            }}
            action2={{
                label: 'Continue',
                type: 'blue',
                click: () => setPopup(false)
            }}
            close={() => setPopup(false)}
        />
    )
    
    const buildPopup2 = () => (
        <Popup
            title={{
                label: 'Slight problem...',
                ttlType: 'sub'
            }}
            message='There is a game in progress, but you need to login to continue'
            action1={{
                label: 'Start New Game',
                type: 'default',
                click: () => { changeFromGame('newGame'); setPopup2(false) }
            }}
            action2={{
                label: 'Login',
                type: 'darkBlue',
                click: () => {setPopup2(false); props.history.push('/login')}
            }}
        />
    )

    return (
        <div>
            <Title ttlType='section' label='Bowling Scores: Play' />
            {showPopup && buildPopup()}
            {showPopup2 && buildPopup2()}
            {showWhich.gameDetails && buildGameDetails()}
            {showWhich.newGame && buildNewGame()}
            {showWhich.addPlayers && buildAddPlayersForm()}
            {showWhich.addscores && buildAddScores()}

        </div>
    )
}

export default Game;