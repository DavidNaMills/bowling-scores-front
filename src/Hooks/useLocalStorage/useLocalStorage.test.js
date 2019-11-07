import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';


jest.spyOn(window.localStorage.__proto__, 'setItem');
jest.spyOn(window.localStorage.__proto__, 'getItem');
jest.spyOn(window.localStorage.__proto__, 'removeItem');
window.localStorage.__proto__.setItem = jest.fn();
window.localStorage.__proto__.getItem = jest.fn();
window.localStorage.__proto__.removeItem = jest.fn();


const testFilename = 'bowling-scores-test';
const defaultFileName = 'bowling-scores-temp'

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

describe('useLocalStorage test suite', () => {

    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        jest.spyOn(window.localStorage.__proto__, 'getItem');
        jest.spyOn(window.localStorage.__proto__, 'removeItem');
        window.localStorage.__proto__.setItem = jest.fn();
        window.localStorage.__proto__.getItem = jest.fn();
        window.localStorage.__proto__.removeItem = jest.fn();
    });


    it('should write to the file using default file name', async () => {
        const { result } = renderHook(() => useLocalStorage());
        act(() => {
            result.current.writeToLocalStorage(testData);
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(defaultFileName, testData);
    });


    it('should write to the file using specified file name', () => {
        const { result } = renderHook(() => useLocalStorage(testFilename))
        act(() => {
            result.current.writeToLocalStorage(testData);
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(testFilename, testData);
    });


    it('reads in from file', () => {
        const { result } = renderHook(() => useLocalStorage());
        act(() => {
            result.current.writeToLocalStorage(testData);
        });

        act(() => {
            result.current.readFromLocalStorage(testData);
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(defaultFileName, testData);
    });


    it('removes the file', () => {
        const { result } = renderHook(() => useLocalStorage());
        act(() => {
            result.current.writeToLocalStorage(testData);
        });

        act(() => {
            result.current.removeFromLocalStorage(testData);
        });
        expect(localStorage.removeItem).toHaveBeenCalledWith(defaultFileName, testData);
        expect(localStorage.removeItem).toHaveBeenCalledWith(defaultFileName);
    });

});