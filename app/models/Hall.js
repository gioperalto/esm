// app/models/Hall.js
// Hall of Fame

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var hallSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  seasons_won: [{
    type: Schema.Types.ObjectId,
    ref: 'Season'
  }],
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
hallSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Hall = mongoose.model('Hall', hallSchema);

// make this available to our users in our Node applications
module.exports = Hall;