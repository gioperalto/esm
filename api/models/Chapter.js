/**
 * Chapters
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	number: 'STRING',
  	name: 'STRING',
  	content: 'STRING',
    story_id: {
      type: 'string',
      required: true,
    },
    
  }

};
