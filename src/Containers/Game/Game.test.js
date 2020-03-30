import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {act} from 'react-dom/test-utils';

import Game from './Game';
import GameDetails from './GameDetails/GameDetails';
import AddScores from './AddScores/AddScores';
import AddPlayersForm from './AddPlayersForm/AddPlayersForm';
import SelectAnonPlayer from './SelectAnonPlayer/SelectAnonPlayer';

jest.mock('../../Hooks/useShowHook/useShow');
import useShowHook from '../../Hooks/useShowHook/useShow';

jest.mock('react-redux');
import { useSelector } from 'react-redux';

import Spinner from '../../Components/Spinner/Spinner';

const mockState = {
    liveGame: {
        isLoading: false,
        games: {
            1: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 12 } },
            2: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 24 } },
            3: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 154 } },
        },
        players: {
            'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416f6c" }
        }
    }
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('<Game/> component test suite', () => {
    describe('creation tests', () => {

        beforeEach(() => {
            useShowHook.mockImplementation(() => ({
                isShow: {
                    gameDetails: true,
                    addPlayers: false,
                    addscores: false,
                    newGame: false,
                    playerSelect: false
                },
                changeShow: jest.fn()
            }));

            useSelector.mockImplementation(() => ({
                user: { token: 'fdsfdsa', user: { name: 'david', color: '123,456,789' } },
                liveGame: { isLoading: true }
            }));
        });

        useShowHook.mockImplementation(() => ({
            isShow: {
                gameDetails: true,
                addPlayers: false,
                addscores: false,
                newGame: false,
                playerSelect: false
            },
            changeShow: jest.fn()
        }))

        it('matches snapshot', () => {
            const comp = renderer.create(<Game />);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('exists', () => {
            const wrapper = shallow(<Game />);
            expect(wrapper.exists).toBeTruthy();
        });
    });

    describe('render views tests', () => {
        const mockState = {
            user: { token: 'fdsfdsa', user: { name: 'david', color: '123,456,789' } },
            liveGame: { isLoading: false }
        }

        it('displays a spinner if isLoading is true', () => {
            useShowHook.mockImplementation(() => ({
                isShow: {
                    gameDetails: true,
                    addPlayers: false,
                    addscores: false,
                    newGame: false,
                    playerSelect: false
                },
                changeShow: jest.fn()
            }));

            useSelector.mockImplementation(() => ({
                user: { token: 'fdsfdsa', user: { name: 'david', color: '123,456,789' } },
                liveGame: { isLoading: true }
            }));
            const wrapper = mount(<Game />);

            expect(wrapper.find(Spinner).length).toBe(1);
        });

        // gameDetails displays GameDetails
        it('renders <GameDetails/> component', () => {
            useShowHook.mockImplementation(() => ({
                isShow: {
                    gameDetails: true,
                    addPlayers: false,
                    addscores: false,
                    newGame: false,
                    playerSelect: false
                },
                changeShow: jest.fn()
            }));

            useSelector.mockImplementation(() => (mockState));
            const wrapper = mount(<Game />);

            expect(wrapper.find(GameDetails).length).toBe(1);
        });

        it('renders <AddPlayersForm/>', ()=>{
            useShowHook.mockImplementation(() => ({
                isShow: {
                    gameDetails: false,
                    addPlayers: true,
                    addscores: false,
                    newGame: false,
                    playerSelect: false
                },
                changeShow: jest.fn()
            }));

            useSelector.mockImplementation(() => (mockState));
            const wrapper = mount(<Game />);

            expect(wrapper.find(AddPlayersForm).length).toBe(1);
        });

        it('renders <AddScores/>', ()=>{
            useShowHook.mockImplementation(() => ({
                isShow: {
                    gameDetails: false,
                    addPlayers: false,
                    addscores: true,
                    newGame: false,
                    playerSelect: false
                },
                changeShow: jest.fn()
            }));

            useSelector.mockImplementation(() => (mockState));
            const wrapper = mount(<Game />);

            expect(wrapper.find(AddScores).length).toBe(1);
        });
        

        it.skip('renders <SelectAnonPlayer/>', ()=>{
            // FIXME: 

            useShowHook.mockImplementation(() => ({
                isShow: {
                    gameDetails: false,
                    addPlayers: false,
                    addscores: false,
                    newGame: false,
                    playerSelect: true
                },
                changeShow: jest.fn()
            }));

            useSelector.mockImplementation(() => (mockState));

            const wrapper = mount(<Game />);
            act(()=>{
                wrapper.gameRef.current= {
                    games: {
                        "1": { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: "12" } },
                        "2": { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: "24" } },
                        "3": { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: "154" } },
                    },
                    players: {
                        'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416f6c" }
                    }
                };
            });
            expect(wrapper.find(SelectAnonPlayer).length).toBe(1);

        });
        

        // playerSelect displays SelectAnonPlayer
    });

});

//TODO: test the logic: move into own hook or seperate function?
//

// game exists in localstorage
    // parsed.logged && ! show && user token && show && parsed.Id === user._id  === popup1
    // parsed.logged && ! show && user token && show && parsed.Id !== user._id  === cancel
    // parsed.logged && ! show && !user token === popup2

    // !parsed.logged && user token === popup3
    // !parsed.logged && ! user token === popup1
// NewGame
