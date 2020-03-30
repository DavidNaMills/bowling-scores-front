import { renderHook, act } from '@testing-library/react-hooks';
import configureStore from 'redux-mock-store'
import useAddPlayer from './useAddPlayer';

const mockLiveGame = {
    games: {},
    players: { 'xzac': { name: 'david', color: '456, 456, 456' } }
};
const mockUser = {
    user: {
        _id: '123456789abcdef',
        username: 'David',
        color: '258, 369, 147'
    }
}

jest.mock('react-redux', () => ({
    useDispatch: () => { },
    useSelector: () => ({
        liveGame: mockLiveGame,
        user: mockUser
    })
}));


//FIXME: 
// mock useSelector only works if 1 value is returned. 
// if multiple, ie user & liveGame, both are returned and tests fail



describe('useAddPlayer hook', () => {
    describe('setup tests', () => {
        it.skip('sets the liveGame from the store', () => {
            const { result } = renderHook(() => useAddPlayer(false));
            expect(result.current.liveGame).toEqual({ liveGame: mockLiveGame });
        });
    });

    describe('generate player from logged in user tests', () => {
        it.skip('generates a player from the logged in details: logged in and isNew', () => {
            const { result } = renderHook(() => useAddPlayer(true));
            expect(result.current.liveGame).toEqual({
                liveGame: {
                    players: {
                        [mockUser.user._id]: { name: mockUser.user.username, color: mockUser.user.color }
                    },
                    games: {}
                }
            })
        });

        it('doesnt generate player if not logged in', () => { });
    });

    describe('setName tests', () => {
        it('sets the name in the player object', () => { });
    });

    describe('adds the color to the player object', () => {
        it('', () => { });
    });

    describe('addPlayer tests', () => {
        it('does not create a new player if name is not set', () => { });
        it('auto generates an id if not already set', () => { });
        it('auto generates a color if not already set', () => { });
        it('initialises a new game if isNew===true', () => { });
        it('calls addNewPlayerDispatch if isNew===false', () => { });
        it('returns true if there is no newPlayer.name set', () => { });
    });

    describe('commitGame tests', () => {
        it('does nothing if isNew===false', () => { });
        it('calls commitNewGameDispatch and the callback function if isNew===false', () => { });
    });
});