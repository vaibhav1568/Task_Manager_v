/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const validator = require('validator');
const dbURL = dbConfigReader.loadConfig();

const UserModel = require('../model/user.js');

	mongoose.connect(dbURL, {useNewUrlParser : true},{useCreateIndex:true});
	
	const ObjectId = mongoose.Types.ObjectId;
	
	/**
	 * Example 1
	 */
	const user1 = new UserModel.User({_id= new ObjectId('5c816c16639fd41c6c859f8f')});
	user1.remove().then(()=>{
		console.log('User deleted.')
	}).catch((reason)=> {
		console.log('error deleting user '+reason);
	})
	
	/**
	 * Example 2
	 */
	
	
