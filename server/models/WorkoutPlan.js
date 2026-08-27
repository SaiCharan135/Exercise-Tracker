const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  targetDayOfWeek: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6], // 0 = Sun, 1 = Mon ... 6 = Sat
    required: true
  },
  category: {
    type: String,
    enum: ['Full Body', 'Upper Body', 'Lower Body', 'Core & Mobility', 'Rest Day'],
    default: 'Full Body'
  },
  estimatedDurationMins: {
    type: Number,
    default: 35
  },
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: { type: Number, default: 3 },
    reps: { type: Number, default: 10 },
    restSeconds: { type: Number, default: 60 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
