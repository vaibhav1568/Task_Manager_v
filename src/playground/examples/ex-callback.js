var callMeBack = (callback)=>{
  setTimeout(()=>{
    //console.log('Hi');
    //return callback(undefined,'success')
    return callback('error',undefined);
  },2000);
}

callMeBack((error,success)=>{
  if(error){
    return console.log(error);
  }
  console.log(success);
})
