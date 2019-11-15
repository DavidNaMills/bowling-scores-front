import React from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LoggedInNavigation from './LoggedInNavigation';

describe('<LoggedIn /> test suite', () => {
    const user = { username: 'test test', color: '156, 156, 156' }
    const wrapper = mount(
        <BrowserRouter>
            <LoggedInNavigation user={user} />
        </BrowserRouter>
    );

    it('snapshot test', () => {
        const component = renderer.create(
            <BrowserRouter>
                <LoggedInNavigation user={user} />
            </BrowserRouter>
        );
        const app = component.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('renders 3 <NavLink> components', () => {
        expect(wrapper.find(NavLink).length).toBe(3);
    });

    it('renders username', () => {
        expect(wrapper.find('p').length).toBe(1);
        expect(wrapper.find('p').text()).toEqual(user.username);
    });

    it('classNames are set', () => {
        expect(wrapper.find('.navigation_section').length).toBe(2);
    });

});