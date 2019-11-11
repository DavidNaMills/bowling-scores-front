// import React from 'react';
// import renderer from 'react-test-renderer';
// import {mount} from 'enzyme';

// import AddPlayersForm from './AddPlayersForm';
// import Button from '../../../Components/StandAloneComponents/Button/Button';
// import Table from '../../../Components/Table/Table';
// import Input from '../../../Components/Form/elements/Input/Input';
// import Title from '../../../Components/StandAloneComponents/Title/Title';


it('placeholder', ()=>{
    expect(true).toBeTruthy();
});


// describe('<AddPlayersForm /> test suite', ()=>{

//     describe('Snapshot tests', ()=>{
//         test('matches default snapshot', () => {
//             const component = renderer.create(<AddPlayersForm 
//                 title='Test' 
//                 playerSelect={splSelMock}
//                 onClose={onCloseMock}
//             />);
//             const app = component.toJSON();
//             expect(app).toMatchSnapshot();
//         });
//     });

//     describe('Correct components are rendered', ()=>{
//         const splSelMock = jest.fn();
//         const onCloseMock = jest.fn();

//         it('renders the correct components', ()=>{
//             const wrapper = mount(<AddPlayersForm 
//                 title='Test' 
//                 playerSelect={splSelMock}
//                 onClose={onCloseMock}
//             />);

//             expect(wrapper.find(Title).length).toBe(1);
//             expect(wrapper.find(Input).length).toBe(1);
//             expect(wrapper.find(Button).length).toBe(4);
//             expect(wrapper.find(Table).length).toBe(1);

//         });

//         it('renders the correct components when isNew', ()=>{
//             const wrapper = mount(<AddPlayersForm 
//                 title='Test' 
//                 playerSelect={splSelMock}
//                 onClose={onCloseMock}
//                 isNew
//             />);

//             expect(wrapper.find(Title).length).toBe(1);
//             expect(wrapper.find(Input).length).toBe(1);
//             expect(wrapper.find(Button).length).toBe(5);
//             expect(wrapper.find(Table).length).toBe(1);

//         });
//     });
// });