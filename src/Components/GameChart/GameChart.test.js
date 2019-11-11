import React from 'react';
import { mount } from 'enzyme';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import GameChart from './GameChart';


const players = {
    '1ad602da-92de-417e-86f6-3cd1d84bc328':
    {
        name: "cxz",
        color: "233, 80, 237",
        id: '123123'
    },
    '28357764-b73e-4ab8-b672-63c62db64d1d':
    {
        name: "tyre",
        color: "103, 58, 183",
        id: "28357764-b73e-4ab8-b672-63c62db64d1d"
    }
}


const data = {
    data: [
        { game: "1", tyre: 254, cxz: 122 },
        { game: "2", tyre: 1 },
        { game: "3", tyre: 1, cxz: 11 }
    ],
    players: ["28357764-b73e-4ab8-b672-63c62db64d1d", "1ad602da-92de-417e-86f6-3cd1d84bc328"]
}


const testArray = [
    {
        msg: 'Contains a <LineChart /> component',
        comp: LineChart,
        length: 1
    },
    {
        msg: 'Contains a <CartesianGrid /> component',
        comp: CartesianGrid,
        length: 1
    },
    {
        msg: 'Contains a <Tooltip /> component',
        comp: Tooltip,
        length: 1
    },
    {
        msg: 'Contains a <Line /> component',
        comp: Line,
        length: data.players.length
    },
]


describe('<GameChart /> test suite', () => {
    const wrapper = mount(<GameChart players={players} data={data}/>);
    
    testArray.forEach(x=>{
        it(`${x.msg}`, () => {
            expect(wrapper.find(x.comp).length).toBe(x.length);
        })
    });

});