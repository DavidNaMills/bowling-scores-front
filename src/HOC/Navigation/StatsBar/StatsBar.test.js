import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import StatsBar from './StatsBar';


const stats = {
    average: 456,
    ttlGames: 11111
}

describe('<StatsBar /> component test suite', ()=>{
    it('snapshot test', ()=>{
        const comp = renderer.create(<StatsBar stats={stats}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });

    const wrapper = shallow(<StatsBar stats={stats}/>);

    it('component exists in the DOM', ()=>{
        expect(wrapper.exists()).toBeTruthy();
    });


    it('contains a <div> with StatsBar className', ()=>{
        const div = wrapper.find('div');
        expect(div.length).toBe(1);
        expect(div.props().className).toEqual('StatsBar');
    });
    
    it('<div> contains 2 <p> tags which contain the Average and Games Played', ()=>{
        const p = wrapper.find('div').find('p');
        expect(p.length).toBe(2);
        expect(p.at(0).text()).toEqual(`Average: ${stats.average}`);
        expect(p.at(1).text()).toEqual(`Games Played: ${stats.ttlGames}`);
    });
});
