const Exercise = require('../models/Exercise');

// Pre-seeded 2 x 7 KG Dumbbell Exercises catalog fallback data
const fallbackExercises = [
  {
    name: 'Goblet Squat',
    muscleGroup: 'Legs',
    description: 'Hold a single 7 KG dumbbell vertically against your chest while squatting deep.',
    instructions: [
      'Stand with feet slightly wider than shoulder-width, toes turned out slightly.',
      'Hold one 7 KG dumbbell vertically at chest height, gripping the upper weight head.',
      'Inhale, sit hips back and down until thighs break parallel with floor.',
      'Drive through heels and return to standing while exhaling.'
    ],
    equipment: '1 or 2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Keep your chest lifted and spine neutral throughout the movement.'
  },
  {
    name: 'Dumbbell Romanian Deadlift',
    muscleGroup: 'Legs',
    description: 'Hinge at the hips holding 2 × 7 KG dumbbells to target hamstrings and glutes.',
    instructions: [
      'Stand upright with feet hip-width apart holding 2 × 7 KG dumbbells in front of thighs.',
      'Softly bend knees and hinge hips back while lowering dumbbells down shin length.',
      'Stop when feeling a deep stretch in hamstrings.',
      'Squeeze glutes and press hips forward to return to standing.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Do not round your lower back. Maintain shoulder blade retraction.'
  },
  {
    name: 'Dumbbell Row',
    muscleGroup: 'Back',
    description: 'Hinge forward or rest on a chair/bench to row 2 × 7 KG dumbbells to your waist.',
    instructions: [
      'Hinge at hips to a 45-degree angle with core braced.',
      'Hold dumbbells with arms fully extended toward the ground.',
      'Pull elbows up and back, driving dumbbells toward your hips.',
      'Squeeze shoulder blades at top, then lower with control.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Avoid using momentum or twisting the torso.'
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
    description: 'Press 2 × 7 KG dumbbells overhead from shoulder height.',
    instructions: [
      'Sit or stand holding dumbbells at shoulder level with palms facing forward.',
      'Press dumbbells overhead until arms are extended but not locked.',
      'Lower with control back to shoulder level.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Brace your core to prevent arching lower back.'
  },
  {
    name: 'Dumbbell Bicep Curl',
    muscleGroup: 'Biceps',
    description: 'Alternate or simultaneously curl 2 × 7 KG dumbbells.',
    instructions: [
      'Stand holding dumbbells at sides with palms facing forward.',
      'Curl dumbbells toward shoulders while keeping upper arms locked at sides.',
      'Pause at top, then lower with control.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Keep elbows tucked into ribs. Avoid swinging body.'
  },
  {
    name: 'Dumbbell Hammer Curl',
    muscleGroup: 'Biceps',
    description: 'Curl 2 × 7 KG dumbbells with palms facing each other (neutral grip).',
    instructions: [
      'Stand with dumbbells at sides, palms facing inward.',
      'Curl dumbbells to shoulder height maintaining neutral grip.',
      'Squeeze brachialis muscle at peak contraction and lower slowly.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Maintain strict control without swinging elbows.'
  },
  {
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'Shoulders',
    description: 'Raise 2 × 7 KG dumbbells laterally to shoulder level.',
    instructions: [
      'Stand with dumbbells at thighs, slight elbow bend.',
      'Raise arms out to sides until parallel with floor.',
      'Pause briefly, then lower dumbbells steadily.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Lead with elbows, not wrists. Avoid shrugging traps.'
  },
  {
    name: 'Dumbbell Floor Press',
    muscleGroup: 'Chest',
    description: 'Lie flat on floor and press 2 × 7 KG dumbbells upward.',
    instructions: [
      'Lie flat on floor with knees bent and feet flat on ground.',
      'Hold dumbbells at sides with elbows resting on floor at 45-degree angle.',
      'Press dumbbells straight up until arms are fully extended.',
      'Lower slowly until triceps touch floor lightly.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Floor press naturally protects shoulders by limiting extension.'
  },
  {
    name: 'Dumbbell Lunges',
    muscleGroup: 'Legs',
    description: 'Step forward holding 2 × 7 KG dumbbells at sides.',
    instructions: [
      'Stand tall holding dumbbells at sides.',
      'Step forward with right leg, lowering hips until both knees bend at 90 degrees.',
      'Push off front foot to return to standing. Alternate legs.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Do not let front knee collapse inward.'
  },
  {
    name: 'Dumbbell Calf Raise',
    muscleGroup: 'Legs',
    description: 'Raise ankles high holding 2 × 7 KG dumbbells.',
    instructions: [
      'Stand upright holding dumbbells at sides.',
      'Raise heels off floor as high as possible onto balls of feet.',
      'Hold peak contraction for 1 second, then lower heels.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 45,
    safetyNotes: 'Control balance without rushing reps.'
  },
  {
    name: 'Overhead Triceps Extension',
    muscleGroup: 'Triceps',
    description: 'Hold 1 or 2 × 7 KG dumbbells overhead and extend arms.',
    instructions: [
      'Sit or stand holding dumbbell overhead with both hands around upper weight plate.',
      'Lower weight behind head by bending elbows.',
      'Extend arms overhead, squeezing triceps.'
    ],
    equipment: '1 or 2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Keep elbows tucked forward, not pointing outward.'
  },
  {
    name: 'Dumbbell Reverse Fly',
    muscleGroup: 'Back',
    description: 'Hinge forward and raise 2 × 7 KG dumbbells laterally to hit rear delts and upper back.',
    instructions: [
      'Hinge forward at waist to a 45-degree angle.',
      'With elbows slightly bent, raise dumbbells out to sides.',
      'Squeeze shoulder blades together at top.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Focus on rear delt contraction rather than heavy lifting.'
  }
];

// @desc Get all exercises
// @route GET /api/exercises
exports.getExercises = async (req, res, next) => {
  try {
    let exercises = await Exercise.find();
    if (!exercises || exercises.length === 0) {
      exercises = fallbackExercises;
    }
    res.status(200).json({
      success: true,
      count: exercises.length,
      exercises
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: fallbackExercises.length,
      exercises: fallbackExercises
    });
  }
};
