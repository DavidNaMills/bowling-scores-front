import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from './Button';


describe('Button component test suite', () => {
    const testLabel = 'Test label';

    describe('snapshot test suite', () => {
        test('matches default snapshot', () => {
            const component = renderer.create(<Button type='default' label={testLabel} />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });

        test('matches default snapshot with full width', () => {
            const component = renderer.create(<Button type='default' label={testLabel} isFull />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });

        test('matches warning snapshot', () => {
            const component = renderer.create(<Button type='warning' label={testLabel} />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });

        test('matches danger snapshot', () => {
            const component = renderer.create(<Button type='danger' label={testLabel} />);
            const app = component.toJSON();
            expect(app).toMatchSnapshot();
        });
    });

    describe('style test suite', () => {
        const testArray = [
            {
                msg: 'default',
                type:'',
                clsNme: 'button__default'
            },
            {
                msg: 'danger',
                type: 'danger',
                clsNme: 'button__danger'
            },
            {
                msg: 'warning',
                type: 'warning',
                clsNme: 'button__warning'
            },
            {
                msg: 'light green',
                type: 'lightgreen',
                clsNme: 'button__lightGreen'
            },
            {
                msg: 'dark green',
                type: 'darkgreen',
                clsNme: 'button__darkGreen'
            },
            {
                msg: 'blue',
                type: 'blue',
                clsNme: 'button__blue'
            },
            {
                msg: 'light Blue',
                type: 'lightblue',
                clsNme: 'button__lightBlue'
            },
            {
                msg: 'dark blue',
                type: 'darkblue',
                clsNme: 'button__darkBlue'
            },
            {
                msg: 'light red',
                type: 'lightred',
                clsNme: 'button__lightRed'
            },
            {
                msg: 'light yellow',
                type: 'lightyellow',
                clsNme: 'button__lightYellow'
            }
        ]

        testArray.forEach(x => {
            it(`should add the ${x.msg} className`, () => {
                const wrapper = shallow(<Button label={testLabel} type={x.type}/>);
                const btn = wrapper.find('button');

                expect(btn.hasClass(x.clsNme)).toBe(true);
                expect(btn.text()).toEqual(testLabel);
            });
        });



    it('should disable the button', () => {
        const wrapper = shallow(<Button label={testLabel} type='danger' isDisabled />);
        const btn = wrapper.find('button');

        expect(btn.hasClass('button__disabled')).toBe(true);
        expect(btn.props().disabled).toBeTruthy();
    })

    it('should apply full width to the button', () => {
        const wrapper = shallow(<Button label={testLabel} type='danger' isFull />);
        const btn = wrapper.find('button');

        expect(btn.hasClass('button__isFull')).toBeTruthy();
    })

});

describe('behvioural test suite', () => {
    it('should simulate the button click', () => {
        const mockCall = jest.fn();
        const wrapper = shallow(<Button click={mockCall} label={testLabel} type='DaNgEr' />);
        const btn = wrapper.find('button');
        btn.simulate('click');

        expect(mockCall.mock.calls.length).toBe(1);
    })
})

})