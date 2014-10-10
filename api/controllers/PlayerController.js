/**
 * PlayerController
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

function getMoodValue(mood) {
	if(mood == 'Apathetic') {
		return 0;
	} else if(mood == 'Bored') {
		return 0.5;
	} else if(mood == 'Anxious') {
		return 1;
	} else if(mood == 'Normal') {
		return 1.5;
	} else if(mood == 'Motivated') {
		return 2;
	}
}

var PlayerController = {

	// CREATES A RANDOM PLAYER
	create: function(req, res) {
		//TODO: Add if necessary
	},

	// PURCHASES A PLAYER
	purchase: function(req, res) {
		var id = 			req.param('id');

		Player.findOneById(id)
		.done(function purchaseFindPlayer(err,plyr) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem purchasing this player!');
			} else if(plyr) {
				if(plyr.owner !== '') {
					res.redirect('/?error=' + 'Another manager already owns this player!');
				} else {
					User.findOneById(req.session.user.id)
					.done(function purchaseFindUser(error,user) {
						if(error) {
							res.redirect('/?error=' + 'There was a problem finding your manager!');
						} else if(user) {
							user.money -= plyr.value;
						 	req.session.user.money = user.money;
							user.save(function (errr) {
								if(errr) {
									res.redirect('/?error=' + 'There was a problem saving changes!');
								} else {
									plyr.owner = user.username;
									plyr.save(function (errr) {
										if(errr) {
											res.redirect('/?error=' + 'There was a problem with your purchase!');
										}
									});
								}
							});
						}
					});
				}
			}
		});
	},

	// TRADES A PLAYER WITH ANOTHER PLAYER
	trade: function(req, res) {
		//TODO: Implement trade player logic
	},

	// PLAYS A GAME FOR PLAYER
	play: function(req, res) {
		var roles 			= ['Top','Mid','Jungle','ADC','Support'],
			moods			= ['Motivated','Normal','Anxious','Bored','Apathetic'],
			elo_bump 		= 10,
			victory 		= false;

		// ELO GAINED PER WIN IS BETWEEN 40 - 70

		// ALL PLAYERS OF A SPECIFIC ROLE PLAY A SOLO GAME SIMULTANEOUSLY
		Player.find()
		.done(function playFindPlayers(err,plyrs) {
			if(err) {
				console.log('There was a problem finding these players!');
			} else if(plyrs) {
				for(var i = 0; i < plyrs.length; i++) {
					if(3 >= Math.ceil(Math.random() * 5)) {
						// VICTORY
						victory = true;
						plyrs[i].rank = PlayerManager.getRank(plyrs[i].visible_elo); // RANK UP
						plyrs[i].mood = moods[Math.floor(Math.random() * moods.length)]; // UP MOOD
						plyrs[i].visible_elo += elo_bump; // BUMP VISIBLE ELO
						plyrs[i].hidden_elo += elo_bump * 0.5 * getMoodValue(plyrs[i].mood); // BUMP HIDDEN ELO
						plyrs[i].value = PlayerManager.getValue(plyrs[i].visible_elo);
						
					} else {
						// LOSS
						victory = false;
						plyrs[i].rank = PlayerManager.getRank(plyrs[i].visible_elo); // RANK DOWN
						plyrs[i].mood = moods[Math.floor(Math.random() * moods.length)]; // DOWN MOOD
						plyrs[i].visible_elo -= elo_bump; // BUMP VISIBLE ELO
						plyrs[i].hidden_elo += elo_bump * 1.5 * getMoodValue(plyrs[i].mood); // BUMP HIDDEN ELO
						plyrs[i].value = PlayerManager.getValue(plyrs[i].visible_elo);
					}
					
					// SAVE UPDATES
					plyrs[i].save(function (error) {
						if(error) {
							console.log('There was an error saving this match!');
							console.log(error);
						}
					});

					// CREATE LOG OF PLAYER'S GAME
					Game.create({player_mood: plyrs[i].mood, victory: victory, player_id: plyrs[i].id})
					.exec(function (error, game) {
						if(error) {
							console.log('There was an error creating player\'s game log!');
							console.log(error);
						} else {
							console.log(game);
						}
					});
				}
			}
		});
	},

	// VIEWS HISTORY OF SPECIFIED PLAYER
	history: function(req, res) {
		var id 			= req.query.id,
			player 		= {},
			games 		= [];

		Player.findOneById(id)
		.done(function historyFindPlayer(err, plyr) {
			if(err) {
				res.redirect('/?error=' + 'We couldn\'t find your player!');
			} else if(plyr) {
				player = plyr;
			}
		});

		Game.find({
			where: { player_id: id },
			sort: 'createdAt DESC'
		}).done(function historyFindGames(err, gms) {
			if(err) {
				res.redirect('/?error=' + 'We couldn\'t find the history of this player!');
			} else if(gms) {
				games = gms;
			}
		});

		res.view({user: req.session.user, player: player, games: games});
	},

	read: function(req, res) {

	},

	retire: function(req, res) {
		//TODO: Either destroy players or send them to hall of fame
	},

};

module.exports = PlayerController;