// app/models/Player.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  seasons: {
    type: Number,
    default: 0
  },
  experience: {
    type: Number,
    default: 0
  },
  champions: [{
    type: Schema.Types.ObjectId,
    ref: 'Champion'
  }],
  age: Number,
  retired: {
    type: Boolean,
    default: false
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  story: String,
  created_at: Date,
  modified_at: Date
});

// =====================================
// METHODS =============================
// =====================================

playerSchema.virtual('fullName').get(function() {
  return this.name.first + ' ' + this.name.last;
});

playerSchema.virtual('seniority').get(function() {
  return this.experience == 1 
    ?
      this.experience + ' year'
    :
      this.experience + ' years'
    ;
});

playerSchema.virtual('stars').get(function() {
  var MIN_MATCHES = 40;
  
  if((this.wins + this.losses) < MIN_MATCHES)
    return 0;

  var winLossRatio = (this.wins - this.losses) / this.wins * 100;
  var stars = [5, 30, 55, 80, 90];
  var stars_earned = [];

  for(var i = 0; i < stars.length; i++) {
    if(winLossRatio >= stars[i])
      stars_earned.push(stars[i]);
  }

  return stars_earned;
});

// on every save, add the date
playerSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    // TODO: set age
    this.created_at = currentDate;
  }

  next();
});

var Player = mongoose.model('Player', playerSchema);

// make this available to our users in our Node applications
module.exports = Player;