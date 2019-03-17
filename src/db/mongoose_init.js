/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const dbURL = dbConfigReader.loadConfig();

mongoose.connect(dbURL, {useNewUrlParser : true,
						useCreateIndex:true,
						useFindAndModify:false});
