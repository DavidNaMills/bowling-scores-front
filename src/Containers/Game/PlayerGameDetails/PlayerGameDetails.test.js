import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

jest.mock('react-redux');
import {useSelector} from 'react-redux';

jest.mock('../../../Hooks/useShowHook/useShow');
import useShowHook from '../../../Hooks/useShowHook/useShow';

const original = window;
window.scrollTo = jest.fn();

import PlayerGameDetails from './PlayerGameDetails';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import GameChart from '../../../Components/GameChart/GameChart';
import InputFactory from '../../../Components/Form/InputFactory/InputFactory';
import Popup from '../../../Components/StandAloneComponents/Popup/Popup';


const mockLiveGame = {
    games: {
        1: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 12 } },
        2: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 24 } },
        3: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 154 } },
    },
    players: {
        'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416f6c" }
    }
};

const mockUser = {
    token: '1d23saf1d23sa',
    user: {name: 'david', color: '132, 123, 123'}
};

const mockLocation = {state: {id: 'debb53c3-ad2a-4093-b89b-2a5025416f6c'}};


afterEach(()=>{
    jest.clearAllMocks();
    window = original;
});

describe('<playerGameDetails/> test suite', ()=>{
    beforeEach(()=>{
        useShowHook.mockImplementation(()=>({
            isShow: {
                showEdit: false,
                showPopup: false
            },
            changeShow: jest.fn()
        }))
    });

    it('matches snapshot', ()=>{
        useSelector.mockImplementation(()=>({
            liveGame: mockLiveGame,
            user: mockUser
        }));
        const comp = renderer.create(<PlayerGameDetails location={mockLocation}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });
    
    it('exists', ()=>{
        const wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
        expect(wrapper.exists).toBeTruthy();
    });
    
    describe('default view (isEdit===false)', ()=>{
        let wrapper;

        beforeEach(()=>{
            useSelector.mockImplementation(()=>({
                liveGame: mockLiveGame,
                user: mockUser
            }));
            wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
        })
        
        it('renders a container <div> with class="contentContainer"', ()=>{
            const div = wrapper.find('div');
            expect(div.at(0).props().className).toEqual('contentContainer');
        });
        
        it('renders 1 buildBackButtons', ()=>{
            expect(wrapper.find('#buildDelete').length).toBe(1);
        });
        
        it('renders a <Title /> component', ()=>{
            expect(wrapper.find(Title).length).toBe(1);
        });

        it('renders 2 <Table/> components', ()=>{
            expect(wrapper.find(Table).length).toBe(2);
        });

        it('renders a <GameChart/> component', ()=>{
            expect(wrapper.find(GameChart).length).toBe(1);
        });

        it('Buttons have correct labels', ()=>{
            const btn = wrapper.find(Button);
            expect(btn.length).toBe(4);
            expect(btn.at(0).props().label).toEqual('Back');
            expect(btn.at(1).props().label).toEqual('Edit scores');
            expect(btn.at(2).props().label).toEqual('Back');
            expect(btn.at(3).props().label).toEqual('Remove Player');
        });
    });
    
    describe('showEdit is true', ()=>{
        let wrapper;

        beforeEach(()=>{
            useSelector.mockImplementation(()=>({
                liveGame: mockLiveGame,
                user: mockUser
            }));
            wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
        })

        it('displays the form for updating. classname="form__container"', ()=>{
            useShowHook.mockImplementation(()=>({
                isShow: {
                    showEdit: true,
                    showPopup: false
                },
                changeShow: jest.fn()
            }));
            wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
            expect(wrapper.find('.form__container').length).toBe(1);
        });
        
        it('renders a form with 3 <InputFactory/> components', ()=>{
            useShowHook.mockImplementation(()=>({
                isShow: {
                    showEdit: true,
                    showPopup: false
                },
                changeShow: jest.fn()
            }));
            wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
            expect(wrapper.find('form').length).toBe(1);
            expect(wrapper.find(InputFactory).length).toBe(3);
        });

        it('renders 4 <Button/> components with correct labels', ()=>{
            useShowHook.mockImplementation(()=>({
                isShow: {
                    showEdit: true,
                    showPopup: false
                },
                changeShow: jest.fn()
            }));
                const btn = wrapper.find(Button);
                expect(btn.length).toBe(4);
                expect(btn.at(0).props().label).toEqual('Back');
                expect(btn.at(1).props().label).toEqual('Edit scores');
                expect(btn.at(2).props().label).toEqual('Back');
                expect(btn.at(3).props().label).toEqual('Remove Player');
        });
    });

    describe('popup display tests', ()=>{
        let wrapper;

        beforeEach(()=>{
            useSelector.mockImplementation(()=>({
                liveGame: mockLiveGame,
                user: mockUser
            }));
            wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
        })

        it('displays the form for updating. classname="form__container"', ()=>{
            useShowHook.mockImplementation(()=>({
                isShow: {
                    showEdit: false,
                    showPopup: true
                },
                changeShow: jest.fn()
            }));
            wrapper = mount(<PlayerGameDetails location={mockLocation}/>);
            expect(wrapper.find(Popup).length).toBe(1);
        });
    });
});

// showPopup
