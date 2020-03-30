import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import classes from './useInfinite.module.scss';

import Spinner from '../../Components/Spinner/Spinner';


const useInfinite = (axios, url, locale) => {

    const [items, setItems] = useState([]);
    const [skip, setSkip] = useState(0);
    const [val, setVal] = useState('');
    const [link, setLink] = useState('?search=');
    const [infiniteLoading, setProgress] = useState(false);
    const totalRef = useRef(0);

    useEffect(() => {
        fetchItems();
    }, [link])


    const refresh = () => {
        const t = items.length;
        setProgress(true);
        axios({
            method: 'GET',
            url: `${url}/0/${t}${link}`
        })
            .then(res => {
                setProgress(false);
                setItems(res.data);
                setSkip(+res.data.length);
            })
            .catch(err => {
                setProgress(false);
                // console.log(err);
            })
    }

    const reset = useCallback(() => {
        setItems([]);
        setSkip(0);
    }, []);


    const searchAll = (e) => {
        const t = e.target.value;
        setVal(t);
        setItems([]);
        setSkip(0);
        let delayTimer;
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            setLink(`/?search=${t}`);
        }, 1000);
    }


    const fetchItems = (limit = 5) => {
        setProgress(true);
        axios({
            method: 'GET',
            url: `${url}/${skip}/${limit}${link}`
        })
            .then(res => {
                setProgress(false);
                if (res.data.totalCount) {
                    totalRef.current = res.data.totalCount;
                }
                setItems(prev => [...prev, ...res.data.items]);
                setSkip(prev => prev + +res.data.items.length);
                // setProgress(false);
            })
            .catch(err => {
                setProgress(false);
                // console.log(err);
            })
    }


    /**
     * JSX functions
     */

    const loadMoreBar = () => (
        items.length == +totalRef.current
            ? <p className={[classes.Infinite__more, classes.Infinite__more_finished].join(' , ')} >No more games to fetch</p>
            : <p className={[classes.Infinite__more, classes.Infinite__more_toFetch].join(' , ')} onClick={() => fetchItems()}>
                {infiniteLoading
                    ? <span className={classes.Infinite__spinner}><Spinner size={16}/></span>
                    : `load more games?`
                }
            </p>
    )

    const infiniteSearchBar = () => (
        <div className={classes.Infinite}>
            <label>search</label>
            <input value={val} onChange={e => searchAll(e)} className={classes.Infinite__input} />
        </div>
    )

    const searchResultsBar = () => {
        const msg = items.length == +totalRef.current
            ? <p className={classes.Infinite__results}>{`Displaying all games (${totalRef.current})`}</p>
            : <p className={classes.Infinite__results}>{`Displaying ${items.length} ${totalRef.current && `of ${isNaN(totalRef.current) ? 0 : totalRef.current}`} games`}</p>
        return msg
    }



    return {
        items,      //search results

        searchAll,      // search function
        fetchItems,     // standalone fetch items
        reset,          // reset all
        refresh,        // refreshes the current list

        infiniteLoading,    //for spinner

        loadMoreBar,        //jsx to display load more bar
        infiniteSearchBar,  //jsx search bar
        searchResultsBar    //jsx results count bar
    }
};

export default useInfinite;