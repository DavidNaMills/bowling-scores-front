import testData from './testData';
import gameParser from './tableGamesDataModifier';
import {stats} from './testData';

describe('parserForTableGames test suite', ()=>{
    //returns an array
    //each array element is an object and contains an ID and values array
    //values array first index is name
    
    it('should return an array with 3 elements', ()=>{
        const res = gameParser(testData);

        expect(Array.isArray(res)).toBeTruthy()
        expect(res.length).toBe(3);
    });

    it('should contain an array and an id', ()=>{
        const res = gameParser(testData);
        res.forEach(x=>{
            expect(x).toHaveProperty('id');
            expect(x).toHaveProperty('values');
            expect(x).toHaveProperty('style');
            expect(Array.isArray(x.values)).toBeTruthy();
        });
    });

    it('should have populated the array correctly', ()=>{
        const res = gameParser(testData);
        expect(res.length).toBe(3);
        res.forEach(x=>{
            expect(x.values[0]).toEqual(stats[x.id].name);
            expect(x.values[1]).toBe(stats[x.id].ave);
            expect(x.values[2]).toBe(stats[x.id].pinfall);
        })
    });

});