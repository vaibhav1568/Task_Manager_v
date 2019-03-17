/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const validator = require('validator');
const dbURL = dbConfigReader.loadConfig();
const UserModel = require('../model/user.js');

	mongoose.connect(dbURL, {useNewUrlParser : true,useCreateIndex:true});
	
	const user = new UserModel.User({
		"user": "Minu",
		"email": "gxyz@xy.com"
	});
	
	user.save().then(()=>{
		console.log('Successfully Saved Task.');
	}).catch((error)=>{
		console.log('Error saving task. '+error);
	})
	
	

