/**
 * MemberController
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

var MemberController = {

	index: function(req, res) {
		var players = 			[];

		Player.find({
			where: { owner: req.session.user.username },
			sort: 'visible_elo DESC'
		}).done(function indexFindPlayers(err, plyrs) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem finding your players!');
			} else if(plyrs) {
				players = plyrs;
			}
		});

		res.view({user: req.session.user, players: players});
	},

	teams: function(req, res) {
		var players = 			[];

		Player.find({
			where: { owner: req.session.user.username },
			sort: 'visible_elo DESC'
		}).done(function indexFindPlayers(err, plyrs) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem finding your players!');
			} else if(plyrs) {
				players = plyrs;
			}
		});

		res.view({user: req.session.user, players: players});
	}

};

module.exports = MemberController;
