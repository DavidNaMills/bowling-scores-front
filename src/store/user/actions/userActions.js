import {setAuthorizationToken} from '../../../Axios/axiosConfig';
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';


export const userLoginLocal = (data) => ({
    type: USER_LOGIN,
    payload: data
});

export const userLogin = (data) => (dispatch)=>{
    setAuthorizationToken(data.token);
    dispatch(userLoginLocal(data));
}

export const userLogout = () => ({
    type: USER_LOGOUT
});


export const userInitGames = (data) => ({
    type: USER_INIT_GAMES,
    payload: data
});