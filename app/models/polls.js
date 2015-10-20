'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    userId : String,
    name : String,
    url : String,
    options : [ {
        text : String,
        votes : [ String ]
    }],
});

module.exports = mongoose.model('Poll', Poll);