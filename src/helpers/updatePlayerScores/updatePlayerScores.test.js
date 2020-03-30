import { updatePlayerScores } from './updatePlayerScores';
import uuid from 'uuid';

const updateId = uuid();
const deleteId = uuid();

const testData = {

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


describe('updatePlayerScores test suite', () => {
    it('updates the players scores returns updated objects', () => {
        const newScores = {
            "1": 111,
            "2": 300
        }
        const result = updatePlayerScores(testData, updateId, newScores);
        expect(result.games['1'][updateId].score).toEqual(newScores['1']);
        expect(result.games['2'][updateId].score).toEqual(newScores['2']);
        expect(result.games['3'][updateId].score).toEqual('123');
    });


    it('removes player from frame if new score is 0', () => {
        const newScores = { "1": 0, "3": 0 };

        const result = updatePlayerScores(testData, updateId, newScores);
        expect(result.games['1']).not.toHaveProperty(updateId);
        expect(result.games['3']).not.toHaveProperty(updateId);
    });
});