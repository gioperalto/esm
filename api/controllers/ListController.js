/**
 * ListsController
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

var ListController = {

	create: function(req, res) {
		if(req.session.user) {
			var user_id			= req.param('user_id');
			var story_id		= req.param('story_id');

			List.findOne({
				user_id: user_id,
				story_id: story_id
			}).done(function createFindList(err, lst) {
				if(err) {
					// We set an error header here,
			    	// which we access in the views an display in the alert call.
			    	res.set('error', 'DB Error');
			    	// The error object sent below is converted to JSON
			    	res.send(500, { error: "DB Error" });
				} else if(lst) {
					// Set the error header
			    	res.set('error', 'This story has already been added to your list');
			    	res.send(400, { error: "This story has already been added to your list"});
				} else {
					List.create({user_id: user_id, story_id: story_id})
					.done(function createCreateList(error, list) {
						if(error) {
							// Set the error header
			        		res.set('error', 'DB Error');
			        		res.send(500, { error: "DB Error" });
						} else {
							// console.log('Item has been added to list!');
							// console.log(list);
							res.send(list);
						}
					});
				}
			});
		}
	},

	delete: function(req, res) {
		var user_id			= req.param('user_id');
		var story_id		= req.param('story_id');

		List.findOne({
			user_id: user_id,
			story_id: story_id
		}).done(function deleteFindList(err, lst) {
			if(err) {
				// We set an error header here,
		    	// which we access in the views an display in the alert call.
		    	res.set('error', 'DB Error');
		    	// The error object sent below is converted to JSON
		    	res.send(500, { error: "DB Error" });
			} else if(lst) {
				List.destroy({user_id: user_id, story_id: story_id})
				.exec(function deleteDeleteList(error, list) {
					if(error) {
						// Set the error header
		        		res.set('error', 'DB Error');
		        		res.send(500, { error: "DB Error" });
					} else {
						res.send(list);
					}
				});
			} else {
				res.set('error', 'Story is not in your list, therefore it cannot be deleted');
		      	res.send(404, { error: "Story is not in your list, therefore it cannot be deleted"});
			}
		});
	},
};

module.exports = ListController;
