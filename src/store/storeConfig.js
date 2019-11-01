import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './combinedReducers';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    enhancers(applyMiddleware())
);

export default store;