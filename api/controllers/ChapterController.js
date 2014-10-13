/**
 * ChaptersController
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

var ChapterController = {

	create: function(req, res) {
		var number 			= req.param('number');
		var storyName 		= req.param('storyName');
		var chapterName 	= req.param('chapterName');
		var content 		= req.param('content');

		Story.findOneByName(storyName)
		.done(function createFindStory(err, story) {
				if(err) {
					// We set an error header here,
		    		// which we access in the views an display in the alert call.
		    		res.set('error', 'DB Error');
		    		// The error object sent below is converted to JSON
		    		res.send(500, { error: "DB Error" });
				} else if(story) {
					Chapter.create({number: number, name: chapterName, content: content, story_id: story.id})
					.done(function createCreateChapter(err, chptr) {
						if(err) {
							// Set the error header
		        			res.set('error', 'DB Error');
		        			res.send(500, { error: "DB Error" });
						} else {
							// console.log(chptr);
							res.send(chptr);
							res.redirect('/story/edit?name=' + storyName);
						}
					});
				} else {
					res.set('error', 'Story not Found');
		      		res.send(404, { error: "Story not Found"});
				}
			}
		);
	},

	read: function(req, res) {
		if(req.session.publisher && req.session.publisher.status == 1) {
			var story_id 		= req.query.story_id,
				number 			= req.query.number,
				chapter 		= {},
				story 			= {};



			Story.findOneById(story_id)
			.done(function chapterFindStory(err, stry) {
				if(err) {
					// We set an error header here,
		    		// which we access in the views an display in the alert call.
		    		res.set('error', 'DB Error');
		    		// The error object sent below is converted to JSON
		    		res.send(500, { error: "DB Error" });
				} else if(stry) {
					story = stry;
				} else {
					//TODO: Send to Story not found page
		      		res.notFound();
				}
			});

			Chapter.findOne({
				story_id: story_id,
				number: number
			})
			.done(function chapterFindChapter(err, chptr) {
				if(err) {
					// We set an error header here,
		    		// which we access in the views an display in the alert call.
		    		res.set('error', 'DB Error');
		    		// The error object sent below is converted to JSON
		    		res.send(500, { error: "DB Error" });
				} else if(chptr) {
					chapter = chptr;
					res.view({user: req.session.user, publisher: req.session.publisher, admin: req.session.admin, story: story, chapter: chapter});
				} else {
					//TODO: Send to Story not found page
		      		res.notFound();
				}
			});
		} else {
			res.redirect('/find');
		}
	},

	update: function(req, res) {
		var storyId 		= req.param('storyId'),
			chapterId 		= req.param('chapterId'),
			name 			= req.param('chapterName'),
			content 		= req.param('content');

		Chapter.findOne({
			story_id: storyId,
			id: chapterId
		}).done(function updateFindChapter(err, chptr) {
			if(err) {
				// We set an error header here,
	    		// which we access in the views an display in the alert call.
	    		res.set('error', 'DB Error');
	    		// The error object sent below is converted to JSON
	    		res.send(500, { error: "DB Error" });
			} else if(chptr) {
				chptr.name = name;
				chptr.content = content;

				chptr.save(function(error) {
	    			if(error) {
	    				console.log('Chapter not saved!');
	    			} else {
	    				console.log(chptr);
	    				res.send(chptr);
	    				res.redirect('/chapter/read?story_id=' + storyId + '&number=' + chptr.number);
	    			}
	    		});
			}
		});
	},

	delete: function(req, res) {

		if(req.session.publisher && req.session.publisher.status == 1) {
			var id 			= req.param('storyId'),
				name 		= req.param('name'),
				number 		= req.param('number');

			Chapter.findOne({
				story_id: id,
				number: number
			}).done(function deleteFindChapter(err, chptr) {
				if(err) {
					// We set an error header here,
	    			// which we access in the views an display in the alert call.
	    			res.set('error', 'DB Error');
	    			// The error object sent below is converted to JSON
	    		res.send(500, { error: "DB Error" });
				} else if(chptr) {
					Chapter.destroy({
						story_id: id,
						number: number
					}).exec(function (err) {
						if(err) {
							console.log('Story not created!');
						} else {
							res.redirect('/story/edit?name=' + name);
						}
					});
				} else {

				}
			});
		} else {
			res.redirect('/find');
		}
	},

};

module.exports = ChapterController;
