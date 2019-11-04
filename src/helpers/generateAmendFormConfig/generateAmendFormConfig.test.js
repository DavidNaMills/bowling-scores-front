import generateAmendForm from './generateAmendFormConfig';
import realData from '../tableGamesDataModifier/testData';
import singlePlayerScores from '../singlePlayerScores/singlePlayerScores';

describe('generateAmendFormConfig test suite', ()=>{
    const temp = singlePlayerScores(realData, 123);
    const res = generateAmendForm(temp);

    it('should return a populated object', ()=>{
        expect(typeof(res)).toEqual('object');
        expect(Object.keys(res).length).toBe(3);
        
        let t=0;
        for(let key in res){
            expect(res[key].elementtype).toEqual('input');
            expect(res[key].elementConfig.type).toEqual('number');
            expect(res[key].elementConfig.placeholder).toEqual(`Game ${+key+1}`);
            expect(res[key].elementConfig.min).toBe(0);
            expect(res[key].elementConfig.max).toBe(300);
            expect(res[key].value).toEqual(temp[t].values[0]);
            expect(res[key].isValid).toBeTruthy();
            expect(res[key].shouldValidate).toBeFalsy();
            expect(Array.isArray(res[key].hasErr)).toBeTruthy();
            expect(res[key].hasErr.length).toBe(0);
            t= t+=1;
        }
    });
});