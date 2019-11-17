import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {Redirect, BrowserRouter} from 'react-router-dom';
import Logout from './Logout';

describe('<Logout/> test suite', ()=>{
    it('placeholder test', ()=>{
        expect(true).toBeTruthy();
    });
    // it('snaphot test', ()=>{
    //     const component = renderer.create(<BrowserRouter><Logout /></BrowserRouter>);
    //     const app = component.toJSON();
    //     expect(app).toMatchSnapshot();
    // });

    // it('renders a <Redirect/> component', ()=>{
    //     const wrapper = mount(<BrowserRouter><Logout /></BrowserRouter>);
    //     expect(wrapper.find(Redirect).length).toBe(1);
    // });
});