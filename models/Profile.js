const mongoose = require('mongoose');

// Profile - designation,
//  Phone no
// Address
// Education

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  address: {
    type: String
  },
  phoneno: {
    type: Number,
    min: [10, 'Phone number should be 10 digits'],
    max: [10, 'Phone number should be 10 digits']
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  expenseLimit: {
    type: Number,
    default: 50000
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);