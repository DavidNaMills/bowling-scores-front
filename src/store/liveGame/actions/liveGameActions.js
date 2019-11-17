import uuid from 'uuid';
import axios from '../../../Axios/axiosConfig';
import { NEW_GAME, ADD_FRAME, ADD_PLAYER_URL, UPDATE_GAME_SCORES, REMOVE_PLAYER_URL} from '../../../Axios/URLS';
import { PLACEHOLDER_ID } from '../../../consts/placeHolderGameId';

import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_NEW_GAME,
    UPDATE_INDIVIDUAL_SCORE
} from '../liveGameActionTypes';


export const initGame = (playerData) => ({
    type: INIT_GAME,
    payload: {
        _id: playerData._id ? playerData._id : PLACEHOLDER_ID,
        createdAt: playerData.createdAt ? playerData.createdAt : new Date(),
        players: playerData.players ? playerData.players : {},
        games: playerData.games ? playerData.games : {},
    }
});


export const commitNewGame = (playerData) => async (dispatch, getState) => {
    await axios({
        method: 'POST',
        url: NEW_GAME,
        data: playerData
    })
        .then((res) => {
            if (res.data.error) {
                console.log(res.data.errors);
            } else {
                dispatch(initGame(res.data.item));
            }
        })
        .catch(err => {
            console.log(err);
        })
}




export const loadGame = (prevGame) => ({
    type: LOAD_GAME,
    payload: prevGame
})

export const addPlayerLocal = (newPlayer) => ({
    type: ADD_PLAYER,
    payload: newPlayer
});

export const addPlayer = (newPlayer) => async (dispatch, getState) => {
    const { user, liveGame } = getState();
    const tempId = uuid();

    if (!user.token || liveGame._id === PLACEHOLDER_ID) {
        dispatch(addPlayerLocal(newPlayer));
    } else {
        await axios({
            method: 'POST',
            url: `${ADD_PLAYER_URL}/${liveGame._id}`,
            data: {
                key: tempId,
                data: newPlayer
            }
        })
            .then((res) => {
                if (!res.error) {
                    dispatch(addPlayerLocal({ ...newPlayer, _id: tempId }));
                }
            })
    }
}




export const removePlayerLocal = (playerId) => ({
    type: REMOVE_PLAYER,
    payload: playerId
});

export const removePlayer = (playerId) => async(dispatch, getState)=>{
    const {user, liveGame} = getState();
    
    if (!user.token || liveGame._id === PLACEHOLDER_ID) {
        dispatch(removePlayerLocal(playerId));
    } else{
        await axios({
            method: 'DELETE',
            url: `${REMOVE_PLAYER_URL}/${liveGame._id}/${playerId}`,
        })
        .then(res=>{
            if(!res.error){
                dispatch(removePlayerLocal(playerId));
            }
        })
    }
}







export const addNewGameLocal = (newGame, key) => ({
    type: ADD_NEW_GAME,
    payload: {
        key,
        data: newGame
    }
});

//Thunk
export const addNewGame = (newGame) => async (dispatch, getState) => {
    const { user, liveGame } = getState();
    const key = Object.keys(liveGame.games).length + 1;

    if (!user.token || liveGame._id === PLACEHOLDER_ID) {
        dispatch(addNewGameLocal(newGame, key));
    } else {
        await axios({
            method: 'POST',
            url: `${ADD_FRAME}/${liveGame._id}`,
            data: {
                key,
                data: newGame
            }
        })
            .then((res) => {
                if (!res.error) {
                    dispatch(addNewGameLocal(newGame, key));
                }
            })
    }
}



export const updateIndividualScoreLocal = (updatedScores) => ({
    type: UPDATE_INDIVIDUAL_SCORE,
    payload: updatedScores
});

export const updateIndividualScore = (updatedScores) => async (dispatch, getState) => {
    const { user, liveGame } = getState();

    if (!user.token || liveGame._id === PLACEHOLDER_ID) {
        dispatch(updateIndividualScoreLocal(updatedScores));
    } else {
        await axios({
            method: 'PUT',
            url: `${UPDATE_GAME_SCORES}/${liveGame._id}`,
            data: {
                userId: updatedScores.id,
                scores: updatedScores.scores
            }
        })
            .then((res) => {
                if (!res.error) {
                    dispatch(updateIndividualScoreLocal(updatedScores));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

}
