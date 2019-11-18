import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import StaticPrompt from './StaticPrompt';
import Button from '../Button/Button';

const message = 'Login or signup to save your game!';



describe('<LoginPrompt/> test suite', () => {
     it('snapshot tests', () => {
        const testMesg = 'This is a test message';
        const component = renderer.create(<StaticPrompt message={testMesg} />);
        const app = component.toJSON();
        expect(app).toMatchSnapshot();
    });



    it('should contain a <p> element with text', () => {
        const wrapper = mount(
            <StaticPrompt
                message={message}
            />
        );
        const msg = wrapper.find('p');
        expect(msg.length).toBe(1);
        expect(msg.text()).toEqual(message);
    });


    it('should display 1 button', () => {
        const button1 = {
            click: jest.fn(),
            label: 'Signup',
            type: 'darkGreen'
        };
        
        const wrapper = mount(
            <StaticPrompt
                message={message}
                button1={button1}
            />
        );
        const btn1 = wrapper.find(Button);
        expect(btn1.length).toBe(1);
        btn1.at(0).simulate('click');
        expect(button1.click).toHaveBeenCalledTimes(1);
    });
    
    it('should display a close bar', ()=>{
        const close = jest.fn();
        const wrapper = mount(<StaticPrompt close = {close}/>);
        const cls = wrapper.find('p');

        expect(cls.length).toBe(2);
        expect(cls.at(0).text()).toEqual('CLOSE');
        cls.at(0).simulate('click');
        expect(close).toHaveBeenCalledTimes(1);
    });

    it('should display 2 buttons', () => {
        const button1 = {
            click: jest.fn(),
            label: 'Signup',
            type: 'darkGreen'
        };
        
        const button2 = {
            click: jest.fn(),
            label: 'Signup',
            type: 'darkBlue'
        };

        const wrapper = mount(
            <StaticPrompt
                message={message}
                button1={button1}
                button2={button2}
            />
        );
        const btn = wrapper.find(Button);
        expect(btn.length).toBe(2);
        btn.at(0).simulate('click');
        btn.at(1).simulate('click');
        expect(button1.click).toHaveBeenCalledTimes(1);
        expect(button2.click).toHaveBeenCalledTimes(1);

    });
});