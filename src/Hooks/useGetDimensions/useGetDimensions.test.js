import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks';
import useGetDimensions from './useGetDimensions';

global.innerWidth = 999;
global.innerHeight = 666;

describe('useGetDimensions test suite', ()=>{
    it('auto sets the dimensions when hook is created', ()=>{

        const {result} = renderHook(()=>useGetDimensions());
        act(()=>{
            expect(result.current.dimensions).toHaveProperty('width', 999);
            expect(result.current.dimensions).toHaveProperty('height', 666);
        })
    });
});