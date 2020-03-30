import React, {useMemo} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


const GameChart = ({players, data, width=380, height=350}) => {
    return (
            <LineChart
                width={width}
                height={height}
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
                    useMemo(()=>data.players.map((x,i)=>{
                        return <Line 
                            key={i} 
                            type="monotone" 
                            dataKey={players[x].name} 
                            stroke={`rgb(${players[x].color})`} 
                            fill={`rgb(${players[x].color})`} 
                            activeDot={{ r: 9 }} 
                        />
                    }
                    ), [data.data])
                }
            </LineChart>
    )
};

export default GameChart;