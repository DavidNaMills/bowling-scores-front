import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './Navigation';
import UnLoggedInNavigation from './UnLoggedInNavigation/UnLoggedInNavigation';
import LoggedInNavigation from './LoggedInNavigation/LoggedInNavigation';


const defaultUser = {
    token: null,
    user: null
}

const hasUser = {
    token: 'gdf5s6g5fd6sg5fd3s',
    user: {
        username: 'david'
    }
}

describe('<Navigation /> test suite', () => {
    describe('snapshot tests', () => {
        it('should match the snapshot <UnLoggedInNavigation/>', () => {
            const component = renderer.create(
                <BrowserRouter>
                    <Navigation user={defaultUser}/>
                </BrowserRouter>
            );
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });

        it('should match the snapshot <LoggedInNavigation/>', () => {
            const component = renderer.create(
                <BrowserRouter>
                    <Navigation user={hasUser}/>
                </BrowserRouter>
            );
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });
    });

    describe('render tests', () => {
        it('renders UnLoggedInNavigation if no user token is present', ()=>{
            const wrapper = mount(
                <BrowserRouter>
                    <Navigation user={defaultUser}/>
                </BrowserRouter>
            );

            expect(wrapper.find(UnLoggedInNavigation).length).toBe(1);
            expect(wrapper.find(LoggedInNavigation).length).toBe(0);
        });
        
        it('renders LoggedInNavigation when user token is present', ()=>{
            const wrapper = mount(
                <BrowserRouter>
                    <Navigation user={hasUser}/>
                </BrowserRouter>
            );

            expect(wrapper.find(UnLoggedInNavigation).length).toBe(0);
            expect(wrapper.find(LoggedInNavigation).length).toBe(1);
        });
    });
});

