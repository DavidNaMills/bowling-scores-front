import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const data = [
    {game: 1, david: 258, paul: 100, mike: 123,},
    {game: 2, david: 174, mike: 167},
    {game: 3, david: 158, paul: 120, mike: 196},
    {game: 4, david: 258, paul: 100, mike: 123},
    {game: 5, david: 174, paul:250, mike: 167},
    {game: 6, david: 158, paul: 120, mike: 196},
    {game: 7, david: 258, paul: 100, mike: 123},
    {game: 8, david: 174, paul: 42, mike: 167},
    {game: 9, david: 158, paul: 120, mike: 196},
    {game: 10, paul: 100, mike: 123},
    {game: 11, david: 174, paul:250, mike: 167},
    {game: 12, david: 158, paul: 120, mike: 196}
];




const GameChart = () => {

    return (
        <div>
            <LineChart
                width={380}
                height={350}
                data={data}
                margin={{
                    top: 5, right: 5, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" width={40}/>
                <YAxis width={40}/>
                <Tooltip />
                <Line type="monotone" dataKey="david" stroke="#5c8df7" fill="#5c8df7" activeDot={{ r: 9 }} />
                <Line type="monotone" dataKey="paul" stroke="#f75c8a" fill="#f75c8a" activeDot={{ r: 9 }} />
                <Line type="monotone" dataKey="mike" stroke="#83f75c" fill="#83f75c" activeDot={{ r: 9 }} />
            </LineChart>
        </div>
    )
};

export default GameChart;