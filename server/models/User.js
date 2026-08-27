const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required']
  },
  profileImage: {
    type: String,
    default: ''
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'dark'
    },
    defaultRestSeconds: {
      type: Number,
      default: 60
    },
    preferredWorkoutTime: {
      type: String,
      default: '07:00'
    }
  },
  equipment: {
    type: [String],
    default: ['2 x 7 KG Dumbbells']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
