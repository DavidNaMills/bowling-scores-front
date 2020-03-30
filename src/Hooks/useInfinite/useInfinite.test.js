import {renderHook, act} from '@testing-library/react-hooks';
import axios from '../../Axios/axiosConfig';
import MockAdapter from 'axios-mock-adapter';

import useInfinite from './useInfinite';
import Spinner from '../../Components/Spinner/Spinner';

const  moxios = new MockAdapter(axios);

const url = 'test';
const emptyLink = '?='
const zeroSkip = 0;
const zeroLimit = 0;
const items = [
    {_id: 1, name: 'test1'},
    {_id: 2, name: 'test2'},
    {_id: 3, name: 'test3'}
];
const base = 'http://localhost:7800/';


describe.skip('useInfinite test suite', ()=>{
    it('fetches when fetchItems is called. setProgress is set, items and skip count set', ()=>{
        // moxios.onGet(`${base}${url}/${zeroSkip}/${zeroLimit}${emptyLink}`)
        // .reply(200, {
        //     totalCount: 999,
        //     items
        // });
        // const {result} = renderHook(()=>useInfinite(moxios, url));

        // act(()=>{expect(result.items.length).toBe(0)});
    });
    
    it('items and skip count is reset', ()=>{});
    
    it('refreshes the items by fetching from api starting at 0', ()=>{});
    
    it('fetches from the backend using searchAll', ()=>{});
    
    describe('loadMoreBar tests', ()=>{
        it('returns <p> element stating no more items', ()=>{});
    
        it('returns <p> element asking if should load more games', ()=>{});
    
        it('fetches from the api when "load more games" is clicked', ()=>{});
    });

    describe('infiniteSearchBar', ()=>{
        it('returns a search bar: <div> with a label and an input', ()=>{});
    
        it('searchAll is fired when data is entered', ()=>{});
    });
    
    describe('searchResultsBar tests', ()=>{
        it('returns a <p> element stating "Displaying XXX of XX"', ()=>{});
    
        it('returns a <p> element stating "Displaying all records"', ()=>{});
    });
});