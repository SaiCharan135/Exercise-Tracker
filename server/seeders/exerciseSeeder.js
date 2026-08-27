const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Exercise = require('../models/Exercise');
const WorkoutPlan = require('../models/WorkoutPlan');
const WeeklyPlan = require('../models/WeeklyPlan');
const connectDB = require('../config/db');

const exercisesData = [
  {
    name: 'Goblet Squat',
    muscleGroup: 'Legs',
    description: 'Hold a 7 KG dumbbell vertically at chest height while squatting with controlled tempo.',
    instructions: [
      'Stand tall with feet slightly wider than shoulder-width, toes turned out 15 degrees.',
      'Grasp one 7 KG dumbbell vertically against your upper chest, gripping the upper weight head.',
      'Inhale deep, sit your hips back and down until thighs break parallel with floor.',
      'Drive through your heels, contract glutes, and return to standing while exhaling.'
    ],
    formTips: [
      'Keep back in a comfortable neutral position throughout the movement.',
      'Maintain constant pressure on full foot (heels & balls of feet).',
      'Keep knees tracking inline with your second toe.'
    ],
    commonMistakes: [
      'Allowing knees to cave inward during the squat.',
      'Rounding the lower back at the bottom of the movement.',
      'Rushing repetitions without controlling the descent.'
    ],
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    safetyNotes: 'Stop if you experience sharp knee or spinal discomfort.',
    media: {
      type: 'image',
      url: '/media/goblet-squat.jpg',
      source: 'Real Demonstration Photo',
      license: 'Standard Educational License',
      attribution: 'DUMBBELL DAILY Exercise Guide'
    }
  },
  {
    name: 'Dumbbell Floor Press',
    muscleGroup: 'Chest',
    description: 'Lie flat on floor and press 2 × 7 KG dumbbells upward to build chest and triceps strength.',
    instructions: [
      'Lie flat on back on a mat with knees bent 90 degrees and feet flat on floor.',
      'Hold 2 × 7 KG dumbbells at chest level with upper arms resting on floor at a 45-degree angle.',
      'Exhale and press dumbbells upward until arms are extended above chest.',
      'Lower under control until triceps touch the floor softly.'
    ],
    formTips: [
      'Press through chest muscles rather than pushing with shoulders.',
      'Keep lower back flat against floor by engaging core.'
    ],
    commonMistakes: [
      'Flaring elbows out to 90 degrees which strains shoulders.',
      'Bouncing triceps off the floor abruptly.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Floor press naturally limits shoulder extension, protecting joint health.',
    media: {
      type: 'image',
      url: '/media/floor-press.jpg',
      source: 'Real Demonstration Photo',
      license: 'Standard Educational License',
      attribution: 'DUMBBELL DAILY Exercise Guide'
    }
  },
  {
    name: 'One-Arm Dumbbell Row',
    muscleGroup: 'Back',
    description: 'Hinge forward or rest on a chair to row a 7 KG dumbbell toward your hip.',
    instructions: [
      'Stagger stance or place one hand/knee on a stable surface with flat torso.',
      'Hold a 7 KG dumbbell with arm fully extended toward floor.',
      'Pull elbow up and back, driving dumbbell toward waist.',
      'Squeeze lats at top, then lower with control.'
    ],
    formTips: [
      'Drive with elbow, not your bicep.',
      'Keep hips and shoulders square to floor.'
    ],
    commonMistakes: [
      'Twisting torso to jerk weight upward.',
      'Rounding upper back.'
    ],
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Brace core to keep lumbar spine stable.',
    media: {
      type: 'image',
      url: '/media/one-arm-row.jpg',
      source: 'Real Demonstration Photo',
      license: 'Standard Educational License',
      attribution: 'DUMBBELL DAILY Exercise Guide'
    }
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
    description: 'Press 2 × 7 KG dumbbells overhead from shoulder level.',
    instructions: [
      'Sit or stand tall holding dumbbells at shoulder height with palms facing forward.',
      'Press dumbbells overhead in a slight arc until arms are straight.',
      'Lower with control back to shoulder level.'
    ],
    formTips: [
      'Brace core firmly to avoid arching back.',
      'Keep gaze straight ahead.'
    ],
    commonMistakes: [
      'Hyper-arching lower back.',
      'Locking out elbows aggressively at top.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Use comfortable range of motion overhead.',
    media: {
      type: 'image',
      url: '/media/shoulder-press.jpg',
      source: 'Real Demonstration Photo',
      license: 'Standard Educational License',
      attribution: 'DUMBBELL DAILY Exercise Guide'
    }
  },
  {
    name: 'Dumbbell Bicep Curl',
    muscleGroup: 'Biceps',
    description: 'Curl 2 × 7 KG dumbbells to shoulders with supinated palms.',
    instructions: [
      'Stand upright holding dumbbells at sides, palms facing forward.',
      'Curl dumbbells toward shoulders while keeping upper arms locked at sides.',
      'Squeeze biceps at top, then lower with control.'
    ],
    formTips: [
      'Keep elbows pinned into ribcage.',
      'Perform full range of motion.'
    ],
    commonMistakes: [
      'Swinging hips or torso for momentum.',
      'Moving elbows forward during curl.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Control tempo on both upward and downward phases.',
    media: {
      type: 'svg',
      url: '/media/bicep-curl.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Hammer Curl',
    muscleGroup: 'Biceps',
    description: 'Neutral grip dumbbell curl targeting biceps and forearm brachialis.',
    instructions: [
      'Stand tall holding 2 × 7 KG dumbbells at sides with palms facing inward.',
      'Curl dumbbells to shoulder height maintaining neutral grip.',
      'Pause at peak contraction, then lower steadily.'
    ],
    formTips: [
      'Keep wrists straight throughout lift.'
    ],
    commonMistakes: [
      'Bending wrists inward or outward.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Avoid swinging momentum.',
    media: {
      type: 'svg',
      url: '/media/hammer-curl.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'Shoulders',
    description: 'Raise 2 × 7 KG dumbbells out to sides for lateral shoulder deltoid development.',
    instructions: [
      'Stand with dumbbells at thighs, slight elbow bend.',
      'Raise arms out to sides until parallel with floor.',
      'Lower under control.'
    ],
    formTips: [
      'Lead with elbows, not wrists.'
    ],
    commonMistakes: [
      'Shrugging neck traps.',
      'Swinging torso.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Keep movement controlled.',
    media: {
      type: 'svg',
      url: '/media/lateral-raise.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Overhead Dumbbell Triceps Extension',
    muscleGroup: 'Triceps',
    description: 'Lower a 7 KG dumbbell behind neck and extend overhead to build triceps.',
    instructions: [
      'Hold one 7 KG dumbbell overhead with both hands gripping inner plate.',
      'Flex elbows to lower weight behind head.',
      'Extend arms overhead, squeezing triceps.'
    ],
    formTips: [
      'Keep elbows pointing forward, not outward.'
    ],
    commonMistakes: [
      'Allowing elbows to flare wide.'
    ],
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Maintain secure grip on dumbbell.',
    media: {
      type: 'svg',
      url: '/media/triceps-extension.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Romanian Deadlift',
    muscleGroup: 'Legs',
    description: 'Hinge hips back holding 2 × 7 KG dumbbells to target hamstrings and glutes.',
    instructions: [
      'Stand tall holding dumbbells in front of thighs.',
      'Hinge hips backward with soft knee bend.',
      'Lower weight along shins until feeling hamstring stretch.',
      'Press hips forward to return.'
    ],
    formTips: [
      'Keep shoulder blades retracted.'
    ],
    commonMistakes: [
      'Rounding lumbar spine.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Maintain neutral spine throughout.',
    media: {
      type: 'svg',
      url: '/media/rdl.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Reverse Lunge',
    muscleGroup: 'Legs',
    description: 'Step backward holding 2 × 7 KG dumbbells to work quads and glutes safely.',
    instructions: [
      'Stand tall with dumbbells at sides.',
      'Step right foot backward and lower hips until both knees bend 90 degrees.',
      'Push off front foot to return.'
    ],
    formTips: [
      'Keep chest upright and front knee over ankle.'
    ],
    commonMistakes: [
      'Leaning forward excessively.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Step far enough back for knee stability.',
    media: {
      type: 'svg',
      url: '/media/reverse-lunge.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Calf Raise',
    muscleGroup: 'Legs',
    description: 'Raise ankles high holding 2 × 7 KG dumbbells.',
    instructions: [
      'Stand tall with dumbbells at sides.',
      'Raise high onto balls of feet, squeeze calves, then lower.'
    ],
    formTips: [
      'Pause for 1s at top.'
    ],
    commonMistakes: [
      'Bouncing reps quickly.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 45,
    safetyNotes: 'Keep balance under control.',
    media: {
      type: 'svg',
      url: '/media/calf-raise.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Bent-Over Dumbbell Row',
    muscleGroup: 'Back',
    description: 'Hinge forward 45 degrees and row 2 × 7 KG dumbbells simultaneously.',
    instructions: [
      'Hinge at waist 45 degrees with flat back.',
      'Pull dumbbells toward waist, squeezing lats.'
    ],
    formTips: [
      'Keep core braced.'
    ],
    commonMistakes: [
      'Standing up during row.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Keep neck relaxed.',
    media: {
      type: 'svg',
      url: '/media/bent-row.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Reverse Fly',
    muscleGroup: 'Back',
    description: 'Hinge forward and raise dumbbells out to sides for rear delts and upper back.',
    instructions: [
      'Hinge forward at waist 45 degrees.',
      'Raise arms out to sides, squeezing shoulder blades.'
    ],
    formTips: [
      'Lead with elbows.'
    ],
    commonMistakes: [
      'Using heavy momentum.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Control light weight.',
    media: {
      type: 'svg',
      url: '/media/reverse-fly.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Russian Twist',
    muscleGroup: 'Abs/Core',
    description: 'Sit on floor holding a 7 KG dumbbell and rotate torso side to side.',
    instructions: [
      'Sit on floor with knees bent, holding 7 KG dumbbell at chest.',
      'Lean back slightly and twist torso left then right.'
    ],
    formTips: [
      'Rotate shoulders, not just arms.'
    ],
    commonMistakes: [
      'Moving dumbbell without rotating spine.'
    ],
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 45,
    safetyNotes: 'Keep lower back comfortable.',
    media: {
      type: 'svg',
      url: '/media/russian-twist.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Dead Bug Variation',
    muscleGroup: 'Abs/Core',
    description: 'Lie flat holding a 7 KG dumbbell overhead while lowering opposite legs.',
    instructions: [
      'Lie flat on back holding 7 KG dumbbell overhead.',
      'Lower opposite leg toward floor slowly while keeping lower back flat.'
    ],
    formTips: [
      'Press lower back into floor.'
    ],
    commonMistakes: [
      'Arching lower back.'
    ],
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Move with control.',
    media: {
      type: 'svg',
      url: '/media/dead-bug.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Squeeze Press',
    muscleGroup: 'Chest',
    description: 'Press 2 × 7 KG dumbbells pressed together on floor for intense chest squeeze.',
    instructions: [
      'Lie flat holding dumbbells pressed tightly together over chest.',
      'Press upward while squeezing dumbbells together.'
    ],
    formTips: [
      'Maintain inward pressure.'
    ],
    commonMistakes: [
      'Separating dumbbells.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Keep weights secure.',
    media: {
      type: 'svg',
      url: '/media/squeeze-press.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Triceps Kickback',
    muscleGroup: 'Triceps',
    description: 'Hinge forward and kick 2 × 7 KG dumbbells backward to flex triceps.',
    instructions: [
      'Hinge forward with upper arms parallel to torso.',
      'Extend forearms backward, squeezing triceps.'
    ],
    formTips: [
      'Keep upper arm locked.'
    ],
    commonMistakes: [
      'Swinging upper arms.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    safetyNotes: 'Maintain upper arm alignment.',
    media: {
      type: 'svg',
      url: '/media/kickback.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Deadlift',
    muscleGroup: 'Full Body',
    description: 'Squat/hinge to lower 2 × 7 KG dumbbells near floor and stand up tall.',
    instructions: [
      'Stand with dumbbells at sides.',
      'Squat and hinge to lower dumbbells to mid-shin level, then drive up.'
    ],
    formTips: [
      'Keep chest up.'
    ],
    commonMistakes: [
      'Rounding spine.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Drive through heels.',
    media: {
      type: 'svg',
      url: '/media/deadlift.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  },
  {
    name: 'Dumbbell Thruster',
    muscleGroup: 'Full Body',
    description: 'Combine a dumbbell squat with an overhead press in one fluid movement.',
    instructions: [
      'Hold dumbbells at shoulders, perform a deep squat, then drive up and press overhead.'
    ],
    formTips: [
      'Use leg power to assist overhead press.'
    ],
    commonMistakes: [
      'Pausing at shoulder level.'
    ],
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Advanced',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    safetyNotes: 'Pace breath carefully.',
    media: {
      type: 'svg',
      url: '/media/thruster.svg',
      source: 'DUMBBELL DAILY Visual Library',
      license: 'Public Educational License',
      attribution: 'DUMBBELL DAILY Motion Guide'
    }
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Exercise.deleteMany({});
    await WorkoutPlan.deleteMany({});
    await WeeklyPlan.deleteMany({});

    console.log('[Seeder]: Cleared old exercises and plans.');

    const createdExercises = await Exercise.insertMany(exercisesData);
    console.log(`[Seeder]: Inserted ${createdExercises.length} dumbbell exercises.`);

    const getExId = (name) => createdExercises.find(e => e.name === name)?._id;

    const plansData = [
      {
        title: 'Full Body Dumbbell Power',
        description: 'Monday Full Body Workout',
        targetDayOfWeek: 1, // Monday
        category: 'Full Body',
        estimatedDurationMins: 35,
        exercises: [
          { exerciseId: getExId('Goblet Squat'), sets: 3, reps: 12, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Floor Press'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('One-Arm Dumbbell Row'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Shoulder Press'), sets: 3, reps: 10, restSeconds: 60 }
        ]
      },
      {
        title: 'Arms & Shoulders Blast',
        description: 'Tuesday Arms & Shoulders Workout',
        targetDayOfWeek: 2, // Tuesday
        category: 'Upper Body',
        estimatedDurationMins: 30,
        exercises: [
          { exerciseId: getExId('Dumbbell Bicep Curl'), sets: 3, reps: 12, restSeconds: 45 },
          { exerciseId: getExId('Hammer Curl'), sets: 3, reps: 12, restSeconds: 45 },
          { exerciseId: getExId('Dumbbell Lateral Raise'), sets: 3, reps: 12, restSeconds: 45 },
          { exerciseId: getExId('Overhead Dumbbell Triceps Extension'), sets: 3, reps: 12, restSeconds: 45 }
        ]
      },
      {
        title: 'Lower Body & Legs Focus',
        description: 'Wednesday Lower Body Workout',
        targetDayOfWeek: 3, // Wednesday
        category: 'Lower Body',
        estimatedDurationMins: 35,
        exercises: [
          { exerciseId: getExId('Goblet Squat'), sets: 3, reps: 12, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Romanian Deadlift'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Reverse Lunge'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Calf Raise'), sets: 3, reps: 15, restSeconds: 45 }
        ]
      },
      {
        title: 'Back & Core Sculpt',
        description: 'Thursday Back & Core Workout',
        targetDayOfWeek: 4, // Thursday
        category: 'Core & Mobility',
        estimatedDurationMins: 30,
        exercises: [
          { exerciseId: getExId('Bent-Over Dumbbell Row'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Reverse Fly'), sets: 3, reps: 12, restSeconds: 45 },
          { exerciseId: getExId('Dumbbell Russian Twist'), sets: 3, reps: 15, restSeconds: 45 },
          { exerciseId: getExId('Dumbbell Dead Bug Variation'), sets: 3, reps: 12, restSeconds: 45 }
        ]
      },
      {
        title: 'Chest & Arms Hypertrophy',
        description: 'Friday Chest & Arms Workout',
        targetDayOfWeek: 5, // Friday
        category: 'Upper Body',
        estimatedDurationMins: 35,
        exercises: [
          { exerciseId: getExId('Dumbbell Floor Press'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Squeeze Press'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Bicep Curl'), sets: 3, reps: 12, restSeconds: 45 },
          { exerciseId: getExId('Dumbbell Triceps Kickback'), sets: 3, reps: 12, restSeconds: 45 }
        ]
      },
      {
        title: 'Full Body Endurance',
        description: 'Saturday Full Body Workout',
        targetDayOfWeek: 6, // Saturday
        category: 'Full Body',
        estimatedDurationMins: 35,
        exercises: [
          { exerciseId: getExId('Dumbbell Deadlift'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Thruster'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('One-Arm Dumbbell Row'), sets: 3, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Hammer Curl'), sets: 3, reps: 12, restSeconds: 45 }
        ]
      },
      {
        title: 'Light Recovery & Mobility',
        description: 'Sunday Light Active Recovery Workout',
        targetDayOfWeek: 0, // Sunday
        category: 'Rest Day',
        estimatedDurationMins: 25,
        exercises: [
          { exerciseId: getExId('Goblet Squat'), sets: 2, reps: 12, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Romanian Deadlift'), sets: 2, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Shoulder Press'), sets: 2, reps: 10, restSeconds: 60 },
          { exerciseId: getExId('Dumbbell Russian Twist'), sets: 2, reps: 15, restSeconds: 45 }
        ]
      }
    ];

    await WorkoutPlan.insertMany(plansData);
    console.log('[Seeder]: Inserted 7-Day Workout Plans with real exercise photos.');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDB();
}
