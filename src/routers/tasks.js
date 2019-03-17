/**
 * http://usejsdoc.org/
 */
const express = require('express');
const {Task} = require('../model/task');
const auth = require('../middleware/auth');

const router = new express.Router();


router.post('/tasks',auth, async(req,res)=>{
	const task = new Task({
		...req.body,
		owner : req.user._id
		});
	try{
		 await(task.save());
		res.status(201).send(task);
	}catch(error){
		res.status(400).send(error);
	}
})


//GET ?completed=false
//GET ?completed=false&limit=4&skip=4
//GET ?completed=false&limit=4&skip=4&sortBy=createdAt:desc
router.get('/tasks', auth, async(req, res)=>{
	const match={};
	const sort={};
	
	if(req.query.sortBy){
		const parts = req.query.sortBy.split(':');
		sort[parts[0]]= parts[1]==='desc'? -1 :1;
	}
	
	if(req.query.completed){
		match.completed = req.query.completed =='true';
	}
	try{
		//const tasks = await (Task.find({owner: req.user._id}));
		//await req.user.populate('tasks').execPopulate();
		await req.user.populate({
			path:'tasks',
			match,
			options:{
				limit:parseInt(req.query.limit),
				skip:parseInt(req.query.skip),
				sort,
			}
		}).execPopulate();
		res.send(req.user.tasks);
	}catch(error){
		res.status(500).send(error);
	}
})

router.get('/tasks/:id',auth, async(req, res)=>{
	const _id = req.params.id;
	
	try{
		const task = await(Task.findById({_id,owner:req.user._id}));
		if(!task){
			return res.status(404).send();
		}
		res.send(task);
	}catch(error){
		res.status(500).send(error);
	}
})

router.patch('/tasks/:id',auth, async(req, res)=>{
	const allowedUpdates = ['name','duration','completed'];
	const updates = Object.keys(req.body);
	
	const isValidOperation = updates.every((key)=>{
		return allowedUpdates.includes(key);
	});
	
	if(!isValidOperation){
		return res.status(400).send('{"error":"Invalid Updates"}');
	}
	try{
		const task  = await(Task.findOne({_id:req.params.id,owner:req.user._id}));
		//const task  = await(Task.findById(req.params.id));
		
		if(!task){
			res.status(404).send();
		}
		
		
		updates.forEach((key)=>{
			task[key]= req.body[key];//will assign the value of req.body[key] to task 
		})
		
		await task.save();
		
		//below call could not attach a middleware because its a direct call with mongodb.
		//const task = await(Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true}));
		
		res.send(task);
	}catch(error){
		res.status(400).send(error);
	}
	
});


router.delete('/tasks/:id',auth,async(req,res)=>{
	
	try{
		const task = await( Task.findOneAndDelete({_id:req.params.id,owner:req.user._id}));
		
		if(!task){
			res.status(404).send('"error":"Invalid Delete"');
		}
		res.send(task);
	}catch(e){
		res.status(400).send();
	}
})

module.exports = router;