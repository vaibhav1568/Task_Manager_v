/**
 * http://usejsdoc.org/
 */
//Initialize the mongoose.
require('dotenv').config()
require('./db/mongoose_init');

const express = require('express');

//Import the routes
const usersRouter = require('./routers/users');
const tasksRouter = require('./routers/tasks');

const app = express();


//Middle ware function between req,res => middleware => router
//app.use((req,res,next)=>{
//	res.status(503).send('Service is in Maintenance Mode. ');
//})

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);

module.exports = app;