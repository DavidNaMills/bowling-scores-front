import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

import AddScores from './AddScores';
import CombinedInput from './CombinedInput/CombinedInput';
import Button from '../../../Components/StandAloneComponents/Button/Button';
import Title from '../../../Components/StandAloneComponents/Title/Title';


const mockPlayers = {
    '1ad602da-92de-417e-86f6-3cd1d84bc328': {
        name: "david",
        color: "233, 80, 237"
    },
    '1ad602da-92de-86f6-3cd1d84bc328': {
        name: "alan",
        color: "233, 20, 237"
    },
    '92de-417e-86f6-3cd1d84bc328': {
        name: "bob",
        color: "233, 180, 237"
    },
}

const close = jest.fn();


describe('<AddScores/> test suite', () => {
    it('placeholder', ()=>{
        expect(true).toBeTruthy();
    });

    // describe('snapshot tests', () => {
    //     const component = renderer.create(<AddScores players={mockPlayers} close={close} />)
    //     const app = component.toJSON();
    //     expect(app).toMatchSnapshot();
    // });

    // describe('render test suite', () => {
    //     const wrapper = mount(<AddScores players={mockPlayers} close={close} />);
        
    //     it('renders a <Title>', ()=>{
    //         expect(wrapper.find(Title).length).toBe(1);
    //     });

    //     it('renders a form with accompanying containers', ()=>{
    //         expect(wrapper.find('.form__container').length).toBe(1);
    //         expect(wrapper.find('.form__form').length).toBe(1);
    //         expect(wrapper.find('form').length).toBe(1);
    //     });
        
    //     it(`form contains ${Object.keys(mockPlayers).length} <CombinedInputs`, ()=>{
    //         expect(wrapper.find(CombinedInput).length).toBe(Object.keys(mockPlayers).length);
    //     });

    //     it('contains 2 <Buttons /> with accompanying containers', ()=>{
    //         expect(wrapper.find('.largeExtra').length).toBe(2);
    //         expect(wrapper.find(Button).length).toBe(2);
    //     });
    // });

});