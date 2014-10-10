/**
 * Game
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	player_mood: {
  		type: 'string',
  		required: true
  	},

  	// has_analyst: {
  	// 	type: 'boolean',
  	// 	required: true
  	// },

    victory: {
      type: 'boolean',
      required: true
    },

  	player_id: {
  		type: 'string',
  		required: true
  	}
    
  }

};
