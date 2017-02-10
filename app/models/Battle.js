// app/models/Battle.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var battleSchema = new Schema({
  roster: {
    type: Schema.Types.ObjectId,
    ref: 'Roster'
  },
  opponent: {
    type: Schema.Types.ObjectId,
    ref: 'Champion'
  },
  active_mood: Number,
  score: Number,
  opponent_score: Number,
  victory: Boolean,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
battleSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Battle = mongoose.model('Battle', battleSchema);

// make this available to our users in our Node applications
module.exports = Battle;