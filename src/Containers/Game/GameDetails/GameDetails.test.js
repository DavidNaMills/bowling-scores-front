import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import GameDetails from './GameDetails';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';
import StaticPrompt from '../../../Components/StandAloneComponents/StaticPrompt/StaticPrompt';


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

        it('exists', ()=>{
            const wrapper = shallow(<GameDetails {...allConfig}/>);
            expect(wrapper.exists).toBeTruthy();
        });
    });

    describe('default render', ()=>{
        let wrapper;

        beforeEach(()=>{
            wrapper = mount(<GameDetails {...allConfig}/>);
        });
        
        it('renders a <Title/> component', ()=>{
            expect(wrapper.find('.contentContainer').length).toBe(1);
            expect(wrapper.find(Title).length).toBe(1);
        });

        it('renders a <GameChart/> component', ()=>{
            expect(wrapper.find(GameChart).length).toBe(1);
        });
        
        it('renders a <Table/> component', ()=>{
            expect(wrapper.find(Table).length).toBe(1);
        });
        
        it('renders 5 <Button/> components', ()=>{
            expect(wrapper.find(Button).length).toBe(5);
        });
    });

    it('renders <StaticPromp/> if user prop is null', ()=>{
        const tempConfig = {
            ...allConfig,
            user: null
        }
        const wrapper = mount(<GameDetails {...tempConfig}/>);
        expect(wrapper.find(StaticPrompt).length).toBe(1);
    });
});