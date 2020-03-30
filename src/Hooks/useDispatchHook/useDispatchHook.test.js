import {renderHook, act} from '@testing-library/react-hooks';
import useDispatchHook from './useDispatchHook';

const mockDispatch = jest.fn();
jest.mock('react-redux', ()=>({
    useDispatch: jest.fn(()=>mockDispatch)
}));
import {useDispatch} from 'react-redux';

beforeEach(()=>{
    jest.clearAllMocks();
});

const testData = 'dsfda';

describe('useDispatchHook', ()=>{
    const {result} = renderHook(()=>useDispatchHook());

    it('dispatches addPlayer when addNewPlayerDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.addNewPlayerDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches addNewGame when addNewGameDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.addNewGameDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches initGame when initGameDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.initGameDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches commitNewGame when commitNewGameDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.commitNewGameDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches removePlayer when removePlayerDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.removePlayerDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches updateIndividualScore when updateScoresDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.updateScoresDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches resetLiveGame when resetLiveGameDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.resetLiveGameDispatch()});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches userLogin when loginUserDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.loginUserDispatch(testData)});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    
    it('dispatches userLogout when logoutUserDispatch is called', ()=>{
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        act(()=>{result.current.logoutUserDispatch()});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});
