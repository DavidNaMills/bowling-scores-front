import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

import FormRender from './FormRender';
import InputFactory from '../../../Components/Form/InputFactory/InputFactory'
import Button from '../../../Components/StandAloneComponents/Button/Button'
import Spinner from '../../../Components/Spinner/Spinner';


const tempForm = {
    username: {
        elementtype: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'user_name'
        },
        value: '',
        validation: {
            minLength: {
                req: 0,
                errMsg: 'login_err1'
            },
            maxLength: {
                req: 13,
                errMsg: 'login_err2'
            }
        },
        touched: false,
        isValid: false,
        shouldValidate: true,
        hasErr: []
    },
    password: {
        elementtype: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'user_pass'
        },
        value: '',
        isValid: false,
        validation: {
            minLength: {
                req: 123,
                errMsg: 'login_err1'
            },
            maxLength: {
                req: 123,
                errMsg: 'login_err2'
            }
        },
        touched: false,
        shouldValidate: true,
        hasErr: []
    }
}


const mockProps = (isLoading) => ({
    submit: jest.fn(),
    formState: tempForm,
    manageState: {},
    isLoading,
    clear: jest.fn()
});


describe('<FormRender/> component test suite', ()=>{
    it('matches the snapshot', ()=>{
        const comp = renderer.create(<FormRender {...mockProps(true)}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });


    it('exists', ()=>{
        const wrapper = mount(<FormRender {...mockProps(false)}/>);
        expect(wrapper.exists).toBeTruthy();
    });
    
        it('renders a form and 2 <InputFactory/>', ()=>{
        const wrapper = mount(<FormRender {...mockProps(false)}/>);
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find(InputFactory).length).toBe(2);
    });

    it('renders 3 <Button/> ', ()=>{
        const wrapper = mount(<FormRender {...mockProps(false)}/>);
        expect(wrapper.find(Button).length).toBe(2);
    });

    it('renders the <Spinner/> component if isLoading is true', ()=>{
        const wrapper=mount(<FormRender {...mockProps(true)}/>);
        expect(wrapper.find(Spinner).length).toBe(1);
    });
});