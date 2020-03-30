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

const defaultState = {
    players: {},
    games: {},
    loggedIn: null, 
    isLoading: false
};

const TIME = 2500;

const liveGameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INIT_GAME:
            return {
                ...action.payload,
                isLoading: false
            };

        case LOAD_GAME:
            return {
                ...action.payload,
                isLoading: false
            };


        case ADD_PLAYER:
            return {
                ...action.payload,
                isLoading: false
            };

        case REMOVE_PLAYER:
            return {
                ...action.payload,
                isLoading: false
            };


        case ADD_NEW_GAME:
            return {
                ...action.payload,
                isLoading: false
            };

        case UPDATE_INDIVIDUAL_SCORE:
            return defaultState;

        case RESET_LIVE_GAME:
            return defaultState;

        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return state;
    }

}

export default liveGameReducer;