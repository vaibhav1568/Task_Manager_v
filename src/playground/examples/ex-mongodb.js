
const {MongoClient,ObjectID} = require('mongodb'); // Object destructuring...
const connectionURL = "mongodb://localhost:27017/test?retryWrites=true";
const dbName = 'task-manager';


MongoClient.connect(connectionURL, {userNewUrlParser:true}, (error, client) =>{
  if(error){
    return console.log('Unable to connect to Db');
  }
  console.log('Connected...');
  const db = client.db(dbName);

  // db.collection('users').findOne({name:'Navdeep'},(error,user)=>{
  //   if(error){
  //     return console.log('Unable to fetch user');
  //   }
  //   console.log(user);
  //
  // });
// Insert code:

db.collection('users').insertOne({
  name:'minu',
  age:29
},(error, result)=>{
  if(error){
    return console.log('Unable to insert user');
  }
  console.log(result.ops);
})


// db.collection('tasks').insertMany([
//   {
//     description:'First',
//     completed:true
//   },{
//     description:'Second',
//     completed:false
//   },{
//     description:'Third',
//     completed:true
//   }],
//   (error, result)=>{
//     if(error){
//       return console.log('Unable to insert users');
//     }
//     console.log(result.ops);
//   })


// Find code

  // db.collection('users').find({age:29}).toArray((error,users)=>{
  //   console.log(users);
  // })

  // db.collection('tasks').findOne({_id:ObjectID("5c803a692dde1830cce724ef")},(error,task)=>{
  //   if(error){
  //     return console.log('Unable to fetch task');
  //   }
  //   console.log(task);
  // });

  // db.collection('tasks').find({completed:true}).toArray((error,tasks)=>{
  //   if(error){
  //     return console.log('Unable to fetch tasks via array');
  //   }
  //   console.log(tasks);
  // });

  // update & delete code

  // const updateCall = db.collection('users').updateOne({_id:ObjectID("5c803645c296ce3ab4f9f399")}, {
  //    $set: { name:'Reyansh' }, $inc:{age:-23}
  // });
  //
  //   updateCall.then((result)=>{
  //     console.log("updated..");
  //   }).catch((error)=>{
  //     console.log(error);
  //   });

    // const deleteCall = db.collection('users').deleteOne({_id:ObjectID("5c8038abcd08672108798f13")});
    //
    //   deleteCall.then((result)=>{
    //     console.log("deleted..");
    //   }).catch((error)=>{
    //     console.log(error);
    //   });

})
