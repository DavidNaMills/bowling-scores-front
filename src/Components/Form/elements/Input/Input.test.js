import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { CreateSharp, ErrorSharp } from '@material-ui/icons'

import Input from './Input';

describe('<Input/> test suite', () => {
    const testId = 'test';
    const action = { target: { value: 'This is a test', id: testId } }
    const mockFn = jest.fn();
    const testPlaceholder = 'placeholder';
    const testLabel = 'Test Label';
    const errors = ['error 1', 'error 2']
    const base = {
        id: testId,
        changed: mockFn,
        placeholder: testPlaceholder,
        label: testLabel,
        type: 'text'
    }

    describe('Snapshot tests', () => {
        const testData = [
            { 
                snap: 'minimal config snapshot test',
                config: {...base, placeholder:null, label:null}
            },
            { 
                snap: 'basic with placeholder and label snapshot test',
                config: {...base}
            },
            { 
                snap: 'required with label and placeholder snapshot test',
                config: {...base, isRequired: true}
            },
            { 
                snap: 'invalid snapshot test',
                config: {...base, error: errors}
            }
        ]

        testData.forEach(x=>{
            test(x.snap, ()=>{
                const component = renderer.create(<Input {...x.config}/>);
                const app = component.toJSON();
                expect(app).toMatchSnapshot();
            })
        });
    })

    describe('Styling tests', () => {
        it('creates a basic text input: only default values', () => {
            const wrapper = shallow(<Input changed={mockFn} id={testId} />)
            const elem = wrapper.find('input');

            expect(elem.length).toBe(1);
            expect(elem.props().type).toEqual('text');
            expect(elem.props().placeholder).toEqual('');
            expect(elem.hasClass('input__default')).toBeTruthy();

            expect(elem.find('label').length).toBe(0);
        });


        it('creates a password text input: displays label and placeholder', () => {
            const wrapper = shallow(<Input {...base} type='password' />)
            const elem = wrapper.find('input');
            const lbl = wrapper.find('label');

            expect(elem.length).toBe(1);
            expect(elem.props().type).toEqual('password');
            expect(elem.props().placeholder).toEqual(testPlaceholder);
            expect(elem.hasClass('input__default')).toBeTruthy();

            expect(lbl.length).toBe(1);
            expect(lbl.text()).toEqual(testLabel);
            expect(lbl.props().htmlFor).toEqual(testId);
        });

        it('creates an input displays a required icon', () => {
            const wrapper = shallow(<Input {...base} isRequired isValid />)
            const elem = wrapper.find(CreateSharp);
            const inp = wrapper.find('input')
            expect(elem.length).toBe(1);
            expect(elem.hasClass('icon__required')).toBeTruthy();
            expect(inp.hasClass('input__valid')).toBeTruthy();
        })

        it('creates an input that displays an error icon. not required', () => {
            const wrapper = shallow(<Input {...base} error={errors} />)
            const elem = wrapper.find(ErrorSharp);
            const inp = wrapper.find('input');
            const errP = wrapper.find('p');

            expect(elem.length).toBe(1);
            expect(elem.hasClass('icon__error')).toBeTruthy();
            expect(inp.hasClass('input__error')).toBeTruthy();

            expect(errP.length).toBe(errors.length)
            expect(errP.first().hasClass('input__errorContainer_errorMsg')).toBeTruthy();

        });

        it('creates an input that displays an error icon. when required', () => {
            const wrapper = shallow(<Input {...base} error={errors} isRequired />)
            const elem = wrapper.find(ErrorSharp);
            const inp = wrapper.find('input');
            const errP = wrapper.find('p');

            expect(elem.length).toBe(1);
            expect(elem.hasClass('icon__error')).toBeTruthy();
            expect(inp.hasClass('input__error')).toBeTruthy();
            expect(errP.length).toBe(errors.length)
            expect(errP.first().hasClass('input__errorContainer_errorMsg')).toBeTruthy();
        });
    })

    describe('Behaviour tests', () => {
        it('should invoke the action when clicked', () => {
            const wrapper = shallow(<Input {...base} />)
            wrapper.find('input').simulate('change', action);
            expect(mockFn.mock.calls.length).toBe(1);

            //TODO: test correct values are returned

        })
    })
})