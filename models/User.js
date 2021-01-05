const mongoose = require('mongoose');
const { isEmail } = require('validator');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    validate: [(email) => {
      let re = /^\w+([\.-]?\w+)*@\w+([\.-]?[^0-9]\w+)*(\.\w{2,3})+$/;
      return re.test(email);
    }, 'Please enter a valid email'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
