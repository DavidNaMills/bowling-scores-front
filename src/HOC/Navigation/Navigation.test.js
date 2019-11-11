import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { NavLink, BrowserRouter } from 'react-router-dom';

import Navigation from './Navigation';


describe('<Navigation /> test suite', () => {
    describe('snapshot tests', () => {
        it('should match the snapshot', () => {
            const component = renderer.create(
                <BrowserRouter>
                    <Navigation />
                </BrowserRouter>
            );
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });
    });

    describe('render tests', () => {
        const wrapper = mount(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>
        );

        it('contains 4 NavLink components', () => {
            expect(wrapper.find(NavLink).length).toBe(4);
        });

        it('contains 2 sections', () => {
            expect(wrapper.find('.navigation_section').length).toBe(2);
        });
    });
});

