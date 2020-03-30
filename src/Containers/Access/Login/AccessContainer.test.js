
it.skip('placeholder', ()=>{
    expect(true).toBeTruthy();
});

// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import {act} from 'react-dom/test-utils'
// import renderer from 'react-test-renderer';

// import loginFormConfig from '../../../formConfigs/loginFormConfig';
// import AccessContainer from './';
// import Title from '../../Components/StandAloneComponents/Title/Title'
// import Button from '../../Components/StandAloneComponents/Button/Button'
// import Input from '../../Components/Form/elements/Input/Input'

// const theTitle = 'Test Title';


// describe('<AccessContainer/> test suite', ()=>{
//     describe('Snapshot test suite', ()=>{
//         test('should match the snapshot', ()=>{
//             const component = renderer.create(<AccessContainer formConfig={loginFormConfig} title={theTitle}/>);
//             const app = component.toJSON();
//             expect(app).toMatchSnapshot();
//         })
//     })
    
//     describe('Layout and rendering test suite', ()=>{

//         it('should render Title, 2 Inputs and 2 Buttons', ()=>{
//             const wrapper = mount(<AccessContainer formConfig={loginFormConfig} title={theTitle}/>);
//             const title = wrapper.find(Title);
//             const btns = wrapper.find(Button);
//             const inp = wrapper.find(Input);

//             expect(title.length).toBe(1);
//             expect(title.text()).toBe(theTitle);
//             expect(btns.length).toBe(2);
//             expect(inp.length).toBe(2)
//         });

//         //show spinner
//         //show error messages
//     }) 
// });

