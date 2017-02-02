// app/models/Player.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
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
  avatar: String,
  level: {
    type: Number,
    default: 1
  }
  strength: {
    type: Number,
    required: true
  },
  dexterity: {
    type: Number,
    required: true
  },
  constitution: {
    type: Number,
    required: true
  },
  intelligence: {
    type: Number,
    required: true
  },
  charisma: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  race: {
    type: Schema.Types.ObjectId,
    ref: 'Race'
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class'
  }],
  languages: [{
    type: Schema.Types.ObjectId,
    ref: 'Language'
  }],
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
playerSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Player = mongoose.model('Player', playerSchema);

// make this available to our users in our Node applications
module.exports = Player;