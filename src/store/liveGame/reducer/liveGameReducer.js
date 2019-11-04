import uuid from 'uuid';

import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_NEW_GAME,
    UPDATE_INDIVIDUAL_SCORE
} from '../liveGameActionTypes';


const liveGameReducer = (state = {}, action) => {
    const tempState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case INIT_GAME:
            return {
                players: action.payload,
                games: {}
            }


        case LOAD_GAME:
            return action.payload;


        case ADD_PLAYER:
            const id = action.payload.id ? action.payload.id : uuid();
            tempState.players[id] = {
                name: action.payload.name,
                color: action.payload.color
            }
            return tempState;


        case REMOVE_PLAYER:
            const tempPlayers = JSON.parse(JSON.stringify(state.players));
            const tempGames = JSON.parse(JSON.stringify(state.games));

            delete tempPlayers[action.payload];

            for(let k in tempGames){
                delete tempGames[k][action.payload]
            }

            return {
                players: tempPlayers,
                games: tempGames
            };


        case ADD_NEW_GAME:
            const key = +Object.keys(tempState.games).length + 1;
            tempState.games[`${key}`] = action.payload;
            return tempState;


        case UPDATE_INDIVIDUAL_SCORE:
            for(let key in action.payload.scores){
                if(+action.payload.scores[key]===0){
                    delete tempState.games[key][action.payload.id]
                } else {
                    tempState.games[key][action.payload.id].score 
                    = action.payload.scores[key];
                }
            }
            return tempState;


        default:
            return state;
    }

}

export default liveGameReducer;