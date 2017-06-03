var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('validator');

var userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Please enter your name.'],
    minlength: [3, 'Name must be at least 3 letters long.']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    validate: {
      validator: function(v) {
        return validator.isEmail(v)
      },
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter fill your password.']
  },
  fb_account: Boolean
})

var User = mongoose.model('User', userSchema);

module.exports = User;