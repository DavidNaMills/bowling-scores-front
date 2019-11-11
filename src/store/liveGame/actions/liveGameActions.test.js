import prevGame from '../../../helpers/tableGamesDataModifier/testData';
import {
    INIT_GAME,
    LOAD_GAME,
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_NEW_GAME,
    UPDATE_INDIVIDUAL_SCORE
} from '../liveGameActionTypes';


import {
    initGame,
    loadGame,
    addPlayer,
    removePlayer,
    addNewGame,
    updateIndividualScore
} from './liveGameActions';


const playerData = {
    players: {
        123: { name: 'david', color: 'red' },
        456: { name: 'paul', color: 'blue' }
    },
    games: {}
}

describe('liveGameActions test suite', () => {
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


    it('creates an action to add a new player', () => {
        const newPlayer = {
            id: 123456, //if null auto create id in reducer. otherwise logged in _id
            name: 'Bob',
            color: 'purple'
        };

        const action = addPlayer(newPlayer);

        expect(action.type).toEqual(ADD_PLAYER);
        expect(action.payload).toEqual(newPlayer);
    });

    it('creates an action to remove a player', () => {
        const id = 123;
        const action = removePlayer(id);

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

        const action = addNewGame(newGame);

        expect(action.type).toEqual(ADD_NEW_GAME);
        expect(action.payload).toEqual(newGame);
    });


    it('creates an action to update a single players scores', () => {
        const updatedScores = {
            id: 123,
            scores: {
                1: 123,
                2: 245,
                3: 0
            }
        };

        const action = updateIndividualScore(updatedScores);

        expect(action.type).toEqual(UPDATE_INDIVIDUAL_SCORE);
        expect(action.payload).toEqual(updatedScores);
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