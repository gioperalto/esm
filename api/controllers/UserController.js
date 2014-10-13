/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var UserController = {

	create: function(req, res) {
		var username 			= req.param('username'),
			email				= req.param('email'),
			gender				= req.param('gender'),
			password 			= req.param('password');

		var amount = 50;

		User.findOne({
			or: [
				{ username: username },
				{ email: email }
			]
		}).done(function createFindUser(err, usr) {
			if(err) {
				res.redirect('/?error=' + 'There was an error creating your account!');
			} else if(usr) {
				res.redirect('/?error=' + 'Email or username is already in use!');
			} else {
				var hasher = require("password-hash");
	    		password = hasher.generate(password);

	    		User.create({
	    			username: username,
	    			email: email,
	    			title: '',
	    			password: password,
	    			gender: gender,
	    			picture: '/images/profile/default.png',
	    			fame: 0,
	    			money: amount
	    		}).done(function createCreateUser(error, user) {
	    			if(error) {
	    				res.redirect('/?error=' + 'There was an error creating your account!');
	    			} else {
	    				console.log(user);
	    				req.session.user = user;
	    				req.session.authenticated = true;
	    				res.redirect('/member');
	    			}
	    		})
			}
		});

		for(var i = 0; i < 5; i++) {
			PlayerManager.createPlayer();
		}
	},

	login: function(req, res) {
		var email 			= req.param('email'),
			password 		= req.param('password');

		User.findOneByEmail(email)
		.done(function loginFindUser(err, usr) {
			if(err) {
				res.redirect('/?error=' + 'There was an error logging in!');
			} else if(usr) {
				var hasher = require("password-hash");
		      	if (hasher.verify(password, usr.password)) {
		      		req.session.user = usr;
		      		req.session.authenticated = true;
		      		res.redirect('/member');
		      	}
			} else {
				res.redirect('/?error=' + 'Wrong password/email combination!');
			}
		})
	},

	logout: function(req, res) {
		req.session.user = null;
		req.session.authenticated = false;
		res.redirect('/');
	}

};

module.exports = UserController;
