const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  totalCompletedDays: {
    type: Number,
    default: 0
  },
  lastCompletedDate: {
    type: String // Format: YYYY-MM-DD
  },
  completedDates: [{
    type: String // Format: YYYY-MM-DD
  }]
}, { timestamps: true });

module.exports = mongoose.model('Streak', streakSchema);
