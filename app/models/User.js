// app/models/User.js

// grab the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  facebookId: String,
  email: String,
  password: String,
  dob: Date,
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Roster'
  }],
  awards: [{
    type: Schema.Types.ObjectId,
    ref: 'Award'
  }],
  roster_limit: {
    type: Number,
    default: 1
  },
  coin: {
    type: Number,
    default: 0
  },
  coin_spent: {
    type: Number,
    default: 0
  },
  coin_purchased: {
    type: Number,
    default: 0
  },
  coin_awarded: {
    type: Number,
    default: 0
  },
  last_login: Date,
  created_at: Date,
  modified_at: Date
});

// =====================================
// METHODS =============================
// =====================================

userSchema.virtual('at_roster_limit').get(function() {
  return this.players.length >= this.roster_limit;
});

userSchema.virtual('roster_upgrade_cost').get(function() {
  var SQUARE = 2;
  var BASE_COST = 50;
  return Math.pow(this.roster_limit,SQUARE) * BASE_COST;
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getYearOfBirth = function(age) {
  var dob = new Date();
  dob.setFullYear(date.getFullYear() - age);
  return dob;
};

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;