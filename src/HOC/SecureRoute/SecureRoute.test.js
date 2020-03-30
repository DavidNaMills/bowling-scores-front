import React from 'react';
import {mount, render} from 'enzyme';
import renderer from 'react-test-renderer';
import {Route, Redirect, BrowserRouter} from 'react-router-dom';
import SecureRoute from './SecureRoute';


jest.mock('react-redux');
import {useSelector} from 'react-redux';

const mockToken = '45fg6dbd3b4v56c';
const TestComp = () =>(<div><p>test comp</p></div>);

afterEach(()=>{
    jest.clearAllMocks();
});

describe('SecureRoute test suite', ()=>{
    it('exists', ()=>{
        useSelector.mockImplementation(()=>(mockToken));
        const wrapper = mount(<BrowserRouter><SecureRoute component={TestComp}/></BrowserRouter>);
        expect(wrapper.exists).toBeTruthy();
        expect(wrapper.find(Route).length).toBe(1);
    })
    
    it('matches snapshot', ()=>{
        useSelector.mockImplementation(()=>(mockToken))
        const comp = renderer.create(<BrowserRouter><SecureRoute component={TestComp}/></BrowserRouter>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    })
    
    it('renders the component if token is present in the store', ()=>{
        useSelector.mockImplementation(()=>(mockToken))
        const wrapper = mount(<BrowserRouter><SecureRoute component={TestComp}/></BrowserRouter>);
        expect(wrapper.find(TestComp).length).toBe(1);
    })
    
    it('renders redirect if token in not present', ()=>{
        useSelector.mockImplementation(()=>(null))
        const wrapper = mount(<BrowserRouter><SecureRoute component={TestComp}/></BrowserRouter>);
        expect(wrapper.find(Redirect).length).toBe(1);
    })
});