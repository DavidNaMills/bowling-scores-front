import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

jest.mock('../../helpers/localStorage/localStorage', ()=>({
    writeToLocalStorage: jest.fn(),
    readFromLocalStorage: jest.fn(),
    removeFromLocalStorage: jest.fn()
}));
import {writeToLocalStorage, readFromLocalStorage, removeFromLocalStorage} from '../../helpers/localStorage/localStorage';


const testFilename = 'bowling-scores-test';
const defaultFileName = 'bowling-scores'

const testData = {
    players: {
        123: { name: 'David', color: '123, 156, 124' },
        124: { name: 'Alan', color: '123, 156, 124' },
        824: { name: 'John', color: '123, 156, 124' }
    },
    games: {
        1: {
            123: { id: 123, values: ['david', 123, 456] },
            124: { id: 123, values: ['david', 123, 456] },
            824: { id: 123, values: ['david', 123, 456] }
        },
        2: {
            123: { id: 123, values: ['david', 123, 456] },
            124: { id: 123, values: ['david', 123, 456] },
            824: { id: 123, values: ['david', 123, 456] }
        }
    }
}

afterEach(()=>{
    jest.clearAllMocks();
})

it('placeholder', ()=>{
    expect(true).toBeTruthy();
});

describe('useLocalStorage test suite', () => {

    it('should write to the file using default file name', async () => {
        const { result } = renderHook(() => useLocalStorage());
        act(() => {
            result.current.writeToStorage(testData);
        });
        expect(writeToLocalStorage).toHaveBeenCalledWith(defaultFileName, testData);
        expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
    });


    it('should write to the file using specified file name', () => {
        const { result } = renderHook(() => useLocalStorage(testFilename))
        act(() => {
            result.current.writeToStorage(testData);
        });
        expect(writeToLocalStorage).toHaveBeenCalledWith(testFilename, testData);
        expect(writeToLocalStorage).toHaveBeenCalledTimes(1);
    });


    it('reads in from file', () => {
        const { result } = renderHook(() => useLocalStorage());
        act(() => {
            result.current.writeToStorage(testData);
        });
        let returned=null;
        act(() => {
            result.current.readFromStorage(testData);
        });
        expect(readFromLocalStorage).toHaveBeenCalledWith(defaultFileName);
        expect(readFromLocalStorage).toHaveBeenCalledTimes(1);
    });


    it('removes the file', () => {
        const { result } = renderHook(() => useLocalStorage());
        act(() => {
            result.current.writeToStorage(testData);
        });

        act(() => {
            result.current.removeFromStorage(testData);
        });
        expect(removeFromLocalStorage).toHaveBeenCalledWith(defaultFileName, testData);
        expect(removeFromLocalStorage).toHaveBeenCalledTimes(1);
    });

});