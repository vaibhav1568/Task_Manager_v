const {calculateAdd,calculateMinus,calculateTip} = require('./math');


test('validate add',()=>{
    const sum = calculateAdd(4,5)
    if(sum!= 9){
        throw new Error('Sum Failed',sum);
    }
})


test('validate minus',()=>{
    const minus = calculateMinus(5,3)
    if(minus!=2){
        throw new Error('Minus result is not matched.');
    }
})

test('validate tip 1',()=>{
    const tip = calculateTip(10,.3)
    expect(tip).toBe(13);
    // if(tip!=13){
    //     throw new Error('Tip result is not matched.',tip);
    // }
})

test('validate tip 2',()=>{
    const tip = calculateTip(20)
    expect(tip).toBe(24);
    // if(tip!=13){
    //     throw new Error('Tip result is not matched.',tip);
    // }
})


