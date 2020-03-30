import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import SelectAnonPlayer from './SelectAnonPlayer';
import Title from '../../../Components/StandAloneComponents/Title/Title';
import Table from '../../../Components/Table/Table';
import Button from '../../../Components/StandAloneComponents/Button/Button';


const tempData = {
    createdAt: "2020-01-08T06:22:59.878Z",
    games: {
        1: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 12 } },
        2: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 24 } },
        3: { 'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", score: 154 } },
    },
    players: {
        'debb53c3-ad2a-4093-b89b-2a5025416f6c': { name: "gfdgfds", color: "17, 127, 14", id: "debb53c3-ad2a-4093-b89b-2a5025416f6c" }
    },
    _id: "123789456123abc"
}

const mockPlayerSelect = jest.fn();

const props = {
    game: tempData,
    playerSelect: mockPlayerSelect
}

describe('<SelectAnonPlayer /> component test suite', () => {
    it('matches the snapshot', () => {
        const comp = renderer.create(<SelectAnonPlayer {...props}/>);
        const app = comp.toJSON();
        expect(app).toMatchSnapshot();
    });


    const wrapper = mount(<SelectAnonPlayer {...props}/>);

    it('exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should contain 2 <Title /> components', () => {
        const ttl = wrapper.find(Title);
        expect(ttl.length).toBe(1);

    });

    it('should contain a <Table /> component', ()=>{
        const tbl = wrapper.find(Table);
        expect(tbl.length).toBe(1);
        expect(wrapper.find('tr').length).toBe(2)
    });

    it('should contain 2 <Button/> components', ()=>{
        const btn = wrapper.find(Button);
        expect(btn.length).toBe(2);
    });
});