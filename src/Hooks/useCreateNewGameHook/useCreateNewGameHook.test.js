import {renderHook, act} from '@testing-library/react-hooks';
import useCreateNewGameHook from './useCreateNewGameHook';

// const mockDispatch = jest.fn();
// jest.mock('../useDispatchHook/useDispatchHook', ()=>({
//     initGameDispatch: jest.fn(()=>mockDispatch)
// }));
// import useDispatchHook from '../useDispatchHook/useDispatchHook';

const mockDispatch = jest.fn();
jest.mock('react-redux', ()=>({
    useDispatch: jest.fn(()=>mockDispatch)
}));
import {useDispatch} from 'react-redux';

const mockId = '12345678abc';
jest.mock('uuid');
import uuid from 'uuid';

// initGameDispatch
const mockColor = '123, 123, 123';
jest.mock('../useColorSelection/useColorSelection');
import {getRandomColor} from '../useColorSelection/useColorSelection';

beforeEach(()=>{
    jest.clearAllMocks();
})


describe('useCreateNewGameHook test suite', ()=>{
    uuid.mockImplementation(()=>mockId);
    getRandomColor.mockImplementation(()=>mockColor);
    const n = 'alan';
    const player = {
        name: {target: {value:n}},
    };
    
    
    it('adds a player to the game. addPlayer --happy route--', ()=>{
        const {result} = renderHook(()=>useCreateNewGameHook());
        expect(result.current.liveGame).toEqual({});
        act(()=>{result.current.setName(player.name);});
        act(()=>{result.current.addColor(player.color);});
        act(()=>{result.current.addPlayer();});
        
        expect(Object.keys(result.current.liveGame).length).toBe(1);
        expect(result.current.liveGame[mockId]).toEqual({
            id: mockId,
            name: n,
            color: mockColor
        });
    });
    
    
    it('adds a player to the game. addPlayer --generates random color--', ()=>{
        const {result} = renderHook(()=>useCreateNewGameHook());
        expect(result.current.liveGame).toEqual({});
        act(()=>{result.current.setName(player.name);});
        act(()=>{result.current.addPlayer();});
        
        expect(Object.keys(result.current.liveGame).length).toBe(1);
        expect(result.current.liveGame[mockId]).toEqual({
            id: mockId,
            name: n,
            color: mockColor
        });
    });
    
    it('doesnt add the player if there is no name set', ()=>{
        const {result} = renderHook(()=>useCreateNewGameHook());
        act(()=>{result.current.addPlayer();});
        expect(Object.keys(result.current.liveGame).length).toBe(0);
        expect(result.current.liveGame[mockId]).toBeUndefined();
    });
    
    // it('UNSURE HOW TO MOCK --- commits the game by calling initGameDispatch', ()=>{
    //     expect(result.current.liveGame).toEqual({});
    //     act(()=>{result.current.setName(player.name);});
    //     act(()=>{result.current.addPlayer();});
    //     act(()=>{result.current.commitGame();});
    //     expect(true).toBeTruthy();
    // });
});
