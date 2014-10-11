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

  	manager: {
  		type: 'string',
  		required: true
  	},

  	owner: {
  		type: 'string',
  		required: true
  	}
    
  }

};
