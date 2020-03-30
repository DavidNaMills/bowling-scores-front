import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { BrowserRouter, NavLink } from 'react-router-dom';
import GameHistory from './GameHistory';
import Title from '../../Components/StandAloneComponents/Title/Title';
import Spinner from '../../Components/Spinner/Spinner';
import Table from '../../Components/Table/Table';


jest.mock('react-redux');
import { useSelector } from 'react-redux';
const mockToken = '1v2d3s1v2s';

// jest.mock('react-device-detect');
// import { isMobileOnly, withOrientationChange } from 'react-device-detect';

jest.mock('../../Hooks/useInfinite/useInfinite');
import useInfinite from '../../Hooks/useInfinite/useInfinite';

import Anime from 'react-anime';


const mockSearchResultsBar = jest.fn(() => <div></div>);
const mockInfiniteSearchBar = jest.fn(() => <div></div>);
const mockLoadMoreBar = jest.fn(() => <div></div>);

const baseFns = {
    fetchItems: jest.fn(() => []),
    searchResultsBar: mockSearchResultsBar,
    infiniteSearchBar: mockInfiniteSearchBar,
    loadMoreBar: mockLoadMoreBar
}

const mockItems = [
    {
        _id: 'fdafdafdas',
        createdAt: '2020-01-21T07:45:51.862+00:00',
        players: {
            '5e26aacc7483c043600de418': {
                name: "super balls",
                color: "3, 169, 244"
            }
        },
        games: {
            "1": {
                '5e26aacc7483c043600de418': {
                    name: "super balls",
                    score: 123
                }
            },
            "2": {
                '5e26aacc7483c043600de418': {
                    name: "super balls",
                    score: 159
                }
            },
        }
    },
    {
        _id: 'fdafdafdas',
        createdAt: '2020-01-21T07:45:51.862+00:00',
        players: {
            '5e26aacc7483c043600de418': {
                name: "super balls",
                color: "3, 169, 244"
            }
        },
        games: {
            "1": {
                '5e26aacc7483c043600de418': {
                    name: "super balls",
                    score: 111
                }
            },
            "2": {
                '5e26aacc7483c043600de418': {
                    name: "super balls",
                    score: 222
                }
            },
        }
    },
]

afterEach(() => {
    jest.clearAllMocks();
});

describe('<GameHistory /> component test suite', () => {
    describe('basic tests', () => {
        it('snapshot tests', () => {
            useSelector.mockImplementation(() => ({
                token: mockToken,
                user: { color: '123, 123, 123' }
            }));
            useInfinite.mockImplementation(() => ({
                ...baseFns,
                items: [],
                infiniteLoading: false,
            }));

            const comp = renderer.create(<BrowserRouter><GameHistory /></BrowserRouter>);
            const app = comp.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('renders a <Title/> component, searchResultsBar and <div> with className="gameHistory"', () => {
            useSelector.mockImplementation(() => ({
                token: mockToken,
                user: { color: '123, 123, 123' }
            }));
            useInfinite.mockImplementation(() => ({
                ...baseFns,
                items: [],
                infiniteLoading: false,
            }));

            const wrapper = mount(<BrowserRouter><GameHistory /></BrowserRouter>);
            expect(wrapper.find(Title).length).toBe(1);
            expect(wrapper.find('.gameHistory').length).toBe(1);
            expect(mockSearchResultsBar).toHaveBeenCalledTimes(1);
            expect(mockLoadMoreBar).toHaveBeenCalledTimes(1);
            useSelector.mockClear();
        });

        it('renders a NavLink if no games and infiniteLoading = false', () => {
            useSelector.mockImplementation(() => ({
                token: mockToken,
                user: { color: '123, 123, 123' }
            }));
            useInfinite.mockImplementation(() => ({
                ...baseFns,
                items: [],
                infiniteLoading: false,
            }));
            const wrapper = mount(<BrowserRouter><GameHistory /></BrowserRouter>);

            expect(wrapper.find(NavLink).length).toBe(1);
            expect(wrapper.find(Spinner).length).toBe(0);
            expect(mockSearchResultsBar).toHaveBeenCalledTimes(1);
            expect(mockLoadMoreBar).toHaveBeenCalledTimes(1);
            useSelector.mockClear();
        });

        it('renders the <Spinner/> component if no games and infiniteLoading = false', () => {
            useSelector.mockImplementation(() => ({
                token: mockToken,
                user: { color: '123, 123, 123' }
            }));
            useInfinite.mockImplementation(() => ({
                ...baseFns,
                items: [],
                infiniteLoading: true,
            }));
            const wrapper = mount(<BrowserRouter><GameHistory /></BrowserRouter>);

            expect(wrapper.find(NavLink).length).toBe(0);
            expect(wrapper.find(Spinner).length).toBe(1);
            expect(mockSearchResultsBar).toHaveBeenCalledTimes(1);
            expect(mockLoadMoreBar).toHaveBeenCalledTimes(1);
            useSelector.mockClear();
        });
    });

    describe('content render tests', () => {
        let conWrap;

        beforeEach(() => {
            useSelector.mockImplementation(() => ({
                token: mockToken,
                user: { color: '123, 123, 123' }
            }));
            useInfinite.mockImplementation(() => ({
                ...baseFns,
                items: mockItems,
                infiniteLoading: false,
            }));
            conWrap = mount(<BrowserRouter><GameHistory /></BrowserRouter>);
        });

        it('renders 2 <Anime/> components', () => {
            expect(conWrap.find(Anime).length).toBe(2);
        });

        it('renders 2 <Table/> components', () => {
            expect(conWrap.find(Table).length).toBe(2);
        });
        
        it('renders 2 divs with class gameHistory__game_desktop if desktop', () => {
            expect(conWrap.find('.gameHistory__game_desktop').length).toBe(2);
        });
    });

    // TODO: test with isMobile
});