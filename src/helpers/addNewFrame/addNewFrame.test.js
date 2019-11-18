import { addNewFrame } from './addNewFrame';

const testLiveGame = {
    _id: 'fdsfdsfsda',
    players: {
        '123456': { name: 'dsafds', color: '1354' },
        '1565656': { name: 'dsafds', color: '234' }
    },
    games: {}
};

const newFrame = {
    '123456': { name: 'dsafds', score: 1354 },
    '1565656': { name: 'dsafds', score: 234 }
}

describe('addNewFrame test suite', () => {
    it('adds a new frame to the game object', () => {
        const result = addNewFrame(testLiveGame, newFrame);
        expect(Object.keys(result.games).length).toBe(1);
        expect(Object.keys(result.games['1']).length).toBe(2);
        expect(result.games).toEqual({
            '1': {
                '123456': { name: 'dsafds', score: 1354 },
                '1565656': { name: 'dsafds', score: 234 }
            }
        });
    });
});