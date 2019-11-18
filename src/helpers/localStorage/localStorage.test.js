import {writeToLocalStorage, readFromLocalStorage, removeFromLocalStorage} from './localStorage';

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
        writeToLocalStorage(testFilename, testData);
        expect(localStorage.setItem).toHaveBeenCalledWith(testFilename, JSON.stringify(testData));
    });


    it('should write to the file using specified file name', () => {
        writeToLocalStorage(testFilename, testData);
        expect(localStorage.setItem).toHaveBeenCalledWith(testFilename, JSON.stringify(testData));
    });


    it('reads in from file', () => {
        writeToLocalStorage(testFilename, testData);
        readFromLocalStorage(testFilename, testData);
        expect(localStorage.getItem).toHaveBeenCalled();
    });


    it('removes the file', () => {
        writeToLocalStorage(testFilename, testData);
        removeFromLocalStorage(testFilename, testData);
        expect(localStorage.removeItem).toHaveBeenCalledWith(testFilename, testData);
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    });

});