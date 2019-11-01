import React, {useReducer, useContext} from 'react';
import localeReducer from './localeReducer/localeReducer';
import en from './locale-files/en';

const LocaleState = React.createContext();
const LocaleDispatch = React.createContext();


const LocaleProvider = ({children}) =>{
    const [state, dispatch] = useReducer(localeReducer, en);
    return (
        <LocaleState.Provider value = {state}>
            <LocaleDispatch.Provider value={dispatch}>
                {children}
            </LocaleDispatch.Provider>
        </LocaleState.Provider>
    )
};

const useLocaleState = () =>{
    const locale = useContext(LocaleState);
    return locale;
};

const useLocaleDispatch = () =>{
    const changeLocale = useContext(LocaleDispatch)
    return changeLocale;
};

export { LocaleProvider, useLocaleState, useLocaleDispatch };