import {UPDATE_STATS, CLEAR_STATS} from '../statsActionTypes';

export const updateStats = (stats) =>({
    type: UPDATE_STATS,
    payload: stats
});

export const clearStats = () =>({
    type: CLEAR_STATS
})