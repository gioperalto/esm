// app/models/Tournament.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tournamentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  prizes: [Number],
  winners: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  entry_fee: {
    type: Number,
    required: true
  },
  start: Date,
  end: Date,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
tournamentSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Tournament = mongoose.model('Tournament', tournamentSchema);

// make this available to our users in our Node applications
module.exports = Tournament;