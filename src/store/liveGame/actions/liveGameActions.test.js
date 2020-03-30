import { NEW_GAME, ADD_FRAME, ADD_PLAYER_URL, UPDATE_GAME_SCORES, REMOVE_PLAYER_URL } from '../../../Axios/URLS';
import axios from '../../../Axios/axiosConfig';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([thunk]);
import { PLACEHOLDER_ID } from '../../../consts/placeHolderGameId';

const mockXios = new MockAdapter(axios);

const OriginalDate = Date;

jest.mock('uuid');
import uuid from 'uuid';

jest.mock('../../../helpers/localStorage/localStorage', () => ({
    writeToLocalStorage: jest.fn()
}));
import { writeToLocalStorage } from '../../../helpers/localStorage/localStorage';

jest.mock('../../../helpers/updatePlayerScores/updatePlayerScores', () => ({
    updatePlayerScores: jest.fn(() => ({ test: 123 }))
}));
import { updatePlayerScores } from '../../../helpers/updatePlayerScores/updatePlayerScores';

jest.mock('../../../helpers/addNewFrame/addNewFrame', () => ({
    addNewFrame: jest.fn(()=>({players: {david: 'david'}}))
}));
import { addNewFrame } from '../../../helpers/addNewFrame/addNewFrame';

jest.mock('../../../helpers/addNewPlayer/addNewPlayer', ()=>({
    addNewPlayer: jest.fn(()=>({_id: 'testid', name: 'david', color:'blue'}))
}));
import {addNewPlayer} from '../../../helpers/addNewPlayer/addNewPlayer';

jest.mock('../../../helpers/removePlayer/removePlayer', ()=>({
    removePlayerHelper: jest.fn(()=>({
        david: 'fdas',
        bob: 'fda'
    }))
}));
import { removePlayerHelper } from '../../../helpers/removePlayer/removePlayer';


import prevGame from '../../../helpers/tableGamesDataModifier/testData';
import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_NEW_GAME,
    SET_LOADING,
    UPDATE_INDIVIDUAL_SCORE,
    RESET_LIVE_GAME
} from '../liveGameActionTypes';


import {
    initGame,
    startLoading,
    loadGame,
    addPlayerLocal,
    removePlayerLocal,
    addNewGameLocal,
    updateIndividualScoreLocal,
    resetLiveGame,
    commitNewGame,
    addPlayer,
    removePlayer,
    addNewGame,
    updateIndividualScore,
} from './liveGameActions';
import testData from '../../../helpers/tableGamesDataModifier/testData';


const playerData = {
    players: {
        123: { name: 'david', color: 'red' },
        456: { name: 'paul', color: 'blue' }
    },
    games: {}
}

beforeEach(() => {
    jest.spyOn(global, 'Date');
})

afterEach(() => {
    jest.clearAllMocks();
})

