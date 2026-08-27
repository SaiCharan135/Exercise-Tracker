const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['video', 'gif', 'image', 'svg'],
    default: 'svg'
  },
  url: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  source: { type: String, default: 'DUMBBELL DAILY Visual Library' },
  sourceUrl: { type: String, default: '' },
  license: { type: String, default: 'Public / Educational' },
  attribution: { type: String, default: 'DUMBBELL DAILY Fitness Engine' }
});

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: [{
    type: String
  }],
  formTips: [{
    type: String
  }],
  commonMistakes: [{
    type: String
  }],
  muscleGroup: {
    type: String,
    required: true,
    enum: ['Shoulders', 'Chest', 'Back', 'Biceps', 'Triceps', 'Legs', 'Abs/Core', 'Full Body'],
    index: true
  },
  equipment: {
    type: String,
    default: '2 × 7 KG Dumbbells'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  defaultSets: {
    type: Number,
    default: 3
  },
  defaultReps: {
    type: Number,
    default: 10
  },
  restSeconds: {
    type: Number,
    default: 60
  },
  safetyNotes: {
    type: String,
    default: 'Stop immediately if you experience sharp pain. Maintain proper spine posture.'
  },
  media: {
    type: mediaSchema,
    default: () => ({})
  }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
