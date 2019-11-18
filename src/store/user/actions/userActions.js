import {setAuthorizationToken} from '../../../Axios/axiosConfig';
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';

import {PLACEHOLDER_ID} from '../../../consts/placeHolderGameId';
import {commitNewGame, resetLiveGame} from '../../liveGame/actions/liveGameActions';


export const userLoginLocal = (data) => ({
    type: USER_LOGIN,
    payload: data
});

export const userLogin = (data) => (dispatch, getState)=>{
    setAuthorizationToken(data.token);
    dispatch(userLoginLocal(data));

    const {liveGame} = getState();
    if(liveGame && liveGame._id===PLACEHOLDER_ID){
        delete liveGame._id;
        dispatch(commitNewGame(liveGame));
    }
}

export const userLogoutLocal = () => ({
    type: USER_LOGOUT
});

export const userLogout = () => (dispatch, getState)=>{
    dispatch(resetLiveGame());
    dispatch(userLogoutLocal());
};


export const userInitGames = (data) => ({
    type: USER_INIT_GAMES,
    payload: data
});