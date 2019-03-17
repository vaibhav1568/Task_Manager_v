/**
 * http://usejsdoc.org/
 */
const bcrypt = require('bcryptjs');

var testBcrypt = async() =>{
	const password = '#123Red';
	const hashedPassword = await( bcrypt.hash(password,8));
	
	console.log(hashedPassword);
	
	const isEqual= await(bcrypt.compare('#123rdl',hashedPassword));
	console.log(isEqual);
}

testBcrypt()