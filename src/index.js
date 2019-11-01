import './styles/reset.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './store/storeConfig';
import { LocaleProvider } from './context/Locale/localeContext';

const app = () => (
    <Provider store={store}>
        <BrowserRouter>
            <LocaleProvider>
                <App />
            </LocaleProvider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app(), document.getElementById('root'));

serviceWorker.unregister();
