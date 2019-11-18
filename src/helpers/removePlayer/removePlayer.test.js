import {removePlayer} from './removePlayer';
import gameTestData, {deleteId} from '../../testData/gameControllerTestData';

describe('removePlayer test suite', ()=>{
    it('removes the player from the players object', ()=>{
        expect(Object.keys(gameTestData.players).length).toBe(2);

        const result = removePlayer(gameTestData, deleteId);
        expect(Object.keys(result.players).length).toBe(1);
        expect(Object.keys(result.games['1']).length).toBe(1);
        
        expect(result.players).not.toHaveProperty(deleteId);
        expect(result.games['1']).not.toHaveProperty(deleteId);

    });
});