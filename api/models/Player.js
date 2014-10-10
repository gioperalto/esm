/**
 * Player
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true
  	},

    role: {
      type: 'string',
      required: true
    },

  	visible_elo: {
  		type: 'integer',
  		required: true
  	},

  	hidden_elo: {
  		type: 'integer',
  		required: true
  	},

    rank: {
      type: 'string',
      required: true
    },

  	mood: {
  		type: 'string',
  		required: true
  	},

  	age: {
  		type: 'integer',
  		required: true
  	},

  	value: {
  		type: 'integer',
  		required: true
  	},

    picture: 'STRING',

    owner: 'STRING'
    
  }

};
