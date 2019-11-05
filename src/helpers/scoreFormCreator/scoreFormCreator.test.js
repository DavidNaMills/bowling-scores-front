import basicInit from './scoreFormCreator';
import testData from '../tableGamesDataModifier/testData';

describe('basicInputControlInit control suite', ()=>{
    it('creates an object with the appropriate keys and values for number', ()=>{

        const res = basicInit(testData.players, 'number');
        expect(typeof(res)).toEqual('object');
        expect(Object.keys(res).length).toBe(3);
        
        for(let key in testData.players){
            expect(typeof(res[key])).toBe('object');
            expect(res[key].name).toEqual(testData.players[key].name);
            expect(res[key].score).toBe(0);
        };
    })
});