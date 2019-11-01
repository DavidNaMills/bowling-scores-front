import allLocale from './../locale-files/locale';

const localeReducer = (state = allLocale.en, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            const temp = allLocale[action.payload];
            return temp ? temp : state;
        default:
            return state;
    }
};

export default localeReducer;
export const CHANGE_LOCALE = 'change_locale';