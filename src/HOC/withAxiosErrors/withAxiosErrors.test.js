import React from 'react';
import {act} from 'react-dom/test-utils';
import {mount} from 'enzyme';
import mockAxios from '../../Axios/axiosConfig';
import MockAdapter from "axios-mock-adapter";
import thunk from 'redux-thunk';

import ErrorMessage from '../../Components/StandAloneComponents/ErrorMessage/ErrorMessage';
import withAxiosErrors from './withAxiosErrors';


window.scrollTo = jest.fn();

const TestComp = () => (<div><p>Test</p></div>);
const Wrapped = withAxiosErrors(TestComp, mockAxios);
let moxios;

beforeEach(()=>{
    moxios = new MockAdapter(mockAxios);
});

afterEach(()=>{
    jest.clearAllMocks();
})


// FIXME: change to a hook that dispatches a message type. listener to display errors

describe('withAxiosErrors HOC test suite', ()=>{
    
    it('renders the child components', ()=>{
        const wrapper = mount(<Wrapped />);
        expect(wrapper.find(TestComp).length).toBe(1);
    });
    
    it('ignores any 2XX status codes', ()=>{});
    
    it('displays the ErrorMessage component with message: "Invalid Username or Password" if 401 && cutStr==="login"', ()=>{});

    it('displays the ErrorMessage component with message: "Unauthorized" if 401', async()=>{
        let wrapper;
        await act(async ()=>{
            moxios.onAny().reply(401, {});
            await mockAxios.get('www.test.com');
        })
        wrapper = mount(<Wrapped />);
        // console.log(wrapper);
        const msg = wrapper.find(ErrorMessage);
        expect(msg.length).toBe(1);
    });
    
    it('displays the ErrorMessage component with message: "Username has been taken" if 409', ()=>{});
    
    it('displays the ErrorMessage component with message: "Something has went wrong" if 500', ()=>{});
    
    it('displays the data.message as default', ()=>{});
});