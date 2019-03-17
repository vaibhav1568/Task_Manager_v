/**
 * http://usejsdoc.org/
 */

const express = require('express');
const {User} = require('../model/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users/login',async(req,res)=>{
	
	try{
		//calling our own static defined method.
	 const user = await User.findByCredentials(req.body.email,req.body.password);
	 const token = await user.generateAuthToken();
	 
	 res.send({user,token});
	}catch(e){
		res.status(400).send(e);
	}
})

router.post('/users/logout',auth, async(req,res)=>{
	
	try{
		//will remove the filter from tokens array
		req.user.tokens = req.user.tokens.filter((token)=>{
			return token.token != req.token;
		})	
		
		await req.user.save();	
		res.status(200).send();
		
	}catch(e){
		res.status(500).send(e);
	}
})


router.post('/users/logoutAll',auth, async(req,res)=>{
	
	try{
		//will remove the filter from tokens array
		req.user.tokens = [];
		await req.user.save();	
		res.status(200).send();
	}catch(e){
		res.status(500).send(e);
	}
})

router.post('/users',async(req,res)=>{
	const user = new User(req.body);
	try{
	  await user.save();
	  const token = await user.generateAuthToken();
	 res.status(201).send({user,token});
	}catch(e){
		res.status(400).send(e);
	}
})

router.get('/users/me',auth,async(req, res)=>{
	//await req.user.populate('tasks').execPopulate();
	//console.log(req.user.tasks);
	res.send(req.user);
		
})
//
//router.get('/users/:id',async(req, res)=>{
//	const _id = req.params.id;
//	
//	try{
//	
//		const user = await(User.findById(_id));
//		if(!user){
//			return res.status(404).send();
//		}
//		res.send(user);
//	}catch(error){
//		res.status(500).send(error);
//	}
//})

router.patch('/users/me',auth, async(req, res)=>{
	const allowedUpdates = ['name','email','password'];
	const updates = Object.keys(req.body);
	
	const isValidOperation = updates.every((key)=>{
		return allowedUpdates.includes(key);
	});
	if(!isValidOperation){
		return res.status(400).send('{"error": "Invalid Updates"}');
	}
	try{
		
		//const user = await User.findById(req.params.id);
		updates.forEach((update)=>{
			req.user[update] = req.body[update];
		})
		await req.user.save();
		
		//Below call is a direct call with mongodb method. its by passing mongoose middleware.
		//const user = await (User.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true }));
		
		res.status(200).send(req.user);
	}catch(error){
		res.status(400).send(error);
	}
});

router.delete('/users/me',auth,async(req,res)=>{
	
	try{
//		const user = await( User.findByIdAndDelete(req.params.id));
//		
//		if(!user){
//			res.status(404).send('"error":"Invalid Delete"');
//		}
		await req.user.remove();
		res.send(req.user);
	}catch(e){
		res.status(400).send();
	}
})

module.exports = router;