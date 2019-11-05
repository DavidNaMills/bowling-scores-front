import { combineReducers } from 'redux';

import liveGameReducer from './liveGame/reducer/liveGameReducer';

const rootReducer = combineReducers({
    liveGame: liveGameReducer
});

export default rootReducer;