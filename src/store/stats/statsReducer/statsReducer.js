import {UPDATE_STATS, CLEAR_STATS} from '../statsActionTypes';

const defaultState = {
    average: 0,
    ttlGames: 0,
    ttlPinFall: 0,
    ttlFrames: 0
};

const statsReducer = (state = defaultState, action)=>{
    switch(action.type){
        case UPDATE_STATS:
            return action.payload;
        case CLEAR_STATS:
            return defaultState;
        default:
            return state;
    }
}

export default statsReducer;