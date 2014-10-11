/**
 * MainController
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

var MainController = {

	index: function(req, res) {
		// DELETE ALL USERS
		// User.destroy()
		// .exec(function (err){});
		// DELETE ALL PLAYERS
		// Player.destroy()
		// .exec(function (err){});
		// DELETE ALL GAMES
		// Game.destroy()
		// .exec(function (err){});
		res.view({user: req.session.user});
	},

	players: function(req, res) {
		var players 			= [],
			roles 				= [],
			owner 				= '',
			money 				= 0;

		if(req.session.authenticated) {
			User.findOneById(req.session.user.id)
			.done(function playersFindUser(err, usr) {
				if(err) {
					res.redirect('/?error=' + 'There was a problem finding your manager!');
				} else if(usr) {
					money = usr.money;
				}
			});

			Player.findByOwner(req.session.user.username)
			.done(function playersFindRoles(err, rls) {
				if(err) {
					res.redirect('/?error=' + 'There was a problem finding your player roles!');
				} else if(rls) {
					for(var i = 0; i < rls.length; i++) {
						roles.push(rls[i].role);
					}
				}
			});
		}

		Player.find({
			where: { owner: owner },
			sort: 'visible_elo DESC'
		}).done(function playersFindPlayer(err,plyrs) {
			if(err) {
				res.redirect('/?error=' + 'There was an error accessing our players!');
			} else if(plyrs) {
				players = plyrs;
			} else {
				res.redirect('/?error=' + 'We couldn\'t find our players!');
			}
		});

		res.view({user: req.session.user, players: players, money: money, roles: roles});
	},

	managers: function(req, res) {
		var managers 			= [];

		User.find({
			sort: 'fame DESC'
		}).done(function managersFindUsers(err, mgrs) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem accessing our managers!');
			} else if(mgrs) {
				managers = mgrs;
			} else {
				res.redirect('/?error=' + 'We couldn\'t find our managers!');
			}
		});

		res.view({user: req.session.user, managers: managers});
	},

	retired: function(req, res) {
		//TODO: Implement Hall of Fame
	}
	
};

module.exports = MainController;
