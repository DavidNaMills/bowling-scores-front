import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    UPDATE_ALL_SCORES,
    UPDATE_INDIVIDUAL_SCORE,
    ADD_NEW_GAME,
    RESET_LIVE_GAME,
    SET_LOADING
} from '../liveGameActionTypes';

import gameReducer from './liveGameReducer';
import toLoad from '../../../helpers/tableGamesDataModifier/testData';

const playerData = {
    players: {
        123: { name: 'david', color: 'red' },
        456: { name: 'paul', color: 'blue' }
    },
    games: {}
}


describe('liveGameReducer test suite', () => {
    it('should initialise the default state', () => {
        const state = gameReducer(undefined, { type: '@@INIT' })
        expect(state).toEqual({
            games: {},
            players: {},
            isLoading: false
        });
    });


    it('should initialise a new game with players', () => {
        const state = gameReducer({}, { type: INIT_GAME, payload: playerData });
        expect(Object.keys(state.players).length).toBe(2);
        expect(Object.keys(state.games).length).toBe(0);

        for (let k in state.players) {
            expect(state.players[k]).toEqual(playerData.players[k]);
        }
    });


    it('should load a game', () => {
        const state = gameReducer({}, { type: LOAD_GAME, payload: toLoad });
        expect(Object.keys(state.players).length).toBe(3);
        expect(Object.keys(state.games).length).toBe(3);

        for (let k in state.players) {
            expect(state.players[k]).toEqual(toLoad.players[k])
        }

        for (let k in state.games) {
            expect(state.games[k]).toEqual(toLoad.games[k])
        }
    });


    it('should add a new player to the players object with ID specified', () => {
        const test = {
            players: {
                alan: {test: 123}
            }
        };

        const state = gameReducer(toLoad, { type: ADD_PLAYER, payload: test });
        expect(state).toEqual({
            ...test,
            isLoading: false
        });
    });


    it('should add a new player to the players object and generates an ID', () => {
        const test = {
            players: {
                alan: {test: 123}
            }
        };

        const state = gameReducer(toLoad, { type: ADD_PLAYER, payload: test });
        expect(state).toEqual({
            ...test,
            isLoading: false
        });
    });


    it('should remove a player from the players object', () => {
        const test = {
            players: {
                alan: {test: 123}
            }
        };

        const state = gameReducer(toLoad, { type: REMOVE_PLAYER, payload: test });
        expect(state).toEqual({
            ...test,
            isLoading: false
        });
    });


    it('should remove a player from all games', () => {
        const id = 123;
        for (let k in toLoad.games) {
            expect(toLoad.games[k][id]).toBeTruthy();
        }
        const state = gameReducer(toLoad, { type: REMOVE_PLAYER, payload: id });
        for (let k in state.games) {
            expect(state.games[k][id]).toBeFalsy();
        }
    });


    it('adds a new game to the games object and auto sets the key', () => {
        const newGame = {
            games: {
                123: {
                    name: 'david',
                    score: 156
                },
                456: {
                    name: 'paul',
                    score: 248
                }
            }
        };

        const state = gameReducer(toLoad, { type: ADD_NEW_GAME, payload: newGame });
        expect(state).toEqual({
            ...newGame,
            isLoading: false
        });
    });

    it('updates an individual players score <UPDATE_INDIVIDUAL_SCORE>', () => {
        const test = {
            players: {
                'fdsafsdafsda': { name: 'david' }
            },
            games: {
                123: {
                    name: 'david',
                    score: 156
                },
                456: {
                    name: 'paul',
                    score: 248
                }
            }
        };
        const state = gameReducer(toLoad, { type: UPDATE_INDIVIDUAL_SCORE, payload: test });
        expect(state).toEqual({
            ...test,
            isLoading: false
        })
    });

    it('resets the live game', ()=>{
        const test = {
            players: {
                'fdsafsdafsda': { name: 'david' }
            },
            games: {
                123: {
                    name: 'david',
                    score: 156
                },
                456: {
                    name: 'paul',
                    score: 248
                }
            }
        };
        const state = gameReducer(toLoad, { type: RESET_LIVE_GAME, payload: test });
        expect(state).toEqual({
            ...test,
            isLoading: false
        })
    });
    it('sets the loading to true', ()=>{
        const state = gameReducer(toLoad, { type: SET_LOADING, payload: true });
        expect(state).toEqual({
            isLoading: true,
            ...toLoad
        })
    });

});