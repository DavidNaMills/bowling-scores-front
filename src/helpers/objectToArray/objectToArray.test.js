import objectToArray from './objectToArray';
import loginFormConfig from '../../formConfigs/loginFormConfig';


describe('objectToArray test suite', () => {

    it('should convert an object to an array', () => {
        const res = objectToArray(loginFormConfig);
        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBe(2);
    });

    it('should contain object with ID and correct config', () => {
        const res = objectToArray(loginFormConfig);

        res.forEach(x => {
            expect(typeof (x)).toBe('object');
            expect(x).toHaveProperty('id');
            expect(x).toHaveProperty('config');
            expect(x.config).toEqual(loginFormConfig[x.id]);
        })
    });
})