import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    UPDATE_ALL_SCORES,
    UPDATE_INDIVIDUAL_SCORE
} from '../liveGameActionTypes';

export const initGame = (playerData) =>({
    type: INIT_GAME,
    payload: {
        players: playerData,
        games: {}
    }
});

export const loadGame = (prevGame) =>({
    type: LOAD_GAME,
    payload: prevGame
})

export const addPlayer = (newPlayer) =>({
    type: ADD_PLAYER,
    payload: newPlayer
});


export const removePlayer = (playerId) =>({
    type: REMOVE_PLAYER,
    payload: playerId
});


export const updateAllScores = (newGame) =>({
    type: UPDATE_ALL_SCORES,
    payload: newGame
});



export const updateIndividualScore = (updatedScores) =>({
    type: UPDATE_INDIVIDUAL_SCORE,
    payload: updatedScores
});
