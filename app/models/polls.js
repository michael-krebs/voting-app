'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	userId : String,
	username : String,
	pollName : String,
	options : [ {
		text : String,
		votes : [ String ]
	}]
});

module.exports = mongoose.model('Poll', Poll);