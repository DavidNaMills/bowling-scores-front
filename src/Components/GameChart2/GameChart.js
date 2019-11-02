import React from 'react';
import { Chart } from 'react-google-charts';

const GameChart = () => {

    return (
        <div>
            <Chart
                width={'100%'}
                height={'300px'}
                chartType='LineChart'
                loader={<div>Loading Chart</div>}
                data={[
                    ['x', 'David', 'Paul', 'Alan'],
                    [0, 0, 0, 34],
                    [1, 10, 5, 35],
                    [2, 23, 15, 24],
                    [3, 17, 9, 56],
                    [4, 50, 10, 80],
                    [5, null, null, 32],
                    [6, 23, 23, 3],
                    [7, 27, 19, 56],
                ]}
                options={{
                    legend: { position: 'bottom' },
                    chartArea:{left:10,top:10, bottom: 10,width:'95%',height:'100%'},
                    pointSize: 5,
                    series: {
                        0: { curveType: 'function', color: 'blue' },
                        1: { curveType: 'function', color: 'red' },
                        2: { curveType: 'function', color: 'green' },
                    },
                }}
            />
        </div>
    )
}

export default GameChart;