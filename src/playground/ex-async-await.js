const dbConfigReader = require('../db/dbConfigReader.js');
const mongoose = require('mongoose');
const dbURL = dbConfigReader.loadConfig();

mongoose.connect(dbURL, {useNewUrlParser : true,
						useCreateIndex:true,
						useFindAndModify:false});


//const UserModel = require('../model/user.js');
//var updateAndCount = async(id,email)=>{
//		const user = await(UserModel.User.findByIdAndUpdate(id,{email}));
//		const count = await(UserModel.User.countDocuments({email}));
//		return count;
//}
//updateAndCount("5c842deaaebfb5cff40927dc","donky@gmail.com").then((result)=>{
//	return console.log(result);
//}).catch((error)=>{
//	return console.log(error)
//});


const TaskModel = require('../model/task.js');

var deleteAndCount = async(id,duration)=>{
	await(TaskModel.Task.findByIdAndDelete(id));
	const count = await(TaskModel.Task.countDocuments({duration}));
	return count;
}

deleteAndCount("5c843315d021755e040d5ab2",51).then((result)=>{
	return console.log(result);
}).catch((error)=>{
	return console.log(error)
});