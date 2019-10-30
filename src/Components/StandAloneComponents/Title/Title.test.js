import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import Title from './Title';

const testObject = [
    {
        msg: 'should display the correct message with type MAIN',
        snap: '<Title/> type MAIN snapshot test',
        theType: 'main',
        size: 'h1',
        className: 'title__main'
    },
    {
        msg: 'should display the correct message with type SECTION',
        snap: '<Title/> type SECTION snapshot test',
        theType: 'section',
        size: 'h2',
        className: 'title__section'
    },
    {
        msg: 'should display the correct message with type SUB',
        snap: '<Title/> type SUB snapshot test',
        theType: 'sub',
        size: 'h3',
        className: 'title__sub'
    },
    
]

describe('<Title/> component test suite', ()=>{
    const testLabel = 'Bowling Scores';

    describe('Title snapshot tests', ()=>{
        testObject.forEach(x=>{
            test(x.snap, ()=>{
                const component = renderer.create(<Title label={testLabel} ttleType={x.theType}/>);
                const app = component.toJSON();
                expect(app).toMatchSnapshot();
            })
        });
    })
    
    describe('Title styling tests', ()=>{
        testObject.forEach(x=>{
            it(x.msg, ()=>{
                const app = shallow(<Title label={testLabel} ttlType={x.theType}/>)
                const ttl = app.find(x.size);
                expect(ttl.length).toBe(1);
                expect(ttl.text()).toEqual(testLabel);
                expect(ttl.hasClass(x.className)).toBeTruthy();
            })
        });    
    })

})