import pinfallSort from './pinfallSort';

//should sort the table items
const testData = [
    {id:123, values:['David', 123, 258]},
    {id:125, values:['David', 123, 300]},
    {id:128, values:['David', 123, 28]},
    {id:129, values:['David', 123, 301]},
    {id:130, values:['David', 123, 300]},
]

describe('pinfallSort test suite', ()=>{
    it('should sort the array by pinfall into ascending order', ()=>{
        const res = pinfallSort(testData);

        expect(res[0].id).toEqual(129);
        expect(res[1].id).toEqual(125);
        expect(res[2].id).toEqual(130);
        expect(res[3].id).toEqual(123);
        expect(res[4].id).toEqual(128);
    });
});