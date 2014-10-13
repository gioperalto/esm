/**
 * OfferController
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

var OfferController = {

	// CREATES AN OFFER
	create: function(req, res) {
		var amount 			= req.param('amount'),
			player_id 		= req.param('player_id');

		Offer.findOne({
			player_id: player_id,
			offerer: req.session.user.username
		}).done(function createFindExistingOffer(err, off) {
			if(err) {
				res.redirect('/?error=' + 'There was an error finding if an offer already exists on this player!');
			} else if(off) {
				res.redirect('/?error=' + 'You have already made an offer on this player!');
			} else {
				User.findOneByUsername(req.session.user.username)
				.done(function createFindUser(error, user) {
					if(error) {
						res.redirect('/?error=' + 'There was a problem finding the offerer!');
					} else if(user) {
						if(user.money >= amount) {
							user.money -= amount;
						} else {
							res.redirect('/?error=' + 'You do not have enough money to make this offer!');
						}
						user.save(function (err) {
							if(err) {
								res.redirect('/?error=' + 'There was an error debiting your user!');
							}
							else {
								console.log('Transaction successfully executed!');
							}
						})
					}
				});

				Offer.create({amount: amount, player_id: player_id, offerer: req.session.user.username})
				.exec(function (error, offer) {
					if(error) {
						res.redirect('/?error=' + 'There was a problem creating your offer!');
					} else {
						console.log('Offer created!');
						console.log(offer);
					}
				})
			}
		});

		res.redirect('/member');
	},

	// ACCEPTS AN OFFER
	accept: function(req, res) {
		var id 			= req.param('id');

		// TRANSFER OCCURS AND PLAYER CHANGES OWNERSHIP
		Offer.findOneById(id)
		.done(function acceptFindOffer(err, off) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem finding your offer!');
			} else if(off) {
				// DESTROYS ALL OTHER OFFERS MADE ON PLAYER
				Offer.findByPlayer_id(off.player_id)
				.done(function acceptFindOtherOffers(error, offers) {
					if(error) {
						res.redirect('/?error=' + 'There was a problem finding all other offers!');
					} else if(offers) {
						for(var i = 0; i < offers.length; i++) {
							if(offers[i].id != id) {
								// TRANSFERS MONEY BACK TO OFFERER
								User.findOneByUsername(offers[i].offerer)
								.done(function acceptFindOtherUser(errr, user) {
									if(errr) {
										res.redirect('/?error=' + 'There was a problem finding an offerer!');
									} else if(user) {
										user.money += offers[i].amount;
										user.save(function (err) {
											if(err) {
												res.redirect('/?error=' + 'There was a problem transfering money to an offerer!');
											} else {
												console.log('Money transfered back to offerer!');
											}
										});
									}
								});
								// DESTROYS OFFER
								Offer.destroy({id: offers[i].id})
								.exec(function (err) {
									if(err) {
										res.redirect('/?error=' + 'There was a problem deleting one of the other offers!');
									} else {
										console.log('One of other offers was deleted!');
									}
								});
							}
						}
					}
				});

				// ACCEPTS OFFER
				Player.findOneById(off.player_id)
				.done(function acceptFindPlayer(error, player) {
					if(error) {
						res.redirect('/?error=' + 'There was a problem finding the player offer was made on!');
					} else if(player) {
						User.findOneByUsername(player.owner)
						.done(function acceptFindUser(errr, user) {
							if(errr) {
								res.redirect('/?error=' + 'There was a problem finding the player offer was made on!');
							} else if(user) {
								// TRANSFER OFFER MONEY TO PLAYER
								user.money += off.amount;
								user.save(function acceptTransfer(err) {
									if(err) {
										res.redirect('/?error=' + 'There was a problem transfering the offer money!');
									} else {
										console.log('Money transfered!');
									}
								});
							}
						});
						// CHANGE OWNERSHIP
						player.owner = off.offerer;
						player.save(function (err) {
							if(err) {
								res.redirect('/?error=' + 'There was a problem changing ownership!');
							} else {
								console.log('Player has been traded!');
								console.log(player);
							}
						})
					}
				});

				// DESTROY OFFER
				Offer.destroy({id: id})
				.exec(function (err) {
					if(err) {
						res.redirect('/?error=' + 'There was a problem destroying the offer!');
					} else {
						console.log('Offer destroyed!');
					}
				});
			}
		});
	},

	// DECLINES AN OFFER
	decline: function(req, res) {
		var id 			= req.param('id');

		Offer.findOneById(id)
		.done(function declineFindOffer(err, off) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem finding your offer!');
			} else if(off) {
				User.findOneByUsername(off.offerer)
				.done(function declineFindUser(error, user) {
					if(error) {
						res.redirect('/?error=' + 'There was a problem finding the offerer!');
					} else if(user) {
						user.money += off.amount;
						user.save(function (err) {
							if(err) {
								res.redirect('/?error=' + 'There was a problem transfering money back to offerer!');
							} else {
								console.log('Money transfered back to offerer!');
							}
						});
					}
				});
			}
		});

		Offer.destroy({id: id})
		.exec(function (err) {
			if(err) {
				res.redirect('/?error=' + 'There was a problem destroying this offer!');
			} else {
				console.log('Offer destroyed!');
			}
		});
	}

};

module.exports = OfferController;
