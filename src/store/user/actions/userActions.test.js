import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';

import { userLogin, userLogout, userInitGames } from './userActions';


describe('user actions (REDUX) test suite', () => {
    //login

    it('creates the userLogin action', () => {
        const testLogin = {
            token: 'vd23f4df4d3as',
            user: {
                name: 'david'
            }
        }
        const action = userLogin(testLogin);
        expect(action.type).toEqual(USER_LOGIN);
        expect(action.payload.token).toEqual(testLogin.token);
        expect(action.payload.user).toEqual(testLogin.user);
    });

    //logout
    it('creates the user logout action', () => {
        const action = userLogout();
        expect(action.type).toEqual(USER_LOGOUT);
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
});