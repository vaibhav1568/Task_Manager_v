/**
 * http://usejsdoc.org/
 */

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
		  to: 'navdeep.singh308@gmail.com',
		  from: 'navdeep.singh308@gmail.com',
		  subject: 'Node JS Example Email ',
		  text: 'Hi, This message was from NODEJS Email Server. ',
		};

sgMail.send(msg);