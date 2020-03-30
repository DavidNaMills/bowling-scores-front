import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import GameDetails from './GameDetails/GameDetails';
import AddPlayersForm from './AddPlayersForm/AddPlayersForm';
import AddScores from './AddScores/AddScores';
import SelectAnonPlayer from './SelectAnonPlayer/SelectAnonPlayer';

import useShowHook from '../../Hooks/useShowHook/useShow';
import useToggle from '../../Hooks/useToggle/useToggle';
import useSubmitAnonPlayer from './GameHooks/useSubmitAnonPlayer/useSubmitAnonPlayer';
import useFindExisting from './GameHooks/useFindExisting/useFindExisting';

import PopUp from '../../Components/StandAloneComponents/Popup/Popup';
import Popup1Body from './GamePopups/Popup1Body';
import Popup2Body from './GamePopups/Popup2Body';
import Popup3Body from './GamePopups/Popup3Body';
import Popup4Body from './GamePopups/Popup4Body';

const showDefault = {
    gameDetails: false,
    addPlayers: false,
    newGame: false,
    addScores: false,
    selectPlayer: false
};

const popupDefault = {
    popup1: false,
    popup2: false,
    popup3: false,
    popup4: false,
}

const Game = (props) => {
    const hasChecked = useRef(false);
    const existingGame = useRef(null);

    const state = useSelector(state => state);
    const user = state.user;
    const liveGame = state.liveGame;

    const { isShow, changeShow } = useShowHook(showDefault, null);
    const { toggle, makeToggle } = useToggle(popupDefault);
    const { makeSubmit } = useSubmitAnonPlayer({
        existingGame,
        changeShow,
        user
    });
    const { checkForExisting } = useFindExisting({ makeToggle, existingGame, user, hasChecked });

    useEffect(() => {
        checkForExisting();
        changeShow('newGame');
    }, [])

    useEffect(() => {
        if (!liveGame.isLoading) {
            if (liveGame && Object.keys(liveGame.players).length < 1) {
                changeShow('newGame');
            } else {
                changeShow('gameDetails');
            }
        }
    }, [liveGame]);


    const playerSelect = (id) => {
        changeShow(showDefault);
        props.history.push({
            pathname: '/player',
            state: {
                id,
                length: Object.keys(liveGame.players).length
            }
        })
    }


    return (
        <div>
            {toggle.popup1 && <PopUp>
                <Popup1Body
                    openPopup={makeToggle}
                    hasExistingGame={existingGame.current}
                    id='popup1'
                />
            </PopUp>}
            {toggle.popup2 && <PopUp>
                <Popup2Body
                    openPopup={makeToggle}
                    hasExistingGame={existingGame.current}
                    id='popup2'
                    push={props.history.push}
                />
            </PopUp>}

            {toggle.popup3 && <PopUp>
                <Popup3Body
                    openPopup={makeToggle}
                    hasExistingGame={existingGame.current}
                    id='popup3'
                    changeFromGame={changeShow}
                />
            </PopUp>}
            {toggle.popup4 && <PopUp>
                <Popup4Body
                    openPopup={makeToggle}
                    id='popup4'
                />
            </PopUp>}
            {
                isShow.gameDetails
                    ? <GameDetails
                        liveGame={liveGame}
                        addNewPlayers={() => changeShow('addPlayers')}
                        playerSelect={playerSelect}
                        addScores={() => changeShow('addScores')}
                        newGame={() => changeShow('newGame')}
                        history={props.history}
                        user={user.token}
                    /> : null
            }
            {
                isShow.addPlayers
                    ? <AddPlayersForm
                        title='Add Player'
                        liveGame={liveGame}
                        playerSelect={playerSelect}
                        onClose={() => changeShow('gameDetails')}
                    />
                    : null
            }
            {
                isShow.addScores ?
                    <AddScores
                        players={liveGame.players}
                        close={() => { changeShow('gameDetails') }}
                        onClose={() => { changeShow('gameDetails') }}
                        user={user}
                    />
                    : null
            }
            {
                isShow.newGame ?
                    <AddPlayersForm
                        title='Create New Game'
                        liveGame={{}}
                        playerSelect={() => { }}
                        onClose={() => {
                            if (Object.keys(liveGame.players).length === 0) {
                                props.history.push('/');
                            } else {
                                changeShow('gameDetails')
                            }
                        }}
                        isNew
                        close={() => changeShow('gameDetails')}
                    />
                    : null
            }
            {
                isShow.selectPlayer &&
                <SelectAnonPlayer
                    game={existingGame.current}
                    cancelClick={() => changeShow('newGame')}
                    submitClick={makeSubmit}
                />
            }
        </div>
    )
}

export default Game;