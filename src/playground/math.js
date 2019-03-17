const calculateAdd = (val1, val2)=>{
    return val1+val2;
}

const calculateMinus = (val1, val2)=>{
    return val1-val2;
}

const calculateTip = (bill, tipPercent=.2)=>{
    return bill*tipPercent + bill;
}

module.exports = {
    calculateAdd,
    calculateMinus,
    calculateTip
}