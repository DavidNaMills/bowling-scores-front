import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';


export const userLogin = (data) => ({
    type: USER_LOGIN,
    payload: data
});


export const userLogout = () => ({
    type: USER_LOGOUT
});


export const userInitGames = (data) => ({
    type: USER_INIT_GAMES,
    payload: data
});