import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const TestApp = () =>(
    <div>
        <p>Test Component!!!</p>
    </div>
)

describe('canary test', ()=>{
    it('basic test', ()=>{
        expect(true).toBeTruthy();
    });

    test('Canary snapshot test', ()=>{
        const component = renderer.create(<TestApp/>);
        const app = component.toJSON();
        expect(app).toMatchSnapshot();
    });

    it('enzyme canary test', ()=>{
        const app = shallow(<TestApp/>);
        expect(app.find('p').length).toEqual(1);
    })
})