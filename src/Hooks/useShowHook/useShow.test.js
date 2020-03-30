import {renderHook, act} from '@testing-library/react-hooks';
import useShowHook from './useShow';

describe('useShow test suite', ()=>{
    describe('single boolean type tests', ()=>{
        it('sets default initValue to false', ()=>{
            const {result} = renderHook(()=>useShowHook());
            expect(typeof(result.current.isShow)).toEqual('boolean')
            expect(result.current.isShow).toBeFalsy()
        });

        it('accepts a boolean as initial value', ()=>{
            const {result} = renderHook(()=>useShowHook(true));
            expect(typeof(result.current.isShow)).toEqual('boolean')
            expect(result.current.isShow).toBeTruthy()
        });
        
        it('changes the value if boolean type', ()=>{
            const {result} = renderHook(()=>useShowHook(false));
            expect(result.current.isShow).toBeFalsy();
            
            act(()=>{
                result.current.changeShow(true);
            });
            
            expect(result.current.isShow).toBeTruthy();
        });
        
        it('sets the value to false as default', ()=>{
            const {result} = renderHook(()=>useShowHook(true));
            expect(result.current.isShow).toBeTruthy();
            
            act(()=>{
                result.current.changeShow();
            });
            
            expect(result.current.isShow).toBeFalsy();
        });

        it('doesnt change the state if an object is passed in as the newValue', ()=>{});
    });

    describe('object type tests', ()=>{
        const tempState = {
            phone: false,
            popup: false
        };

        it('accepts an object with default states', ()=>{
            const {result} = renderHook(()=>useShowHook(tempState));
            expect(result.current.isShow).toEqual(tempState);
        });
        
        it('changes a single property within the object', ()=>{
            const {result} = renderHook(()=>useShowHook(tempState));
            expect(result.current.isShow).toEqual(tempState);
            const updated = {popup: true};
            act(()=>{
                result.current.changeShow(updated);
            });
            expect(result.current.isShow.phone).toBeFalsy();
            expect(result.current.isShow.popup).toBeTruthy();
        });
        
        it('changes several properties within the object at the same time', ()=>{
            const {result} = renderHook(()=>useShowHook(tempState));
            expect(result.current.isShow).toEqual(tempState);
            const updated = {popup: true, phone: true};
            act(()=>{
                result.current.changeShow(updated);
            });
            expect(result.current.isShow.phone).toBeTruthy();
            expect(result.current.isShow.popup).toBeTruthy();
        });
        
        it('only updates the property if type boolean', ()=>{
            const {result} = renderHook(()=>useShowHook(tempState));
            expect(result.current.isShow).toEqual(tempState);
            const updated = {popup: true, phone: 'true'};
            act(()=>{
                result.current.changeShow(updated);
            });
            expect(result.current.isShow.phone).toBeTruthy();
            expect(result.current.isShow.popup).toBeTruthy();
        });
        
        it('only updates the state if a property has changed', ()=>{
            const {result} = renderHook(()=>useShowHook(tempState));
            const tempUpdate = {
                beer: true,
                wine: false
            };

            expect(result.current.isShow).toEqual(tempState);
            act(()=>{
                result.current.changeShow(tempUpdate);
            });
            expect(result.current.isShow.phone).toBeFalsy();
            expect(result.current.isShow.popup).toBeFalsy();
        });

        it('only changes state of property within the default state', ()=>{
            const tempUpdate = {
                phone: true,
                alan: true,
                popup: true,
                beer: true,
                wine: false
            };
            const {result} = renderHook(()=>useShowHook(tempState));
            expect(result.current.isShow).toEqual(tempState);
            act(()=>{
                result.current.changeShow(tempUpdate);
            });
            expect(Object.keys(result.current.isShow).length).toBe(2);
            expect(result.current.isShow.phone).toBeTruthy();
            expect(result.current.isShow.popup).toBeTruthy();
            expect(result.current.isShow).not.toHaveProperty('alan');
        });
    });
        
});