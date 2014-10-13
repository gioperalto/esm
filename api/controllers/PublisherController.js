/**
 * PublishersController
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

var PublisherController = {

  // VIEW FOR PUBLISHER HOME
  index: function(req, res) {
  	if(req.session.publisher) {
      var stories = {};

  		Story.findByPublisher(req.session.publisher.publishername)
  		.done(function findPublisherStories(err, strys) {
  			if(err) {
  				// We set an error header here,
		    	// which we access in the views an display in the alert call.
		    	res.set('error', 'DB Error');
		    	// The error object sent below is converted to JSON
          res.send(500, { error: "DB Error" });
  			} else if(strys) {
  				stories = strys;
  			} else {
  				res.set('error', 'No stories found');
	      	res.send(404, { error: "No stories found"});
  			}
  		});

		  res.view({user: req.session.user, publisher: req.session.publisher, admin: req.session.admin, stories: stories});
  	} else {
  		res.redirect('/home');
  	}
  },

  add: function(req, res) {
    if(req.session.publisher) {
      res.redirect('/publish');
    } else if(req.session.admin) {
      res.redirect('/learn');
    } else if(req.session.user) {
      res.view({user: req.session.user, publisher: req.session.publisher, admin: req.session.admin});
    } else {
      res.redirect('/learn');
    }
  },

  create: function(req, res) {
    var name      = req.param('name');

    Publisher.findOneByPublishername(name)
    .done(function createFindPublisher(err, pub) {
      if(err) {
        // We set an error header here,
        // which we access in the views an display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error" });
      } else if(pub) {
         // Set the error header
        res.set('error', 'Publisher Name is already in use');
        res.send(400, { error: "Publisher Name is already in use"});
      } else {
        Publisher.create({publishername: name, premium: false, status: 0, user_id: req.session.user.id})
        .done(function createPublisher(error, publisher) {
          if(error) {
            // We set an error header here,
            // which we access in the views an display in the alert call.
            res.set('error', 'DB Error');
            // The error object sent below is converted to JSON
            res.send(500, { error: "DB Error" });
          } else {
            // console.log(publisher);
            req.session.publisher = publisher;
            res.send(publisher);
            res.redirect('/publish');
          }
        });
      }
    });
  },

};

module.exports = PublisherController;
