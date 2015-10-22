'use strict';

var Polls = require('../models/polls.js');

function PollHandler () {
	
	this.addPoll = function(req, res) {
		
		var poll = req.body;
		poll.userId = req.user.github.id;
		poll.username = req.user.github.username;
		Polls
			.create(poll, function (err) {
				if (err) {
					throw err;
				}
			});
	}
	
	this.getPolls = function(req, res) {
		
		Polls
			.find({ userId : req.user.github.id })
			.exec(function(err, result) {
				if (err) {
					throw err;
				}
				res.json(result);
			});
		
	}
	
	this.getPoll = function(req, res) {
		
		console.log(req.params.pollid)
	}
	
}

module.exports = PollHandler;