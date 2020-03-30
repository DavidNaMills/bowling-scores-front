import React, {useMemo} from 'react';
import classes from './Table.module.scss';
import Anime, { anime } from 'react-anime';


const Table = ({ caption = '', tableClass = classes.table, data, showRowNum = false, selectRow = () => { }, ...rest }) => {
    
    const renderRows = useMemo(() => {
        return data.rows.map((x, i) =>
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
    }, [data.rows]);

    const head = useMemo(()=>data.headers.map((x, i) =>
    <td key={i}>
        {x}
    </td>
    , 0), [data.headers]);

    return (<div>
        {caption && <p className={classes.caption}>{caption}</p>}
        <table className={tableClass}>
            <thead>
                <tr>
                    {showRowNum && <td></td>}
                    {head}
                </tr>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    </div>
)
            }

export default Table;