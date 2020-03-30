import { setAuthorizationToken } from '../../../Axios/axiosConfig';
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';
import { updateStats, clearStats } from '../../allActions';

import { resetLiveGame } from '../../liveGame/actions/liveGameActions';


export const userLoginLocal = (data) => ({
    type: USER_LOGIN,
    payload: data
});

export const userLogin = (data) => (dispatch) => {
    setAuthorizationToken(data.token);
    dispatch(userLoginLocal(data));
    dispatch(updateStats(data.stats));
}

export const userLogoutLocal = () => ({
    type: USER_LOGOUT
});

export const userLogout = () => (dispatch,) => {
    dispatch(resetLiveGame());
    dispatch(userLogoutLocal());
    dispatch(clearStats());
};

export const userInitGames = (data) => ({
    type: USER_INIT_GAMES,
    payload: data
});

