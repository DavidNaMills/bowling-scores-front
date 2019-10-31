import React from 'react';
import { mount, shallow } from 'enzyme';
import {act} from 'react-dom/test-utils'
import renderer from 'react-test-renderer';

import LoginContainer from './LoginContainer';
import Title from '../../Components/StandAloneComponents/Title/Title'
import Button from '../../Components/StandAloneComponents/Button/Button'
import Input from '../../Components/Form/elements/Input/Input'


describe('<LoginContainer/> test suite', ()=>{
    describe('Snapshot test suite', ()=>{
        // basic
        // with errors (from input)
        // with errors from axios call
        // with spinner
    })
    
    describe('Layout and rendering test suite', ()=>{

        it('should render Title, 2 Inputs and 2 Buttons', ()=>{
            const wrapper = mount(<LoginContainer />);
            const title = wrapper.find(Title);
            const btns = wrapper.find(Button);
            const inp = wrapper.find(Input);

            expect(title.length).toBe(1);
            expect(btns.length).toBe(2);
            expect(inp.length).toBe(2)
        });

        //show spinner
        //show error messages
    })
    
    describe('functionality test suite', ()=>{
        
    })
});

