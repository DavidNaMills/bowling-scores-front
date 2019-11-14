import userReducer from './userReducer';
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT_GAMES
} from '../userActionTypes';


const defaultState = {
    token: null,
    user: null,
}

describe('Redux userReducer test suite', ()=>{
    //init
    it('initialises the state appropriately', ()=>{
        const state = userReducer(undefined, {type: '@@INIT'})
        expect(state).toEqual(defaultState);
    });

    //default
    it('returns the default state if type is not found', ()=>{
        const action ={
            type: 'fdsa',
            payload: 'test'
        }
        const state= userReducer(defaultState, action);
        expect(state).toEqual(defaultState);
    });

    //adds users creds
    it('adds the users credentials to the state (USER_LOGIN)', ()=>{
        const action = {
            type: USER_LOGIN,
            payload: {
                token: 'df24fd54fsd',
                user: {
                    name: 'David'
                }
            }
        }; //end action

        const state = userReducer(defaultState, action);
        expect(state).toHaveProperty('token', action.payload.token);
        expect(state).toHaveProperty('user', action.payload.user);

    });


    //removes all user creds
    it('removes the user from the state', ()=>{
        const tempState = {
            token: 'fdsfdsfsdafsdfsd',
            user: {name: 'david'}
        };
        const state = userReducer(tempState, {type: USER_LOGOUT});
        expect(state).toEqual(defaultState);
    });
});
