import rootReducer from './combinedReducers';

const defaultLiveGameState = {
    players: {},
    games: {},
    isLoading: false
};

const defaultUserState = {
    token: null,
    user: null,
};

describe('rootReducer test suite', ()=>{
    it('contains liveGame reducer', ()=>{
        expect(
            rootReducer({liveGame: defaultLiveGameState, user: {}}, {type: '@@INIT'}).liveGame
        ).toEqual(defaultLiveGameState);
    });

    it('contains the user reducer', ()=>{
        expect(
            rootReducer({liveGame: defaultLiveGameState, user: defaultUserState}, {type:'@@INIT'}).user
        ).toEqual(defaultUserState)
    });
});