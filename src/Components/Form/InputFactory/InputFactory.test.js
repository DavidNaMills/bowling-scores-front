import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Input from '../elements/Input/Input';
import Inputfactory from './InputFactory';

const testFn = jest.fn();
const testData = {
    id: 'password',
    config: {
        elementtype: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'user_name'
        },
        value: '',
        validation: {
            minLength: {
                req: 10,
                errMsg: 'login_err1'
            },
            maxLength: {
                req: 20,
                errMsg: 'login_err2'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    }
}

describe('<InputFactory /> test suite', () => {
    describe('Snapshot tests', ()=>{
        test('<InputFactory/> snapshot test', ()=>{
            const component = renderer.create(<Inputfactory config={testData.config} id={testData.id} changed={testFn} />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        })
    })

    it('should generate an <Input/> element', () => {
        const wrapper = mount(<Inputfactory config={testData.config} id={testData.id} changed={testFn} />)
        expect(wrapper.find(Input).length).toBe(1);
    })



    //TODO: handle errors
    //TODO: add more components when needed
    //returns error
})