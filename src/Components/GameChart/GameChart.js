import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



const GameChart = ({players, data}) => {
    return (
        <div>
            <LineChart
                width={380}
                height={350}
                data={data.data}
                margin={{
                    top: 5, right: 5, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" width={40}/>
                <YAxis width={40}/>
                <Tooltip />
                {
                    data.players.map(x=>
                        <Line type="monotone" dataKey={players[x].name} stroke={`rgb(${players[x].color})`} fill={`rgb(${players[x].color})`} activeDot={{ r: 9 }} />
                    )
                }
            </LineChart>
        </div>
    )
};

export default GameChart;