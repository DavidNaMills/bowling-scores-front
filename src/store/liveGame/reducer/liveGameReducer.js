import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_NEW_GAME,
    UPDATE_INDIVIDUAL_SCORE,
    RESET_LIVE_GAME
} from '../liveGameActionTypes';

const defaultState = {
    players: {},
    games: {}
};

const liveGameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INIT_GAME:
            return action.payload;

        case LOAD_GAME:
            return action.payload;


        case ADD_PLAYER:
            return action.payload;

        case REMOVE_PLAYER:
            return action.payload;


        case ADD_NEW_GAME:
            return action.payload;

        case UPDATE_INDIVIDUAL_SCORE:
            return action.payload;

        case RESET_LIVE_GAME:
            return defaultState;

        default:
            return state;
    }

}

export default liveGameReducer;