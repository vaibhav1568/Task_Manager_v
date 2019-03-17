var callMeBack = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    //resolve('Success'+[3,4,5]);
    reject('Rejected');
  },2000)
});

callMeBack.then((success)=>{
  console.log(success);
}).catch((reject)=>{
  console.log(reject);
})

