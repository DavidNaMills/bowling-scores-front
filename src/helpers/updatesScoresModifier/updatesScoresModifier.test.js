import updatesScoresModifier from './updatesScoresModifier';

const testData = {
    1: "123",
    2: "456",
    3: "156"
};

describe('updatesScoresModifier test suite', ()=>{
    it('returns an object with 3 properties', ()=>{
        const res = updatesScoresModifier(testData);

        expect(typeof(res)).toEqual('object');
        expect(Object.keys(res).length).toBe(3);
    });

    it('each property contains a score property', ()=>{
        const res = updatesScoresModifier(testData);

        for(let key in res){
            expect(res[key]).toEqual(+testData[key]);
        }
    });

});