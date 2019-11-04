import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    UPDATE_ALL_SCORES,
    UPDATE_INDIVIDUAL_SCORE,
    ADD_NEW_GAME
} from '../liveGameActionTypes';

import gameReducer from './liveGameReducer';
import toLoad from '../../../helpers/tableGamesDataModifier/testData';

const playerData = {
    123: { name: 'david', color: 'red' },
    456: { name: 'paul', color: 'blue' }
}


describe('liveGameReducer test suite', () => {
    it('should initialise the default state', () => {
        const state = gameReducer(undefined, { type: '@@INIT' })
        expect(state).toEqual({});
    });


    it('should initialise a new game with players', () => {
        const state = gameReducer({}, { type: INIT_GAME, payload: playerData });
        expect(Object.keys(state.players).length).toBe(2);
        expect(Object.keys(state.games).length).toBe(0);

        for (let k in state.players) {
            expect(state.players[k]).toEqual(playerData[k]);
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
        const id = 1278456;
        const name = 'Bob';
        const color = 'purple'

        const newPlayer = {
            id, //if null auto create id in reducer. otherwise logged in _id
            name,
            color
        };

        const state = gameReducer(toLoad, { type: ADD_PLAYER, payload: newPlayer });
        expect(Object.keys(state.players).length).toBe(4);
        expect(state.players[id]).toEqual({
            name,
            color
        });
    });


    it('should add a new player to the players object and generates an ID', () => {
        const id = null;
        const name = 'Bob';
        const color = 'purple'

        const newPlayer = {
            id, //if null auto create id in reducer. otherwise logged in _id
            name,
            color
        };

        const state = gameReducer(toLoad, { type: ADD_PLAYER, payload: newPlayer });
        expect(Object.keys(state.players).length).toBe(4);
    });


    it('should remove a player from the players object', () => {
        const id = 123;
        const state = gameReducer(toLoad, { type: REMOVE_PLAYER, payload: id });

        expect(Object.keys(state.players).length).toBe(2);
        expect(state.players[id]).toBe(undefined);
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
            123: {
                name: 'david',
                score: 156
            },
            456: {
                name: 'paul',
                score: 248
            }
        };

        const state = gameReducer(toLoad, { type: ADD_NEW_GAME, payload: newGame });
        const key = +Object.keys(toLoad.games).length + 1;

        expect(Object.keys(state.games).length).toBe(4);
        expect(state.games[`${key}`]).toEqual(newGame);
    });


    it('updates the scores of a specific player. Removes a game if score is 0', () => {
        const id = 123;
        const updatedGame = {
            id,
            scores: {
                1: 300,
                2: 245,
                3: 0
            }
        };
        const state = gameReducer(toLoad, {type: UPDATE_INDIVIDUAL_SCORE, payload: updatedGame});

        expect(state.games[1][id].score).toEqual(updatedGame.scores[1]);
        expect(state.games[2][id].score).toEqual(updatedGame.scores[2]);
        expect(state.games[3][id]).toBeFalsy();        
    });

});