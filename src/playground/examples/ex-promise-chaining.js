var add = (a,b)=>{

  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(a+b);
    },2000)
  })
}

/* promise chaining traditional way
add(3,4).then((sum)=>{
  console.log(sum);
  add(sum,6).then((sum1)=>{
    console.log(sum1);
  }).catch((e)=>{
    console.log(e);
  })
}).catch((e)=>{
  console.log(e);
})*/

//Promise chaining... clean way
add(3,4).then((sum)=>{
  console.log(sum);
  return add(sum,6);
}).then((sum1)=>{
  console.log(sum1);
}).catch((e)=>{
  console.log(e);
})
