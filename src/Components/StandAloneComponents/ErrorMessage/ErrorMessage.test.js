import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage /> test suite', () => {
    //renders a message
    const testMsg = 'I am a long test message';
    const mockClose = jest.fn();

    it('renders a message', () => {
        const wrapper = shallow(<ErrorMessage msg={testMsg} />)
        expect(wrapper.find('.errorMessage').length).toBe(1);
        expect(wrapper.find('.errorMessage__msg').length).toBe(1);
        expect(wrapper.find('p').text()).toEqual(testMsg);
    });

    it('shows the close button', () => {
        const wrapper = shallow(<ErrorMessage
            msg={testMsg}
            close={mockClose}
        />);
        expect(wrapper.find('.errorMessage__closeBar').length).toBe(1);
        expect(wrapper.find('p').length).toBe(2);
        expect(wrapper.find('p').at(0).text()).toEqual('CLOSE');
    });
    
    
    it('shows the close button', () => {
        const wrapper = shallow(<ErrorMessage
            msg={testMsg}
            close={mockClose}
        />);
        wrapper.find('p').at(0).simulate('click');
        expect(wrapper.find('p').at(0).text()).toEqual('CLOSE');
        expect(mockClose.mock.calls.length).toBe(1);
    });



    //shows the close button
    //close button is fired
});