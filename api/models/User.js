/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	username: {
  		type: 'string',
  		required: true
  	},

    email: {
      type: 'string',
      required: true
    }, 

    title: 'string',

  	password: {
  		type: 'string',
  		required: true
  	},

  	gender: {
  		type: 'string',
  		required: true
  	},

  	picture: {
  		type: 'string',
  		required: true
  	},

  	fame: {
  		type: 'INTEGER',
  		required: true
  	},

  	money: {
  		type: 'INTEGER',
  		required: true
  	}
    
  }

};
