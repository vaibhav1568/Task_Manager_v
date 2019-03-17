const mongoose = require('mongoose');
const validator = require('validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TaskModel = require('../model/task');
const pValidation = new passwordValidator();

pValidation.is().min(8).is().max(100).has().uppercase().has().lowercase()
			.has().digits().has().not().spaces();
	
 const Schema = mongoose.Schema;
 
 
const userSchema = new Schema({
		name:{
			type: 'String',
			required:true
			},
		email:{
				type:'String',
				unique: true,
				required:true,
				validate(value){
					if(!validator.isEmail(value)){
						throw new Error('Provide valid email address');
					}
				}
		},
		password:{
			type:'String',
			default:'@Dummy2011',
			validate(value){
				if(!pValidation.validate(value)){
					throw new Error('\nPassword not upto mark.'+ 
							'\nPlease reenter. Rules are: '+
					'\nMinimum length 8 '+
					'\nMaximum length 100 '+
					'\nMust have uppercase letters '+
					'\nMust have lowercase letters '+
					'\nMust have digits '+
					'\nShould not have spaces '
					);
				}
			}
		},
		tokens:[{
			token:{
				type:'String',
				required:true
			}
		}]
	},{
		timestamps:true
	}
);

userSchema.virtual('tasks',{
	ref: 'Task',
	localField : '_id',
	foreignField:'owner'
	
})

userSchema.methods.generateAuthToken = async function(){
	const user = this;
	const generatedToken = jwt.sign({_id:user._id.toString()},process.env.TASKMANAGER_JWT_SECRET);
	user.tokens = user.tokens.concat({
		token:generatedToken
	});
	//Save token to database.
	await user.save();
	return generatedToken;
}
//Calls automatically when express calls stringify on object. and hence we 
//are removing the properties from object.
userSchema.methods.toJSON= function(){
	const user = this;
	const userObject = user.toObject();
	
	delete userObject.password;
	delete userObject.tokens;
	
	return userObject;
}


userSchema.statics.findByCredentials = async(email, password)=>{
	const user = await User.findOne({email});
	if(!user){
		throw new Error('Unable to login');
	}
	const isMatch = await bcrypt.compare(password,user.password);
	if(!isMatch){
		throw new Error('Unable to login');
	}
	return user;
}

//MiddleWare , arrow functions don not have binding property, hence here to bind a function to
// middleware save we have to use function normally.
userSchema.pre('save',async function(next){
	const user = this;
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password,8);
	}
	next()
	  
});

//Middleware, to execute on removal of user, tasks should also be removed.
userSchema.pre('remove', async function(next){
	const user = this;
	await TaskModel.Task.deleteMany({owner:user._id});
	next()
})


const User = mongoose.model('User',userSchema);

module.exports ={ User}