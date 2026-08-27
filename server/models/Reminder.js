const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  reminderTime: {
    type: String,
    default: '07:00' // Format: HH:mm
  },
  daysOfWeek: {
    type: [Number],
    default: [1, 2, 3, 4, 5, 6, 0] // Mon-Sun
  }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
