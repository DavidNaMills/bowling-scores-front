import { playerTableStyle } from './playerTableStyle';

describe('playerTableStyle test suite', () => {
    it('returns an object with the color injected', () => {
        const color = '999, 999, 999';

        expect(playerTableStyle(color)).toEqual({
            background: `linear-gradient(180deg, rgba(255,255,255,1) 37%, rgba(${color},1) 100%)`
        });
    });
});