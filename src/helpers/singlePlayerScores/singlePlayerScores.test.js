import singlePlayerScores from './singlePlayerScores';
import testData from '../tableGamesDataModifier/testData';
import {davidScores} from '../tableGamesDataModifier/testData';


describe('singlePlayerScores test suite', ()=>{
    it('returns a populated array', ()=>{
        const res = singlePlayerScores(testData, 123);
        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBe(3);
        
        for(let x=0; x<res[0].values.length; x++){
            expect(res[x]).toHaveProperty('values');
            expect(Array.isArray(res[x].values)).toBeTruthy();
            expect(res[x].values[x]).toEqual(davidScores[x]);
        }
    });

    it('returns an empty array if the player is not present in the object', ()=>{
        const res = singlePlayerScores(testData, 123456);
        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBe(0);
    });
});