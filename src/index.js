import './styles/reset.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import store from './store/storeConfig';

const app = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app(), document.getElementById('root'));

serviceWorker.unregister();
