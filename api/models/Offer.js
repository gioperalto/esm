/**
 * Offer
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	amount: {
  		type: 'integer',
  		required: true
  	},

  	player_id: {
  		type: 'string',
  		required: true
  	},

  	offerer: {
  		type: 'string',
  		required: true
  	}
    
  }

};
