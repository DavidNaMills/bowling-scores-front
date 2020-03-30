import { combineReducers } from 'redux';

import liveGameReducer from './liveGame/reducer/liveGameReducer';
import userReducer from './user/reducer/userReducer';
import statsReducer from './stats/statsReducer/statsReducer';

const rootReducer = combineReducers({
    liveGame: liveGameReducer,
    user: userReducer,
    stats: statsReducer
});

export default rootReducer;