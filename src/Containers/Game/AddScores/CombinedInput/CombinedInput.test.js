import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import CombinedInput from './CombinedInput';
import Input from '../../../../Components/Form/elements/Input/Input';


const updateScoreMock = jest.fn();
const testConfig = {
    name: 'David',
    color: '123, 123, 123',
    value: 123,
    updateScore: { updateScoreMock },
    id: 'f2d3fd3ds'
}


describe('<CombinedInput /> test suite', () => {
    describe('snapshot tests', () => {
        test('matches default snapshot', () => {
            const component = renderer.create(<CombinedInput {...testConfig}/>);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });
    });

    describe('render tests', ()=>{
        const wrapper = mount(<CombinedInput {...testConfig}/>)

        it('displays the players name', ()=>{
            expect(wrapper.find('p').text()).toEqual(testConfig.name);
            expect(wrapper.find('.combinedInput').length).toBe(3);
            expect(wrapper.find('.combinedInput__name').length).toBe(1);
        });

        it('contains an <Input/> component with div wrappers', ()=>{
            expect(wrapper.find('.combinedInput__input').length).toBe(1);
            expect(wrapper.find(Input).length).toBe(1);
        });
    });
});