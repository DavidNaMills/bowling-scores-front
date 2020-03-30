import {renderHook, act} from '@testing-library/react-hooks';
import useTime from './useTime';

const testDate = '1582701283958'

describe('useTime hook test suite', ()=>{
    const mockDate = new Date(1582701283958);
    it('returns the time by using getTime', ()=>{
        const _Date = Date;
        global.Date = jest.fn(() => '1582701283958');
        global.Date.UTC = _Date.UTC;
        global.Date.parse = _Date.parse;
        global.Date.now = _Date.now;

        const spy = jest
          .spyOn(global, 'Date')
          .mockImplementationOnce(() => mockDate)

        const {result} = renderHook(()=>useTime());
        
        act(()=>{
            const res = result.current.getTime();
            expect(res).toEqual(1582701283958);
        });

        Date = _Date;   // restor Date back to its former glory
        spy.mockRestore()
    });

    it('converts a date into: MM-DD-YYYY HH:mm format', ()=>{
        const {result} = renderHook(()=>useTime());
        act(()=>{
            const res = result.current.convertTime(mockDate);
            expect(res).toEqual('1-26-2020 15:14');
        })
    });
});