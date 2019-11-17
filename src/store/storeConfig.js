import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './combinedReducers';
import thunk from 'redux-thunk';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    enhancers(applyMiddleware(thunk))
);

export default store;