import { renderHook, act } from '@testing-library/react-hooks';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'

import useAddPlayer from './useAddPlayer';

describe('useAddPlayer hook', ()=>{
    it('placeholder', ()=>{
        expect(true).toBeTruthy();
    });

    // const initialState = {players:null}
    // const mockStore = configureStore();
    // let store;
    // //sets name
    // //sets color
    // //resets player details if successfully dispatched
    // //doesnt reset if no name

    // it('sets the players name correctly', ()=>{
    //     store = mockStore(initialState);
    //     const { result } = 
    //     <Provider store={}>
    //     renderHook(() => useAddPlayer())
    //     </Provider> 
    //     const testData = 'someTestData';
    //     act(()=>{
    //         result.current.setPlayer(testData);
    //     });

    //     expect(result.current.newPlayer).toEqual(testData);
    // });
});