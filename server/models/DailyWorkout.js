const mongoose = require('mongoose');

const completedSetSchema = new mongoose.Schema({
  setIndex: { type: Number, required: true },
  repsCompleted: { type: Number, default: 10 },
  weightKg: { type: Number, default: 7 },
  completedAt: { type: Date, default: Date.now }
});

const exerciseSnapshotSchema = new mongoose.Schema({
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  name: { type: String, required: true },
  muscleGroup: { type: String },
  targetSets: { type: Number, default: 3 },
  targetReps: { type: Number, default: 10 },
  restSeconds: { type: Number, default: 60 },
  completedSets: [completedSetSchema],
  isCompleted: { type: Boolean, default: false },
  isSkipped: { type: Boolean, default: false }
});

const dailyWorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  workoutPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutPlan'
  },
  date: {
    type: String,
    required: true, // Format: YYYY-MM-DD
    index: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'],
    default: 'NOT_STARTED',
    index: true
  },
  startTime: { type: Date },
  endTime: { type: Date },
  durationSeconds: { type: Number, default: 0 },
  exercises: [exerciseSnapshotSchema],
  notes: { type: String, default: '' },
  completedAt: { type: Date }
}, { timestamps: true });

dailyWorkoutSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('DailyWorkout', dailyWorkoutSchema);
