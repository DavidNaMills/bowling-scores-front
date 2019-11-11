import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Table from './Table';
import classes from './Test.module.scss';


const tHeaders = ['name', 'Average', 'Pinfall', 'Rank'];

const baseData = [
    {
        id: '',
        values: ['david', 135, 2445, '+ 2'],
        style: {}
    },
    {
        id: '5vd5f3d5cvx3cv5xz53xcz',
        values: ['alan', 189, 2222, '-2'],
        style: {}
    }
]

const tData = [
    {
        id: '',
        values: ['david', 135, 2445, '+ 2'],
        style: { trow: classes.testRowClass }
    },
    {
        id: '5vd5f3d5cvx3cv5xz53xcz',
        values: ['alan', 189, 2222, '-2'],
        style: { trow: { color: 'red' } }
    }
];


const testData = {
    headers: tHeaders,
    rows: tData
}

const testCaption = 'Test label';


describe('<Table /> test suite', () => {

    describe('Snapshot test suite', () => {
        test('matches snapshot with default values', () => {
            const component = renderer.create(<Table data={{
                headers: tHeaders,
                rows: baseData
            }} />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });

        test('matches snapshot with optional features added', ()=>{
            const component = renderer.create(<Table 
                data={testData}
                showRowNum
            />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();   
        })
    });

    describe('creation test suite', () => {
        const wrapper = shallow(<Table data={{headers: tHeaders, rows: baseData}} />);

        it('renders a table element', () => {
            const tbl = wrapper.find('table');
            expect(tbl.length).toBe(1);
        });

        it('creates 5 headings', () => {
            const hdr = wrapper.find('thead').find('td');
            const tr = wrapper.find('thead');

            expect(wrapper.find('p').length).toBe(0);
            expect(hdr.length).toBe(tHeaders.length);
            expect(hdr.at(0).text()).toEqual(tHeaders[0]);
            expect(hdr.at(1).text()).toEqual(tHeaders[1]);
            expect(hdr.at(2).text()).toEqual(tHeaders[2]);
            expect(hdr.at(3).text()).toEqual(tHeaders[3]);
            expect(tr.length).toBe(1);
        });

        it('creates 2 rows of table data', () => {
            const tbody = wrapper.find('tbody');
            const tr = wrapper.find('tbody').find('tr');
            const td = wrapper.find('tbody').find('td');

            expect(tbody.length).toBe(1);
            expect(tr.length).toBe(2);
            expect(td.length).toBe(8);
            expect(td.at(0).text()).toEqual('david');
            expect(td.at(4).text()).toEqual('alan');
        });

    });

    describe('styling ', () => {
        //table
        it('adds the default class to the table', () => {
            const wrapper = shallow(<Table data={testData} />);
            expect(wrapper.find('.table').length).toBe(1);
        });

        it('adds a custom class <as String> to the table', () => {
            const wrapper = shallow(<Table data={testData} tableClass={classes.testTable} />);
            expect(wrapper.find(`.${classes.testTable}`).length).toBe(1);
        });

        it('adds a custom className <string> to a specific row', () => {
            const wrapper = shallow(<Table data={testData} />);
            const tr = wrapper.find('tr');
            expect(tr.at(1).find(`.${classes.testRowClass}`).length).toBe(1);

        });

        it('adds a custom inline style to a specific row', () => {
            const wrapper = shallow(<Table data={testData} />);
            const tr = wrapper.find('tr');
            expect(tr.at(2).prop('style')).toHaveProperty('color', 'red');
        });

    });

    describe('options test suite', () => {
        it('contains a <p> tag', ()=>{
            const wrapper = shallow(<Table caption={testCaption} data={testData} />);
            expect(wrapper.find('p').length).toBe(1);
            expect(wrapper.find('p').at(0).text()).toEqual(testCaption);

        });

        it('should display the row number starting at 0', () => {
            const wrapper = shallow(<Table data={testData} showRowNum />);
            const td = wrapper.find('tbody').find('td');

            expect(td.length).toBe(10);
            expect(td.at(0).text()).toEqual('1');
            expect(td.at(5).text()).toEqual('2');
        });

        it('should return the row number of click', () => {
            const mockFn = jest.fn();
            mockFn.mockReturnValue(testData.rows[0].id ? testData.rows[0].id : 1);
            const wrapper = shallow(<Table data={testData} selectRow={mockFn} />);
            wrapper.find('tbody').find('tr').at(0).simulate('click');
            expect(mockFn).toHaveBeenCalled();
            expect(mockFn.mock.results[0].value).toBe(1);
        });

        it('should return the ID supplied when row is clicked', () => {
            const mockFn = jest.fn();
            const wrapper = shallow(<Table data={testData} selectRow={mockFn} />);
            mockFn.mockReturnValue(testData.rows[1].id ? testData.rows[1].id : 1);
            wrapper.find('tbody').find('tr').at(1).simulate('click');
            expect(mockFn).toHaveBeenCalled();
            expect(mockFn.mock.results[0].value).toBe(testData.rows[1].id);
        });
    });

})