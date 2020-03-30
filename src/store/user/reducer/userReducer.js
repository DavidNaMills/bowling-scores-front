import {
    USER_LOGIN,
    USER_LOGOUT,
    // USER_INIT_GAMES
} from '../userActionTypes';

const defaultState = {
    token: null,
    user: null,
};

const userReducer = (state=defaultState, action)=>{
    const tempState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case USER_LOGIN:
            return{
                token: action.payload.token,
                user: action.payload.user,
                stats: action.payload.stats
            };
        case USER_LOGOUT:
            return defaultState;
        default:
            return state;
    }
}

export default userReducer;