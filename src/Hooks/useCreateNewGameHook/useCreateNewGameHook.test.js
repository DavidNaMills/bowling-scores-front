import {renderHook, act} from '@testing-library/react-hooks';
import useCreateNewGameHook from './useCreateNewGameHook';


describe('useCreateNewGameHook test suite', ()=>{
    //returns an empty object as default
    //adds players to temp object in correct format
    
    it('placeholder', ()=>{
        expect(true).toBeTruthy();
    });

    
    // it('should return an empty object as default', ()=>{
    //     const {result} = renderHook(()=>useCreateNewGameHook());
    //     expect(result.current.newGame).toEqual({});
    // });
    
    
    // it('adds a player to the temp object with correct values (color supplied)', ()=>{
    //     const {result} = renderHook(()=>useCreateNewGameHook());
    //     const temp = {name: 'david', color: '123, 123, 123',  id:456123};
    //     act(()=>{
    //         result.current.addPlayerCreate(temp);
    //     })
    //     expect(Object.keys(result.current.newGame).length).toEqual(1);
    //     expect(result.current.newGame[temp.id]).toEqual(temp);
    // });

    // it('adds a player to the temp object with correct values (no id)', ()=>{
    //     const {result} = renderHook(()=>useCreateNewGameHook());
    //     const temp = {name: 'david', color: '123, 123, 123'};
    //     act(()=>{
    //         result.current.addPlayerCreate(temp);
    //     })
    //     expect(Object.keys(result.current.newGame).length).toEqual(1);
    // });

    // it('adds a player to the temp object with correct values and color randomised', ()=>{
    //     const {result} = renderHook(()=>useCreateNewGameHook());
    //     const temp = {name: 'david', id:456123};
    //     act(()=>{
    //         result.current.addPlayerCreate(temp);
    //     })
    //     expect(Object.keys(result.current.newGame).length).toEqual(1);
    //     expect(result.current.newGame[temp.id]).toHaveProperty('color');
    // });
    
    
    // it('it doesnt add player if name is not present', ()=>{
    //     const {result} = renderHook(()=>useCreateNewGameHook());
    //     const temp = {name: '', id:456123};
    //     act(()=>{
    //         result.current.addPlayerCreate(temp);
    //     })
    //     expect(Object.keys(result.current.newGame).length).toEqual(0);
    //     expect(result.current.newGame).toEqual({});
    // });


    // doesnt add if no name provided


});
