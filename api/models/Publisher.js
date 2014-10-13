/**
 * Publishers
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	publishername: {
  		type: 'string',
  		required: true,
  	},
  	premium: 'BOOLEAN',
  	status: 'INT',
    user_id: {
      type: 'string',
      required: true,
    },
    
  }

};
