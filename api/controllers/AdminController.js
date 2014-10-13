/**
 * AdminController
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

var AdminController = {

	// VIEW FOR ADMIN HOME
	index: function(req, res) {
		if(req.session.admin) {
			var pending 		= 2,
			publishers 			= {},
			stories 			= {};

			Publisher.findByStatus(0)
			.done(function findAdminPublishers(err, pubs) {
				if(err) {
					// We set an error header here,
		    		// which we access in the views an display in the alert call.
		    		res.set('error', 'DB Error');
		    		// The error object sent below is converted to JSON
				} else if(pubs) {
  					publishers = pubs;
				} else {
					res.set('error', 'No stories found');
	      			res.send(404, { error: "No stories found"});
				}
			});

			Story.findByStatus(pending)
			.done(function findAdminStories(err, strys) {
				if(err) {
					// We set an error header here,
		    		// which we access in the views an display in the alert call.
		    		res.set('error', 'DB Error');
		    		// The error object sent below is converted to JSON
				} else if(strys) {
  					stories = strys;
				} else {
					res.set('error', 'No stories found');
	      			res.send(404, { error: "No stories found"});
				}
			});

		 	res.view({
		 		user: req.session.user,
		 		publisher: req.session.publisher,
		 		admin: req.session.admin,
		 		stories: stories,
		 		publishers: publishers
		 	});

		} else {
	 		res.redirect('/home');
		}
	},

	// APPROVES A STORY OR PUBLISHER
	approve: function(req, res) {
		var name 			= req.param('name');

		//TODO: Doesn't account for when a publisher and story have the same name

		Publisher.findOneByPublishername(name)
		.done(function approveFindPublisher(err, pub) {
			if(err) {
				// We set an error header here,
	    		// which we access in the views an display in the alert call.
	    		res.set('error', 'DB Error');
	    		// The error object sent below is converted to JSON
	    		res.send(500, { error: "DB Error" });
			} else if(pub) {
				pub.status = 1;

				pub.save(function(error) {
					if(error) {
						console.log('Publisher not approved!');
					} else {
						//TODO: Send emai to user, notifying them that their request was approved
	    				// console.log(pub);
						res.send(pub);
					}
				});
			}
		})

		Story.findOneByName(name)
	    .done(function approveFindStory(err, story) {
	    	if(err) {
	    		// We set an error header here,
	    		// which we access in the views an display in the alert call.
	    		res.set('error', 'DB Error');
	    		// The error object sent below is converted to JSON
	    		res.send(500, { error: "DB Error" });
	    	} else if(story){
	    		story.status = 3;

	    		story.save(function(error) {
	    			if(error) {
	    				console.log('Story not approved!');
	    			} else {
						//TODO: Send emai to user, notifying them that their request was approved
	    				// console.log(story);
	    				res.send(story);
	    			}
	    		});
	    	}
	    });
	},

	// DECLINES A STORY OR PUBLISHER
	decline: function(req, res) {
		var name 			= req.param('name');

		//TODO: Doesn't account for when a publisher and story have the same name

		Publisher.findOneByPublishername(name)
		.done(function declineFindPublisher(err, pub) {
			if(err) {
				// We set an error header here,
	    		// which we access in the views an display in the alert call.
	    		res.set('error', 'DB Error');
	    		// The error object sent below is converted to JSON
	    		res.send(500, { error: "DB Error" });
			} else if(pub) {
				Publisher.destroy({publishername: name})
				.exec(function declineDeletePublisher(error, publisher) {
					if(error) {
						// Set the error header
	        			res.set('error', 'DB Error');
	        			res.send(500, { error: "DB Error" });
					} else {
						//TODO: Send emai to user, notifying them that their request was declined
						res.send(publisher);
					}
				});
			}
		})

		Story.findOneByName(name)
	    .done(function declineFindStory(err, story) {
	    	if(err) {
	    		// We set an error header here,
	    		// which we access in the views an display in the alert call.
	    		res.set('error', 'DB Error');
	    		// The error object sent below is converted to JSON
	    		res.send(500, { error: "DB Error" });
	    	} else if(story){
	    		story.status = 1;

	    		story.save(function(error) {
	    			if(error) {
	    				console.log('Story not declined!');
	    			} else {
						//TODO: Send emai to user, notifying them that their request was declined
	    				// console.log(story);
	    				res.send(story);
	    			}
	    		});
	    	}
	    });
	},

};

module.exports = AdminController;
