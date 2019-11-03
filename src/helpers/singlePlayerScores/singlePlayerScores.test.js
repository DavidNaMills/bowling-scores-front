import singlePlayerScores from './singlePlayerScores';
import testData from '../tableGamesDataModifier/testData';
import {davidScores} from '../tableGamesDataModifier/testData';


describe('singlePlayerScores test suite', ()=>{
    const res = singlePlayerScores(testData, 123);
    it('returns a populated array', ()=>{
        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBe(3);
        
        for(let x=0; x<res[0].values.length; x++){
            expect(res[x]).toHaveProperty('values');
            expect(Array.isArray(res[x].values)).toBeTruthy();
            expect(res[x].values[x]).toEqual(davidScores[x]);
        }
    });
    
});