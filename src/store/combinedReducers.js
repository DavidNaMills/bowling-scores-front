import { combineReducers } from 'redux';

import liveGameReducer from './liveGame/reducer/liveGameReducer';
import userReducer from './user/reducer/userReducer';

const rootReducer = combineReducers({
    liveGame: liveGameReducer,
    user: userReducer
});

export default rootReducer;