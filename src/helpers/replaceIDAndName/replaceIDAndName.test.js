import replaceIDandName from './replaceIDandName';
import uuid from 'uuid';

const PLACEHOLDER_ID = '123789456123abc';

const player = {
    _id: uuid(),
    name: 'super balls',
    color: '125, 174, 157'
};

const selectedID = 'debb53c3-ad2a-4093-b89b-2a5025416f6c';

const tempData = {
    createdAt: "2020-01-08T06:22:59.878Z",
    games: {
        1: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 12 } },
        2: {
            'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 24 },
            '123789456123abc': { name: "Alan", score: 24 }
        },
        3: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 154 } },
    },
    players: {
        'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416f6c" },
        '123789456123abc': { name: "alan", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416XXXXX" }
    },
    _id: "123789456123abc"
}

describe('replaceIDandName test suite', () => {
    it('first converts the game object from a string into an object', ()=>{
        const tempStr = JSON.stringify(tempData);
        const res = replaceIDandName(tempStr, selectedID, player);
        expect(res.players).toHaveProperty(player._id, {
            id: player._id,
            color: player.color,
            name: player.name
        });
    });

    it('replaces selectedID with usersID if found', () => {
        const res = replaceIDandName(tempData, selectedID, player);
        expect(res.players).toHaveProperty(player._id, {
            id: player._id,
            color: player.color,
            name: player.name
        });
    });

    it.only('replaces all IDs within the games object with the usersID, changes the name and color, and sanitizes other IDs', () => {
        const res = replaceIDandName(tempData, selectedID, player);
        expect(Object.keys(res.games['1']).length).toBe(1);
        expect(res.games['1']).toHaveProperty(player._id, { name: player.name, score: 12 });

        expect(Object.keys(res.games['2']).length).toBe(2);
        expect(res.games['2']).toHaveProperty(player._id, { name: player.name, score: 24 });

        expect(Object.keys(res.games['1']).length).toBe(1);
        expect(res.games['3']).toHaveProperty(player._id, { name: player.name, score: 154 });
    });

    
});