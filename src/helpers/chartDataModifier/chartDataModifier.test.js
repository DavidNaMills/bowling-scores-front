import chartModifier from './chartDataModifier';
import testData from '../tableGamesDataModifier/testData';

describe('chartDataModifier test suite', () => {
    describe('All players test suite', () => {
        const res = chartModifier(testData);

        it('should return an object', () => {
            expect(typeof (res)).toEqual('object');
            expect(res).toHaveProperty('data');
            expect(res).toHaveProperty('players');

            expect(res.data.length).toBe(3);
            expect(res.players.length).toBe(3);
        });

        it('has set the correct data', () => {
            expect(Array.isArray(res.data)).toBeTruthy();
            expect(res.data[0]).toHaveProperty('David');
            expect(res.data[0]).toHaveProperty('Paul');
            expect(res.data[0]).toHaveProperty('Kelby');
        });
    });

    describe('Single player test suite', ()=>{
        const res = chartModifier(testData, 123);

        it('should return an object', () => {
            expect(typeof (res)).toEqual('object');
            expect(res).toHaveProperty('data');
            expect(res).toHaveProperty('players');

            console.log(res);
            expect(res.data.length).toBe(3);
            expect(res.players.length).toBe(1);
        });

        it('has set the correct data', () => {
            expect(Array.isArray(res.data)).toBeTruthy();
            expect(res.data[0]).toHaveProperty('David');
        });
    });
});
