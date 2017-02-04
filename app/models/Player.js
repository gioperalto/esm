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
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    default: ''
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