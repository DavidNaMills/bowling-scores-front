import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {Redirect, BrowserRouter} from 'react-router-dom';
import Logout from './Logout';

jest.mock('../../Hooks/useDispatchHook/useDispatchHook');
import useDispatchHook from '../../Hooks/useDispatchHook/useDispatchHook';
import { useDispatch } from 'react-redux';

const mockLogoutDispatch = jest.fn();
useDispatchHook.mockImplementation(()=>({
    logoutUserDispatch: mockLogoutDispatch
}));

afterEach(()=>{
    mockLogoutDispatch.mockClear();
});

describe('<Logout/> test suite', ()=>{
    it('snaphot test', ()=>{
        const component = renderer.create(<BrowserRouter><Logout /></BrowserRouter>);
        const app = component.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('renders a <Redirect/> component', ()=>{
        const wrapper = mount(<BrowserRouter><Logout /></BrowserRouter>);
        expect(wrapper.find(Redirect).length).toBe(1);
        expect(mockLogoutDispatch).toHaveBeenCalledTimes(1);
    });
});