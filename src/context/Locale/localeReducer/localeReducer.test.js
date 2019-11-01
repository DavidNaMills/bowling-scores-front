import localeReducer from './localeReducer';
import { CHANGE_LOCALE } from './localeReducer';
import allLocale from '../locale-files/locale';

const temp = { lang: 'test' };
allLocale['test'] = temp;

describe('localeReducer <for Context> test suite', () => {
    it('should return en as default', () => {
        const action = { type: 'CHANGE_LOCALE' }
        const res = localeReducer(undefined, action);
        expect(res.lang).toEqual('en');
    });

    it('should return ch language', () => {
        const action = { type: CHANGE_LOCALE, payload: 'ch' }
        const res = localeReducer(allLocale.en, action);
        expect(res.lang).toEqual('ch');
    });

    it('should return en if no language is found', () => {
        const action = { type: CHANGE_LOCALE, payload: 'dfr' }
        const res = localeReducer(allLocale.en, action);
        expect(res.lang).toEqual('en');
    });
});