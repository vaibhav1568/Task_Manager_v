/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const dbURL = dbConfigReader.loadConfig();

mongoose.connect(dbURL, {useNewUrlParser : true,
						useCreateIndex:true,
						useFindAndModify:false});
	


//const UserModel = require('../model/user.js');
//UserModel.User.findByIdAndUpdate("5c827abe2332513a9832342b", {email:"dummyEmail@gmail.com"})
//.then((user)=>{
//	console.log("updated"+user);
//	return UserModel.User.countDocuments({email:"dummyEmail@gmail.com"})
//}).then((userCount)=>{
//	console.log(userCount);
//}).catch((e)=>{
//	console.log("Failed to update");
//})

const TaskModel = require('../model/task.js');

TaskModel.Task.findByIdAndDelete("5c82cdc4db1084bd6c6bf5da").then((task)=>{
	
	console.log(task);
	return TaskModel.Task.countDocuments({duration:23}) 
}).then((count)=>{
	console.log(count);
}).catch((e)=>{
	console.log(e);
})
