import {removePlayerHelper} from './removePlayer';
import uuid from 'uuid';

const updateId = uuid();
const deleteId = uuid();

const testData = {
    players: {
        [deleteId]:{
            name: 'david',
            color: 'blue'
        },
        [updateId]:{
            name: 'david',
            color: 'blue'
        }
    },
    games: {
        "1": {
            [updateId]: {
                name: 'David',
                score: '123'
            },
            [deleteId]: {
                name: 'bob',
                score: '154'
            },
        },
        "2": {
            [updateId]: {
                name: 'David',
                score: '123'
            },
            [deleteId]: {
                name: 'bob',
                score: '154'
            },
        },
        "3": {
            [updateId]: {
                name: 'David',
                score: '123'
            }
        }
    }
}

describe('removePlayerHelper test suite', ()=>{
    it('removes the player from the players object', ()=>{
        expect(Object.keys(testData.players).length).toBe(2);

        const result = removePlayerHelper(testData, deleteId);
        expect(Object.keys(result.players).length).toBe(1);
        expect(Object.keys(result.games['1']).length).toBe(1);
        expect(Object.keys(result.games['2']).length).toBe(1);
        
        expect(result.players).not.toHaveProperty(deleteId);
        expect(result.games['1']).not.toHaveProperty(deleteId);
        expect(result.games['2']).not.toHaveProperty(deleteId);

    });
});