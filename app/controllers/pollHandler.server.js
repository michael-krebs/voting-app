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
		
		Polls
			.findOne({ _id : req.params.pollid })
			.exec(function(err, result) {
				if (err) {
					throw err;
				}
				res.json(result);
			});
		
	}
	
	this.vote = function(req, res) {
		
		Polls
		  .findOne({ _id : req.params.pollid })
		  .exec(function(err, result) {
		  	result.options[req.body.optionIndex].votes.push( req.body.userId );
		  	Polls
		  		.update({ _id : req.params.pollid }, result)
		  		.exec(function(err) {
		  			if (err) { console.log("err") };
		  			res.send();
		  		});
		  })
	}
	
	this.deletePoll = function(req, res) {
		
		Polls
		  .findByIdAndRemove(req.params.pollid)
			.exec(function(err, result) {
				if (err) {
					console.log(err);
				}
			})
	}
	
}

module.exports = PollHandler;