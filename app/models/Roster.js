// app/models/Roster.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var rosterSchema = new Schema({
  season: {
    type: Schema.Types.ObjectId,
    ref: 'Season'
  },
  champion: {
    type: Schema.Types.ObjectId,
    ref: 'Champion'
  },
  lane: {
    type: Schema.Types.ObjectId,
    ref: 'Lane'
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  mood: {
    type: Schema.Types.ObjectId,
    ref: 'Mood'
  },
  real_elo: {
    type: Number,
    required: true
  },
  visible_elo: {
    type: Number,
    required: true
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  value: {
    type: Number,
    default: 0
  },
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
rosterSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Roster = mongoose.model('Roster', rosterSchema);

// make this available to our users in our Node applications
module.exports = Roster;