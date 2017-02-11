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
  lane: String,
  tier: String,
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  active_mood: Number,
  mood: {
    type: Schema.Types.ObjectId,
    ref: 'Mood'
  },
  active: {
    type: Boolean,
    default: true
  },
  available: {
    type: Boolean,
    default: true
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
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Roster = mongoose.model('Roster', rosterSchema);

// make this available to our users in our Node applications
module.exports = Roster;