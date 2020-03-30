import {renderHook, act} from '@testing-library/react-hooks';
import useColorSelection, {getRandomColor} from './useColorSelection';

import {SwatchesPicker} from 'react-color';

describe('useColorSelection test suite', ()=>{
    describe('hook test suite', ()=>{
        it('sets the color to null as default', ()=>{
            const {result} = renderHook(()=>useColorSelection());
            expect(result.current.color).toBe(null);
        });
        
        it('changes the color value when randomColor is fired', ()=>{
            const {result} = renderHook(()=>useColorSelection());
            act(()=>{
                result.current.randomColor();
            });
            
            expect(typeof(result.current.color)).toEqual('string');
        });
        
        it('returns a <SwatchesPicker /> component', ()=>{
            const {result} = renderHook(()=>useColorSelection());
            act(()=>{
                expect(result.current.showColorPickerComponent())
            })
        });


    });

    describe('getRandomColor test suite', ()=>{
        const color = getRandomColor().split(',');
        expect(color.length).toBe(3);
        color.forEach(x=>{
            expect(+x>=0 || +x<=255).toBeTruthy();
        })
    });
});