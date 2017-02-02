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
  experience: {
    type: Number,
    default: 0
  },
  rank: {
    type: Schema.Types.ObjectId,
    ref: 'Rank'
  },
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

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
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.getYearOfBirth = function(age) {
  var dob = new Date();
  dob.setFullYear(date.getFullYear() - age);
  return dob;
};

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;