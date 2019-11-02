import React from 'react';
import { Chart } from 'react-google-charts';
import classes from './GameTable.module.scss';

const GameTable = () => {

    const chartEvents = [
        {
            eventName: "select",
            callback({ chartWrapper }) {
                console.log("Selected ", chartWrapper.getChart().getSelection());
            }
        }
    ];

    const cssClassNames = {
        tableRow  : 'background-color: blue;'
    }

    const tempS = {
        backgroundColor: 'blue'
    }

    return (
        <div>
            <p>Click on name to view</p>
            <Chart
                chartType="Table"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        { type: 'string', label: 'Name' },
                        { type: 'number', label: 'Pin fall' },
                        { type: 'number', label: 'Average' },
                        { type: 'number', label: 'up/down' },
                    ],

                    [`<span style={${tempS}>Mike</span>`, 1235, 184, '+2'],
                    ['David', 1000, 134, '-1'],
                    ['Paul', 987, 179, '-1'],
                ]}
                options={{
                    allowHtml: true,
                    sort: 'disable',
                    showRowNumber: true,
                    width: '100%',
                    height: '100%',
                    colors: ["#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39"],
                }}
                chartEvents={chartEvents}
            />
        </div>

    )
}

export default GameTable;