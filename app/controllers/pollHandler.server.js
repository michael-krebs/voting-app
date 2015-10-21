'use strict';

var Polls = require('../models/polls.js');

function PollHandler () {
	
	this.addPoll = function(req, res) {
		
		var poll = req.body;
		poll.userId = req.user.github.id;
		poll.username = req.user.github.username;
		poll.url = "test"
		Polls
			.create(poll)
			.exec(function (err, result) {
				if (err) { throw err; }
				console.log("we did it")
			});
	}
	
}

module.exports = PollHandler;