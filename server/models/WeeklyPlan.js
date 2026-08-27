const mongoose = require('mongoose');

const weeklyPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Default 7-Day 2 × 7 KG Dumbbell Plan'
  },
  description: {
    type: String,
    default: 'Structured 7-day routine featuring exactly 4 exercises per day (28 total weekly exercises).'
  },
  days: [{
    dayOfWeek: { type: Number, required: true, enum: [0, 1, 2, 3, 4, 5, 6] }, // 0 = Sun, 1 = Mon ...
    dayName: { type: String, required: true },
    focusArea: { type: String, required: true },
    exercises: [{
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
      name: { type: String, required: true },
      sets: { type: Number, default: 3 },
      reps: { type: Number, default: 10 },
      restSeconds: { type: Number, default: 60 }
    }]
  }],
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('WeeklyPlan', weeklyPlanSchema);
