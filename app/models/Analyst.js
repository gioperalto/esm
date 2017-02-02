// app/models/Analyst.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var analystSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  education: String,
  story: String,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
analystSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Analyst = mongoose.model('Analyst', analystSchema);

// make this available to our users in our Node applications
module.exports = Analyst;