// app/models/Rank.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var rankSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  threshold: {
    type: Number,
    required: true
  },
  description: String,
  image: String,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
rankSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Rank = mongoose.model('Rank', rankSchema);

// make this available to our users in our Node applications
module.exports = Rank;