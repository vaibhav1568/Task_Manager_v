const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
		name:{
			type: 'String',
			required:true
			},
		completed :{
			type:'Boolean',
			default:false
			
		},
		duration:{
			type:'Number',
			validate(value){
				if(value<0){
					throw new Error('duration of task can not be less than 0');
				}
			}
		},
		owner:{
			type:mongoose.Schema.Types.ObjectId,
			required:true,
			ref:'User'
			
		}
		
},{
	timestamps:true
});

var Task = mongoose.model('Task',taskSchema);
	
module.exports ={ Task };