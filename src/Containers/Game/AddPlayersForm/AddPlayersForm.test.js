import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

import AddPlayersForm from './AddPlayersForm';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Table from '../../../Components/Table/Table';
import Input from '../../../Components/Form/elements/Input/Input';
import Title from '../../../Components/StandAloneComponents/Title/Title';

jest.mock('react-redux');
import {useSelector} from 'react-redux';

const mockState = {
    games: {
        1: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 12 } },
        2: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 24 } },
        3: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 154 } },
    },
    players: {
        'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416f6c" }
    }
};
const splSelMock = jest.fn();
const onCloseMock = jest.fn();

afterEach(()=>{
    jest.clearAllMocks();
});

describe('<AddPlayersForm /> test suite', ()=>{

    beforeEach(()=>{
        useSelector.mockImplementation(()=>(mockState));
    });
    
    describe('Snapshot tests', ()=>{
        test('matches default snapshot', () => {
            const component = renderer.create(<AddPlayersForm 
                title='Test' 
                playerSelect={splSelMock}
                onClose={onCloseMock}
            />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });
    });

    describe('Correct components are rendered', ()=>{
        it('renders the correct components', ()=>{
            const wrapper = mount(<AddPlayersForm 
                title='Test' 
                playerSelect={splSelMock}
                onClose={onCloseMock}
            />);

            expect(wrapper.find(Title).length).toBe(1);
            expect(wrapper.find(Input).length).toBe(1);
            expect(wrapper.find(Button).length).toBe(4);
            expect(wrapper.find(Table).length).toBe(1);

        });

        it('renders the correct components when isNew', ()=>{
            const wrapper = mount(<AddPlayersForm 
                title='Test' 
                playerSelect={splSelMock}
                onClose={onCloseMock}
                isNew
            />);

            expect(wrapper.find(Title).length).toBe(1);
            expect(wrapper.find(Input).length).toBe(1);
            expect(wrapper.find(Button).length).toBe(5);
            expect(wrapper.find(Table).length).toBe(1);

        });
    });
});