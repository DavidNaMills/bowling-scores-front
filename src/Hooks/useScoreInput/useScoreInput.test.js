import { renderHook, act } from '@testing-library/react-hooks';
import useScoreInput from './useScoreInput';
import scoreFormCreator from '../../helpers/scoreFormCreator/scoreFormCreator';
import testData from '../../helpers/tableGamesDataModifier/testData';

describe('useScoreInput test suite', ()=>{
    it('values should be of object type and populated', async()=>{
        const data = await scoreFormCreator(testData.players);
        const {result} = renderHook(()=> useScoreInput(data));
        // const {result} = renderHook(()=> useScoreInput(scoreFormCreator(testData.players)));

        const values = result.current.values;

        expect(typeof(values)).toEqual('object');

        expect(Object.keys(values).length).toBe(3);

        for(let key in values){
            expect(values[key].name).toEqual(testData.players[key].name);
            expect(values[key].score).toBe('');
        }
    });
    
    
    it('accepts a starting structure', async()=>{
        const data = await scoreFormCreator(testData.players);
        const {result} = renderHook(()=> useScoreInput(data));
        const addObj = {
            id: 123,
            data: 158
        }

        act(()=>{
            result.current.addValue(addObj);
        })

        const values = result.current.values;
        expect(typeof(values)).toEqual('object');
        expect(Object.keys(values).length).toBe(3);
        expect(values[addObj.id].score).toBe(addObj.data);
    });

});