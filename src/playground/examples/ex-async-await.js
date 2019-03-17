var sum = (a,b)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(a+b);
    },2000)
  })
}

var doWork = async()=>{
    var sum1 = await(sum(2,4));
    console.log(sum1);
    var sum2 = await(sum(sum1,1));
    return sum2;
}// async returns a promise always
//await take care of async call and convert them to synch. and no worry of putting promise chaining code.


doWork().then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});
