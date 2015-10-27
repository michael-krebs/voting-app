'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/index.jade');
		});

	app.route('/login')
		.get(function (req, res) {
			res.render(path + '/public/login.jade');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/newpoll.jade');
		});

	app.route('/viewpolls')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/viewpolls.jade');
		});
		
	app.route('/poll/:pollid')
		.get(function(req, res) {
			res.render(path + '/public/poll.jade', { _id : req.params.pollid } );
		})
		.post(function(req, res, next) {
			if (req.isAuthenticated()) {
				return next();
			} else {
				res.send("no login");
			}
		}, pollHandler.vote)
		.delete(isLoggedIn, pollHandler.deletePoll);

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});
		
	app.route('/api/user_data')
		.get(function (req, res) {
			if (!(req.isAuthenticated())) {
	            res.json({});
	        } else {
	            res.json({ userId: req.user.github.id });
        	}
		});
		
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	app.route('/api/poll/:pollid/')
	  .get(pollHandler.getPoll);
	  
	app.route('/api/:id/polls')
		.post(isLoggedIn, pollHandler.addPoll)
		.get(isLoggedIn, pollHandler.getPolls);
};
