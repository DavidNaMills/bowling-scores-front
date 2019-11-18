import {addNewPlayer} from './addNewPlayer';

const newUser = {
    _id: '5c5cxc5xz5cx63',
    name: 'David Mills',
    color: '108, 182, 209'
}

const testLiveGame = {
    _id: '323232323232',
    players: {
        'gdfsgfdsgfdgdfsgdf': {
            id: 'gdfsgfdsgfdgdfsgdf',
            name: 'Ds',
            color: '108, 182, 209'
        },
    },
    '5f5fffffffffff': {
        _id: '5f5fffffffffff',
        name: 'Alan',
        color: '108, 182, 209'
    },
    games: {}
}

describe('addNewPlayer test suite', () => {
    it('adds the player to the object', () => {
        const result = addNewPlayer(testLiveGame, newUser);
        expect(result).toEqual({
            ...testLiveGame,
            players: {
                ...testLiveGame.players,
                [newUser._id]:{
                    name: newUser.name,
                    color: newUser.color
                }
            }
        })
    });
});