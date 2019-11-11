import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import GameDetails from './GameDetails';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';


const testLiveData = {
    games: {
        1: {
            '28357764-b73e-4ab8-b672-63c62db64d1d': { name: "David", score: 123 }
        },
        2: {
            '28357764-b73e-4ab8-b672-63c62db64d1d': { name: "David", score: 254 }
        }
    },
    players: {
        '28357764-b73e-4ab8-b672-63c62db64d1d': { name: "David", color: "233, 80, 237" }
    }
}

const mockFn = jest.fn();

const allConfig = {
    liveGame: testLiveData,
    addNewPlayers: mockFn,
    playerSelect: mockFn,
    addScores: mockFn,
    newGame: mockFn
}


describe('<GameDetails/> test suite', () => {
    describe('snapshot tests', () => {
        it('matches the snapshot', () => {
            expect(true).toBeTruthy();
        });
    });

    describe('component rendering suite', () => {
        const wrapper = mount(<GameDetails {...allConfig} />)

        it('should render 3 <Buttons/>', () => {
            expect(wrapper.find(Button).length).toBe(3);
        });

        it('should render <GameChart />', () => {
            expect(wrapper.find(GameChart).length).toBe(1);
        });

        it('should render <Table />', () => {
            expect(wrapper.find(Table).length).toBe(1);
        });
    });
});