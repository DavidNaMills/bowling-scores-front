import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Popup from './Popup';
import Button from '../Button/Button';
import Title from '../Title/Title';


const buttonTest = [
    {
        msg: 'Doesnt render any buttons',
        test: {},
        results: {
            count: 0
        }
    },
    {
        msg: 'Only creates 1 button through action1',
        test: {
            action1: {
                action: jest.fn(),
                label: 'button 1'
            }
        },
        results: {
            count: 1
        }
    },
    {
        msg: 'Only renders 1 button through action2',
        test: {
            action2: {
                action: jest.fn(),
                label: 'button 2'
            }
        },
        results: {
            count: 1
        }
    },
    {
        msg: 'renders 2 buttons',
        test: {
            action1: {
                action: jest.fn(),
                label: 'button 1'
            },
            action2: {
                action: jest.fn(),
                label: 'button 2',
                type: 'danger'
            },
        },
        results: {
            count: 2
        }
    },

]

describe('<Popup /> test suite', () => {
    describe('snapshot test', ()=>{
        test('matches default snapshot', () => {
            const testMesg = 'This is a test message';
            const component = renderer.create(<Popup message={testMesg} />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });
    });

    describe('styling test suite', () => {
        it('displays the message with no optional extras', () => {
            const testMesg = 'This is a test message';
            const wrapper = mount(<Popup message={testMesg} />);
            expect(wrapper.find('p').length).toBe(1);
            expect(wrapper.find('p').at(0).text()).toEqual(testMesg);
            expect(wrapper.find(Title).length).toBe(0);
            expect(wrapper.find(Button).length).toBe(0);
        });

        it('contains a counter className and a module className', () => {
            const wrapper = mount(<Popup />)
            expect(wrapper.find('.popup__container').length).toBe(1);
            expect(wrapper.find('.popup__module').length).toBe(1);
        });


        buttonTest.forEach(x => {
            it(x.msg, () => {
                const wrapper = mount(<Popup {...x.test} />)
                const btn = wrapper.find(Button);
                expect(btn.length).toBe(x.results.count);
            });
        });

        it('contains a message', () => {
            const testMsg = 'This is a test message';
            const wrapper = mount(<Popup message={testMsg} />)
            const msg = wrapper.find('p');
            expect(msg.at(0).length).toBe(1);
            expect(msg.at(0).text()).toEqual(testMsg);
            expect(wrapper.find('.popup__message').length).toBe(1);
        });

        it('contains a title when specified', () => {
            const testTitle = {
                label: 'Test title',
                ttlType: 'section'
            }
            const wrapper = mount(<Popup title={testTitle} />);
            expect(wrapper.find(Title).length).toBe(1);
        });

        it('contains a <p> tag with text CLOSE ', () => {
            const wrapper = mount(<Popup close={()=>{}}/>);
            const cls = wrapper.find('p');
            expect(cls.length).toBe(2);
            expect(cls.at(0).text()).toEqual('CLOSE');
            expect(wrapper.find('.popup__closeBar').length).toBe(1);
            expect(wrapper.find('.popup__closeBar_cls').length).toBe(1);
        });
    
        it(' CLOSE is not rendered if no close function is provided ', () => {
            const wrapper = mount(<Popup />);
            const cls = wrapper.find('p');
            expect(cls.length).toBe(1);
        });
    });

    describe('behavioural test suite', () => {
        it('fires the close function', () => {
            const closeMk = jest.fn();
            const wrapper = mount(<Popup close={closeMk} />);
            wrapper.find('p').at(0).simulate('click');
            expect(closeMk.mock.calls.length).toBe(1);
        });
    });
});
