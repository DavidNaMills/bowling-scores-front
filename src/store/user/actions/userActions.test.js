import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';

import thunk from 'redux-thunk';
import { userLogin, userLoginLocal, userLogout, userLogoutLocal, userInitGames } from './userActions';
import configureStore from 'redux-mock-store';

jest.mock('../../../Axios/axiosConfig', () => ({
    setAuthorizationToken: jest.fn(),
}));
import {setAuthorizationToken} from '../../../Axios/axiosConfig';

const mockStore = configureStore([thunk]);

describe('user actions (REDUX) test suite', () => {
    it('starts the userLogin process', ()=>{
        // setAuthorizationToken = jest.spyOn();
        const tempUser = {
            token: 'fdasfdsafdfsda',
            user: {
                name: 'david'
            }
        };

        const store = mockStore();
        store.dispatch(userLogin(tempUser));
        const actions = store.getActions();

        const expectedActions = [{
            type: USER_LOGIN,
            payload: tempUser
        }]
        expect(actions.length).toBe(1);
        expect(actions).toEqual(expectedActions);
        expect(setAuthorizationToken).toHaveBeenCalledTimes(1);
        expect(setAuthorizationToken).toHaveBeenCalledWith(tempUser.token);
    });

    it('creates the userLoginLocal action', () => {
        const testLogin = {
            token: 'vd23f4df4d3as',
            user: {
                name: 'david'
            }
        }
        const action = userLoginLocal(testLogin);
        expect(action.type).toEqual(USER_LOGIN);
        expect(action.payload.token).toEqual(testLogin.token);
        expect(action.payload.user).toEqual(testLogin.user);
    });


    //logout
    it('creates the userLogout action', () => {
        const store = mockStore({liveGame: {}, user: {}});
        const expectedActions = [
            {type: 'RESET_LIVE_GAME'},
            {type: 'USER_LOGOUT'}
        ]

        store.dispatch(userLogout());
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions).toEqual(expectedActions);
    });


    //initgames
    it('creates the user games init action', () => {
        const testGames = [
            { date: 'fdsafdsa', players: { '14343': 123 } },
            { date: 'fdsafdsa', players: { '14343': 123 } },
        ];

        const action = userInitGames(testGames);
        expect(action.type).toEqual(USER_INIT_GAMES);
        expect(action.payload).toEqual(testGames);
    });

    it('creates a userLogoutLocal action', ()=>{
        const action = userLogoutLocal();
        expect(action.type).toEqual(USER_LOGOUT);
        expect(action).not.toHaveProperty('payload');
    });
});