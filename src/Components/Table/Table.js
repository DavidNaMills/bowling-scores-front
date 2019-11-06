import React from 'react';
import classes from './Table.module.scss';

const Table = ({ caption = '', tableClass = classes.table, data, showRowNum = false, selectRow = () => { }, ...rest }) => (
    <div>
        {caption && <p className={classes.caption}>{caption}</p>}
        <table className={tableClass}>
            <thead>
                <tr>
                {showRowNum && <th></th>}
                {data.headers.map((x, i) =>
                    <td key={i}>
                        {x}
                    </td>
                    , 0)}
                </tr>
            </thead>
            <tbody>
                {
                    data.rows.map((x, i) =>
                        <tr
                            key={i}
                            className={x.style && typeof (x.style.trow) === 'string' ? x.style.trow : ''}
                            style={x.style && typeof (x.style.trow) === 'object' ? x.style.trow : {}}
                            onClick={() => selectRow(x.id ? x.id : i + 1)}
                        >
                            {showRowNum && <td key={`${i}0`}>{i + 1}</td>}
                            {
                                x.values.map((y, o) =>
                                    <td key={`${i}-${o}`}>
                                        {y}
                                    </td>
                                    , 1)
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
)

export default Table;

// const tHeaders = ['name', 'Average', 'Pinfall', 'Rank'];
// const tData = [
//     {
//         id: '',
//         values: ['david', 135, 2445, '+ 2'],
//         style: { tr: classes.testRowClass }  //optional
//     },
//     {
//         id: '5vd5f3d5cvx3cv5xz53xcz',
//         values: ['alan', 189, 2222, '-2'],
//         style: { trow: { color: 'red' } }  //optional
//     }
// ];