describe('liveGameActions test suite', () => {
    describe('local dispatch functions', () => {
        it('creates an INIT_GAME action with correct payload', () => {
            const action = initGame(playerData);

            expect(action.type).toEqual(INIT_GAME);
            expect(action.payload).toHaveProperty('players');
            expect(action.payload).toHaveProperty('games');
            expect(Object.keys(action.payload.players).length).toBe(2);
            expect(Object.keys(action.payload.games).length).toBe(0);

            expect(action.payload.players[123].name).toEqual(playerData.players[123].name);
            expect(action.payload.players[123].color).toEqual(playerData.players[123].color);

            expect(action.payload.players[456].name).toEqual(playerData.players[456].name);
            expect(action.payload.players[456].color).toEqual(playerData.players[456].color);
        });

        it('creates an action to load a previously started game', () => {
            const action = loadGame(prevGame);
            expect(action.type).toEqual(LOAD_GAME);
            expect(action.payload).toEqual(prevGame);
        });


        it('returns the startLoading dispatch object', () => {
            const action = startLoading(true);
            expect(action.type).toBe(SET_LOADING);
            expect(action.payload).toBeTruthy()
        });

        it('returns the updateIndividualScoreLocal dispatch object', () => {
            const testDataInd = { newScores: 456 };
            const action = updateIndividualScoreLocal(testDataInd);
            expect(action.type).toEqual(UPDATE_INDIVIDUAL_SCORE);
            expect(action.payload).toEqual(testDataInd);
        });

        it('should create a resetLiveGame dispatch object', () => {
            const action = resetLiveGame();
            expect(Object.keys(action).length).toBe(1);
            expect(action.type).toEqual(RESET_LIVE_GAME);
        });


        it('creates an action to add a new player', () => {
            const newPlayer = {
                id: 123456, //if null auto create id in reducer. otherwise logged in _id
                name: 'Bob',
                color: 'purple'
            };

            const action = addPlayerLocal(newPlayer);

            expect(action.type).toEqual(ADD_PLAYER);
            expect(action.payload).toEqual(newPlayer);
        });

        it('creates an action to remove a player using removePlayerLocal', () => {
            const id = 123;
            const action = removePlayerLocal(id);

            expect(action.type).toEqual(REMOVE_PLAYER);
            expect(action.payload).toEqual(id);
        });

        it('creates an object to update all players scores for new frame', () => {
            const newGame = {
                scores: {
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

            const action = addNewGameLocal(newGame);

            expect(action.type).toEqual(ADD_NEW_GAME);
            expect(action.payload).toEqual(newGame);
        });
    });

    describe('commitNewGame test suite', () => {
        const commitGameTemp = {
            _id: '123',
            createdAt: '2018-10-16T07:49:11.000Z',
            // createdAt: new OriginalDate('2018-10-16T07:49:11.000Z'),
            players: { 'fsdafsdfdafd': { name: 'david' } },
            games: { '1': { scores: [1, 2, 3, 4] } }
        };


        it('dispatches initGame with default values if user is not logged in', () => {
            Date.mockImplementation(() => new OriginalDate('2018-10-16T07:49:11.000Z'));
            const store = mockStore({ user: { token: null, user: null } });
            const expectedActions = [{
                type: INIT_GAME,
                payload: {
                    _id: PLACEHOLDER_ID,
                    createdAt: new OriginalDate('2018-10-16T07:49:11.000Z'),
                    players: {},
                    games: {}
                }
            }];
            store.dispatch(commitNewGame({}));
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
        });


        it('dispatches initGame with pre-defined values if user is not logged in', () => {
            Date.mockImplementation(() => new OriginalDate('2018-10-16T07:49:11.000Z'));
            const store = mockStore({ user: { token: null, user: null } });

            const expectedActions = [{
                type: INIT_GAME,
                payload: {
                    _id: commitGameTemp._id,
                    createdAt: commitGameTemp.createdAt,
                    players: commitGameTemp.players,
                    games: commitGameTemp.games
                }
            }];
            store.dispatch(commitNewGame(commitGameTemp));
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
        });


        it('dispatches initGame when the user has logged in', async () => {
            mockXios.onPost(`${NEW_GAME}`).reply(201, {
                error: false,
                item: commitGameTemp
            });
            const store = mockStore({ user: { token: 'fsdadsafd', user: { _id: 'gfdfdsa' } }, liveGame: { _id: '123789456' } });
            await store.dispatch(commitNewGame(commitGameTemp));

            const actions = store.getActions();
            const expectedActions2 = [
                { type: SET_LOADING, payload: true },
                { type: INIT_GAME, payload: commitGameTemp }
            ];
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions2);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
        });


        it('dispatches startLoading to start and finish when the server returns an error', async () => {
            mockXios.onPost(`${NEW_GAME}`).reply(201, {
                error: true,
                item: commitGameTemp
            });
            const store = mockStore({ user: { token: 'fsdadsafd', user: { _id: 'gfdfdsa' } }, liveGame: { _id: '123789456' } });
            await store.dispatch(commitNewGame(commitGameTemp));

            const actions = store.getActions();
            const expectedActions2 = [
                { type: SET_LOADING, payload: true },
                { type: SET_LOADING, payload: false },
            ];
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions2);
        });


        it('dispatches startLoading to start and finish when the server returns a 401', async () => {
            mockXios.onPost(`${NEW_GAME}`).reply(500, {
                error: false,
                item: commitGameTemp
            });
            const store = mockStore({ user: { token: 'fsdadsafd', user: { _id: 'gfdfdsa' } }, liveGame: { _id: '123789456' } });
            await store.dispatch(commitNewGame(commitGameTemp));

            const actions = store.getActions();
            const expectedActions2 = [
                { type: SET_LOADING, payload: true },
                { type: SET_LOADING, payload: false },
            ];
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions2);
        });
    });



    describe('addPlayer action test suite', ()=>{
        uuid.mockImplementation(() => 'testid');
        const tempData = {
            color: 'blue',
            name: 'david'
        };

        const item = {
            _id: 'testid',
            color: 'blue',
            name: 'david'
        };


        it('adds a new player when uer is not logged in. dispatches addPlayerLocal', ()=>{
            const store = mockStore({user: {token: null}, liveGame: null});
            const tempData = {
                color: 'blue',
                name: 'david'
            };
            store.dispatch(addPlayer(tempData));
            const actions = store.getActions();
            const expectedActions = [
                {type: ADD_PLAYER, payload: {_id: 'testid', ...tempData}}
            ];

            expect(addNewPlayer).toHaveBeenCalledTimes(1);
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
        });

        it('adds a new player when user is logged in but liveGame._id is PLACEHOLDER_ID. dispatches addPlayerLocal', ()=>{
            const store = mockStore({user: {token: 'fdsafds'}, liveGame: {_id: PLACEHOLDER_ID}});
            
            store.dispatch(addPlayer(tempData));
            const actions = store.getActions();
            const expectedActions = [
                {type: ADD_PLAYER, payload: item}
            ];

            expect(addNewPlayer).toHaveBeenCalledTimes(1);
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
        });

        // logged in happy path
        it('adds a player when the user is logged in. dispatched addPlayerLocal and calls writeToLocalStorage', async()=>{
            mockXios.onPost(`${ADD_PLAYER_URL}/f5d6sa`).reply(201, {
                error: false,
                item
            });

            const store = mockStore({user: {token: 'fdsafdas', user: {_id: '134789'}}, liveGame: {_id: 'f5d6sa'}});
            await store.dispatch(addPlayer(tempData));
            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type:ADD_PLAYER, payload: item}
            ];

            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });

        it('does not add a newPlayer if server returns error flag', async()=>{
            mockXios.onPost(`${ADD_PLAYER_URL}/f5d6sa`).reply(201, {
                error: true,
                item
            });

            const store = mockStore({user: {token: 'fdsafdas', user: {_id: '134789'}}, liveGame: {_id: 'f5d6sa'}});
            await store.dispatch(addPlayer(tempData));
            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: SET_LOADING, payload: false}
            ];

            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });


        // logged in 500
        it('does not add a newPlayer if server returns status 500 ', async()=>{
            mockXios.onPost(`${ADD_PLAYER_URL}/f5d6sa`).reply(500, {
                error: false,
                item
            });

            const store = mockStore({user: {token: 'fdsafdas', user: {_id: '134789'}}, liveGame: {_id: 'f5d6sa'}});
            await store.dispatch(addPlayer(tempData));
            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: SET_LOADING, payload: false}
            ];

            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });
    });


    describe('removePlayer test suite', ()=>{
        const remId = '123456789abc';
        const remResult = {
            david: 'fdas',
            bob: 'fda'
        };

        const liveGame = ({_id: '123456789'});
        const playerId = 'abc';

        it('removes an individual player when no user token and liveGame._id is not PLACEHOLDER_ID', () => {
            const store = mockStore({ user: { token: null }, liveGame: { _id: 'fdsafdsa' } });
            store.dispatch(removePlayer(remId));
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(removePlayerHelper).toHaveBeenCalledTimes(1);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(actions).toEqual([{ type: REMOVE_PLAYER, payload: remResult }]);
        });

        it('removes an individual player when no user token and liveGame._id is not PLACEHOLDER_ID', () => {
            const store = mockStore({ user: { token: 'fds' }, liveGame: { _id: PLACEHOLDER_ID } });
            store.dispatch(removePlayer(remId));
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(removePlayerHelper).toHaveBeenCalledTimes(1);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(actions).toEqual([{ type: REMOVE_PLAYER, payload: remResult }]);
        });
        
        it('removes a player and dispatches removePlayerLocal and calls writeToLocalStorage', async()=>{
            mockXios.onDelete(`${REMOVE_PLAYER_URL}/${liveGame._id}/${playerId}`).reply(200, {
                error: false,
                item: 'myId123'
            });
            const store = mockStore({user: {token: '132456', user:{_id: 'f4d56sa'}}, liveGame});
            await store.dispatch(removePlayer(playerId));
            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: REMOVE_PLAYER, payload: 'myId123'}
            ];
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
        });
        
        it('does not remove a player if error flag is returned by sever', async()=>{
            mockXios.onDelete(`${REMOVE_PLAYER_URL}/${liveGame._id}/${playerId}`).reply(200, {
                error: true,
                item: 'myId123'
            });
            const store = mockStore({user: {token: '132456', user:{_id: 'f4d56sa'}}, liveGame});
            await store.dispatch(removePlayer(playerId));
            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: SET_LOADING, payload: false}
            ];
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });

        it('does not remove a player if server returns 401 status code', async()=>{
            mockXios.onDelete(`${REMOVE_PLAYER_URL}/${liveGame._id}/${playerId}`).reply(401, {
                error: true,
                item: 'myId123'
            });
            const store = mockStore({user: {token: '132456', user:{_id: 'f4d56sa'}}, liveGame});
            await store.dispatch(removePlayer(playerId));
            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: SET_LOADING, payload: false}
            ];
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });
    });


    describe('addNewGame test suite', ()=>{
        const liveGame = {
            _id: '123456789zxc'
        };

        it('dispatches addNewGameLocal and calls writeToLocalStorage if no user token', ()=>{
            const store = mockStore({user: {token: null}, liveGame})
            store.dispatch(addNewGame({david: 'david'}));
            const actions = store.getActions();
            const expectedActions = [
                {type: ADD_NEW_GAME, payload: {players: {david: 'david'}}}
            ];
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(addNewFrame).toHaveBeenCalledTimes(1);
        });

        it('dispatches addNewGameLocal and calls writeToLocalStorage if liveGame._id equals PLACEHOLDER_ID', ()=>{
            const store = mockStore({user: {token: 'gfdsgfds' }, liveGame:{_id: PLACEHOLDER_ID}})
            store.dispatch(addNewGame({david: 'david'}));
            const actions = store.getActions();
            const expectedActions = [
                {type: ADD_NEW_GAME, payload: {players: {david: 'david'}}}
            ];
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(addNewFrame).toHaveBeenCalledTimes(1);
        });
        
        it('makes axios call dispatches addNewGameLocal and calls writeToLocalStorage if user logged in and response error flag is false', async()=>{
            mockXios.onPost(`${ADD_FRAME}/${liveGame._id}`).reply(201, {
                error: false,
                item: {players: {david: 'david'}}
            });
            const store = mockStore({user: {token: 'dgdf', user:{_id:'1vd23'}}, liveGame});
            await store.dispatch(addNewGame({david: 'david'}));

            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: ADD_NEW_GAME, payload: {players: {david: 'david'}}}
            ];
            
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
        });
        
        it('does not addNewGame if user logged in and axios response error flag is true', async()=>{
            mockXios.onPost(`${ADD_FRAME}/${liveGame._id}`).reply(201, {
                error: true,
                item: {players: {david: 'david'}}
            });
            const store = mockStore({user: {token: 'dgdf', user:{_id:'1vd23'}}, liveGame});
            await store.dispatch(addNewGame({david: 'david'}));

            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: SET_LOADING, payload: false}
            ];
            
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });
        
        it('does not addNewGame if server returns 401', async()=>{
            mockXios.onPost(`${ADD_FRAME}/${liveGame._id}`).reply(500, {
                error: false,
                item: {players: {david: 'david'}}
            });
            const store = mockStore({user: {token: 'dgdf', user:{_id:'1vd23'}}, liveGame});
            await store.dispatch(addNewGame({david: 'david'}));

            const actions = store.getActions();
            const expectedActions = [
                {type: SET_LOADING, payload: true},
                {type: SET_LOADING, payload: false}
            ];
            
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });
    });


    describe('updateIndividualScore tests', () => {

        it('updates an individual score when the user is not logged in', () => {
            const store = mockStore({ user: { token: null }, liveGame: { _id: 'PLACEHOLDER_ID' } });
            store.dispatch(updateIndividualScore({ test: 123 }));
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(updatePlayerScores).toHaveBeenCalledTimes(1);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(actions).toEqual([{ type: UPDATE_INDIVIDUAL_SCORE, payload: { test: 123 } }])
        });

        it('updates an individual score when the liveGame is equal to the placeholder ID', () => {
            const store = mockStore({ user: { token: 'gdafdas' }, liveGame: { _id: PLACEHOLDER_ID } });
            store.dispatch(updateIndividualScore({ test: 123 }));
            const actions = store.getActions();
            expect(actions.length).toBe(1);
            expect(updatePlayerScores).toHaveBeenCalledTimes(1);
            expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
            expect(actions).toEqual([{ type: UPDATE_INDIVIDUAL_SCORE, payload: { test: 123 } }])
        });

        it('updates the scores when the user is logged in', async () => {
            mockXios.onPut(`${UPDATE_GAME_SCORES}/123789456`).reply(201, {
                error: false,
                item: { test: 123 }
            });

            const store = mockStore({ user: { token: 'fsdadsafd' }, liveGame: { _id: '123789456' } });
            await store.dispatch(updateIndividualScore({ test: 123 }));

            const expectedActions = [
                { type: 'START_LOADING', payload: true },
                { type: 'UPDATE_INDIVIDUAL_SCORE', payload: { test: 123 } },
            ]

            const actions = store.getActions();
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });

        it('cancels the isLoading state if axios throws an error', async () => {
            mockXios.onPut(`${UPDATE_GAME_SCORES}/123789456`).reply(201, {
                error: true
            });

            const store = mockStore({ user: { token: 'fsdadsafd' }, liveGame: { _id: '123789456' } });
            await store.dispatch(updateIndividualScore({ test: 123 }));

            const expectedActions = [
                { type: 'START_LOADING', payload: true },
                { type: 'START_LOADING', payload: false },
            ]

            const actions = store.getActions();
            expect(actions.length).toBe(2);
            expect(actions).toEqual(expectedActions);
        });
    });
});


// players: {
//     [david.id]:{
//         name: david.name,
//         color: '18, 255, 235'
//     },
//     [paul.id]: {
//         name: paul.name,
//         color: '56, 168, 52'
//     },
//     [kelby.id]: {
//         name: kelby.name,
//         color: '192, 102, 217'
//     }
// },

// games: {
//     1: {
//         [david.id]: {
//             name: david.name,
//             score: 156
//         },
//         [paul.id]: {
//             name: paul.name,
//             score: 248
//         },
//         [kelby.id]: {
//             name: kelby.name,
//             score: 78
//         }
//     },
//},