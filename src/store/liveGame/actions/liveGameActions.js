import uuid from 'uuid';
import axios from '../../../Axios/axiosConfig';
import { NEW_GAME, ADD_FRAME, ADD_PLAYER_URL, UPDATE_GAME_SCORES, REMOVE_PLAYER_URL } from '../../../Axios/URLS';
import { PLACEHOLDER_ID } from '../../../consts/placeHolderGameId';
import { LOCAL_STORAGE_FILE } from '../../../consts/localStorageFilename';

import {updateStats} from '../../allActions';

import { writeToLocalStorage } from '../../../helpers/localStorage/localStorage';
import { addNewPlayer } from '../../../helpers/addNewPlayer/addNewPlayer';
import { removePlayerHelper } from '../../../helpers/removePlayer/removePlayer';
import { updatePlayerScores } from '../../../helpers/updatePlayerScores/updatePlayerScores';
import { addNewFrame } from '../../../helpers/addNewFrame/addNewFrame';

import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_NEW_GAME,
    UPDATE_INDIVIDUAL_SCORE,
    RESET_LIVE_GAME,
    SET_LOADING
} from '../liveGameActionTypes';


const TIME = 2500;

export const initGame = (playerData) => ({
    type: INIT_GAME,
    payload: playerData
});

export const startLoading = (load) => ({
    type: SET_LOADING,
    payload: load
})

export const loadGame = (prevGame) => ({
    type: LOAD_GAME,
    payload: prevGame
})


export const addPlayerLocal = (newPlayer) => ({
    type: ADD_PLAYER,
    payload: newPlayer
});


export const removePlayerLocal = (playerId) => ({
    type: REMOVE_PLAYER,
    payload: playerId
});


export const addNewGameLocal = (newFrame) => ({
    type: ADD_NEW_GAME,
    payload: newFrame
});

export const updateIndividualScoreLocal = (updatedScores) => ({
    type: UPDATE_INDIVIDUAL_SCORE,
    payload: updatedScores
});

export const resetLiveGame = () => ({
    type: RESET_LIVE_GAME
});





export const commitNewGame = (playerData) => async (dispatch, getState) => {
    const { user } = getState();
    if (!user.token) {        //user not logged in
        const temp = {
            loggedIn: null,
            _id: playerData._id ? playerData._id : PLACEHOLDER_ID,
            createdAt: playerData.createdAt ? playerData.createdAt : new Date(),
            players: playerData.players ? playerData.players : {},
            games: playerData.games ? playerData.games : {},
        };
        dispatch(initGame(temp));
        writeToLocalStorage(LOCAL_STORAGE_FILE, temp);

    } else {        //user logged in
        dispatch(startLoading(true));
        await axios({
            method: 'POST',
            url: NEW_GAME,
            data: playerData
        })
            .then((res) => {
                if (!res.data.error) {
                    dispatch(initGame({
                        loggedIn: user.user._id,
                        ...res.data.item
                    }));
                    dispatch(updateStats(res.data.stats));

                    writeToLocalStorage(LOCAL_STORAGE_FILE, {
                        loggedIn: user.user._id,
                        ...res.data.item
                    });
                } else {
                    dispatch(startLoading(false));
                }

            })
            .catch(err => {
                dispatch(startLoading(false));
            })
    }
}



export const addPlayer = (newPlayer) => async (dispatch, getState) => {
    const { user, liveGame } = getState();
    const tempId = uuid();
    if (!user.token || liveGame._id === PLACEHOLDER_ID) {   //user not logged in
        newPlayer._id = tempId;
        const updated = addNewPlayer(liveGame, newPlayer);      //update the game object
        dispatch(addPlayerLocal(updated));      //update game store
        writeToLocalStorage(LOCAL_STORAGE_FILE, updated);   //update localstorage
    } else {
        dispatch(startLoading(true));
        await axios({           //make call to rest api and update store as logged in
            method: 'POST',
            url: `${ADD_PLAYER_URL}/${liveGame._id}`,
            data: {
                key: tempId,
                data: newPlayer
            }
        })
            .then((res) => {
                if (res.data.error) {
                    dispatch(startLoading(false));
                } else {
                    dispatch(addPlayerLocal(res.data.item));
                    writeToLocalStorage(LOCAL_STORAGE_FILE, {
                        loggedIn: user.user._id,
                        ...res.data.item
                    });
                }
            })
            .catch((err) => {
                dispatch(startLoading(false));
            })
    }
}




export const removePlayer = (playerId) => async (dispatch, getState) => {
    const { user, liveGame } = getState();

    if (!user.token || liveGame._id === PLACEHOLDER_ID) {       //user not logged in
        const result = removePlayerHelper(liveGame, playerId);
        dispatch(removePlayerLocal(result));
        writeToLocalStorage(LOCAL_STORAGE_FILE, result);
    } else {     //user logged in
        dispatch(startLoading(true));
        await axios({
            method: 'DELETE',
            url: `${REMOVE_PLAYER_URL}/${liveGame._id}/${playerId}`,
        })
            .then(res => {
                if (!res.data.error) {
                    dispatch(removePlayerLocal(res.data.item));
                    writeToLocalStorage(LOCAL_STORAGE_FILE, {
                        loggedIn: user.user._id,
                        ...res.data.item
                    });
                } else {
                    dispatch(startLoading(false));
                }
            })
            .catch((err) => {
                dispatch(startLoading(false));
            })
    }
}





export const addNewGame = (newGame) => async (dispatch, getState) => {
    const { user, liveGame } = getState();
    const key = liveGame.games
        ? Object.keys(liveGame.games).length + 1
        : 1

    if (!user.token || liveGame._id === PLACEHOLDER_ID) {       //user not logged in
        const result = addNewFrame(liveGame, newGame, key);
        dispatch(addNewGameLocal(result));
        writeToLocalStorage(LOCAL_STORAGE_FILE, result);
    } else {
        dispatch(startLoading(true));
        await axios({
            method: 'POST',
            url: `${ADD_FRAME}/${liveGame._id}`,
            data: {
                key,
                data: newGame
            }
        })
        .then((res) => {
            if (!res.data.error) {
                dispatch(addNewGameLocal(res.data.item));
                dispatch(updateStats(res.data.stats));
                writeToLocalStorage(LOCAL_STORAGE_FILE, {
                    loggedIn: user.user._id,
                    ...res.data.item
                });
            } else {
                dispatch(startLoading(false));
            }
        })
        .catch((err) => {
            dispatch(startLoading(false));
        })

    }
}





export const updateIndividualScore = (updatedScores) => async (dispatch, getState) => {
    const { user, liveGame } = getState();

    if (!user.token || liveGame._id === PLACEHOLDER_ID) {       //user not logged in
        const result = updatePlayerScores(liveGame, updatedScores.id, updatedScores.scores);
        dispatch(updateIndividualScoreLocal(result));
        writeToLocalStorage(LOCAL_STORAGE_FILE, result);
    } else {
        dispatch(startLoading(true));
        await axios({
            method: 'PUT',
            url: `${UPDATE_GAME_SCORES}/${liveGame._id}`,
            data: {
                userId: updatedScores.id,
                scores: updatedScores.scores
            }
        })
            .then((res) => {
                // if (!res.error) {
                if (!res.data.error) {      // Changed for axios. see line above. may need to fix 
                    dispatch(updateIndividualScoreLocal(res.data.item));
                    writeToLocalStorage(LOCAL_STORAGE_FILE, {
                        loggedIn: user.user._id,
                        ...res.data.item
                    });
                } else {
                    dispatch(startLoading(false));
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }

}