// app/models/Reward.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var rewardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  link: String,
  created_at: Date,
  modified_at: Date
});

// =====================================
// METHODS =============================
// =====================================

rewardSchema.virtual('bounty').get(function() {
  return this.value + ' coin';
});


// on every save, add the date
rewardSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Reward = mongoose.model('Reward', rewardSchema);

// make this available to our users in our Node applications
module.exports = Reward;