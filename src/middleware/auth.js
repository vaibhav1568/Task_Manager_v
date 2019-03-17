/**
 * http://usejsdoc.org/
 * 
 * This is express middle ware function
 */
const jwt = require('jsonwebtoken');
const {User} = require('../model/user');


/**
 * validate login auth tokens
 */
const auth = async(req,res,next)=>{
	
	try{
		const token = req.header("Authorization").replace('Bearer ','');
		
		const decoded = jwt.verify(token,'thisismysecretKey');
		const user = await User.findOne({_id:decoded._id,'tokens.token':token});
		if(!user){
			throw new Error();
		}
		req.token = token;
		req.user = user;
		next();
	}catch(e){
		//console.log(e);
		res.status(401).send('{error:"Please authenticate"}')
	}
}

module.exports= auth;