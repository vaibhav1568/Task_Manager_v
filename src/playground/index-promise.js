/**
 * http://usejsdoc.org/
 */
const express = require('express');
require('./db/mongoose_init.js');

const UserModel = require('./model/user.js');
const TaskModel = require('./model/task.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/users',(req,res)=>{
	const user = new UserModel.User(req.body);
	user.save().then(()=>{
		res.status(201).send(user);
	}).catch((error)=>{
		res.status(400).send(error);
		
	})
})

app.post('/tasks',(req,res)=>{
	const task = new TaskModel.Task(req.body);
	task.save().then(()=>{
		res.status(201).send(task);
	}).catch((error)=>{
		res.status(400).send(error);
		
	})
})

app.get('/users',(req, res)=>{
	UserModel.User.find({}).then((users)=>{
		res.send(users);
	}).catch((error)=>{
		res.status(500).send(error);
	})
})

app.get('/users/:id',(req, res)=>{
	const _id = req.params.id;
	UserModel.User.findById(_id).then((user)=>{
		if(!user){
			return res.status(404).send();
		}
		res.send(user);
	}).catch((error)=>{
		res.status(500).send(error);
	})
})

app.get('/tasks',(req, res)=>{
	TaskModel.Task.find({}).then((tasks)=>{
		res.send(tasks);
	}).catch((error)=>{
		res.status(500).send(error);
	})
})

app.get('/tasks/:id',(req, res)=>{
	const _id = req.params.id;
	TaskModel.Task.findById(_id).then((task)=>{
		if(!task){
			return res.status(404).send();
		}
		res.send(task);
	}).catch((error)=>{
		res.status(500).send(error);
	})
})

app.listen(port, ()=> {
	console.log("Listening on port "+port)
})
