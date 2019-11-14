import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';

const defaultState = {
    token: null,
    user: null,
};

const userReducer = (state=defaultState, action)=>{
    switch(action.type){
        case USER_LOGIN:
            return{
                token: action.payload.token,
                user: action.payload.user
            };
        case USER_LOGOUT:
            return defaultState;
        default:
            return state;
    }
}

export default userReducer;