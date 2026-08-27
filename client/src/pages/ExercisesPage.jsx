import React, { useState, useEffect } from 'react';
import { Search, Dumbbell, ShieldCheck, Eye } from 'lucide-react';
import API from '../services/api';
import { ExerciseDiagram } from '../utils/exerciseDiagrams';
import ExerciseDemoModal from '../components/exercise/ExerciseDemoModal';

const MOCK_EXERCISES = [
  {
    name: 'Goblet Squat',
    muscleGroup: 'Legs',
    description: 'Hold a 7 KG dumbbell vertically against your chest while squatting deep.',
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      'Stand with feet shoulder-width apart holding dumbbell vertically at chest.',
      'Inhale, sit hips back and down breaking parallel with floor.',
      'Drive through heels back to standing position.'
    ],
    formTips: ['Keep chest lifted', 'Keep knees tracking over toes'],
    commonMistakes: ['Knees caving inward', 'Rounding back'],
    safetyNotes: 'Keep your chest lifted and spine neutral throughout.'
  },
  {
    name: 'Dumbbell Floor Press',
    muscleGroup: 'Chest',
    description: 'Press 2 × 7 KG dumbbells upward while lying flat on floor.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: [
      'Lie flat on back with knees bent.',
      'Press dumbbells straight up above chest.',
      'Lower until upper arms touch floor softly.'
    ],
    formTips: ['Press through chest', 'Engage core'],
    commonMistakes: ['Flaring elbows out to 90 degrees'],
    safetyNotes: 'Elbows contact floor softly.'
  },
  {
    name: 'One-Arm Dumbbell Row',
    muscleGroup: 'Back',
    description: 'Row a 7 KG dumbbell toward your hip with flat torso.',
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: [
      'Hinge forward with flat back.',
      'Pull elbow up and back driving weight to waist.',
      'Lower under control.'
    ],
    formTips: ['Drive with elbow', 'Keep shoulders square'],
    commonMistakes: ['Twisting torso to jerk weight'],
    safetyNotes: 'Keep neck aligned with spine.'
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
    description: 'Press 2 × 7 KG dumbbells overhead from shoulder height.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: [
      'Hold dumbbells at shoulder height with palms facing forward.',
      'Press overhead until arms extend.',
      'Lower to shoulders with control.'
    ],
    formTips: ['Brace core to avoid arching back'],
    commonMistakes: ['Hyper-arching lower back'],
    safetyNotes: 'Brace core to avoid arching back.'
  },
  {
    name: 'Dumbbell Bicep Curl',
    muscleGroup: 'Biceps',
    description: 'Curl 2 × 7 KG dumbbells to shoulders with supinated palms.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    instructions: ['Curl dumbbells to shoulders keeping elbows pinned.'],
    formTips: ['Pin elbows into ribcage'],
    commonMistakes: ['Swinging body'],
    safetyNotes: 'Avoid swinging body.'
  },
  {
    name: 'Hammer Curl',
    muscleGroup: 'Biceps',
    description: 'Neutral grip curl using 2 × 7 KG dumbbells.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    instructions: ['Curl dumbbells with palms facing inward.'],
    formTips: ['Keep wrists straight'],
    commonMistakes: ['Swinging arms'],
    safetyNotes: 'Keep wrists straight.'
  },
  {
    name: 'Dumbbell Lateral Raise',
    muscleGroup: 'Shoulders',
    description: 'Raise 2 × 7 KG dumbbells laterally to shoulder level.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    instructions: ['Raise dumbbells out to sides until parallel with floor.'],
    formTips: ['Lead with elbows'],
    commonMistakes: ['Shrugging traps'],
    safetyNotes: 'Lead with elbows.'
  },
  {
    name: 'Overhead Dumbbell Triceps Extension',
    muscleGroup: 'Triceps',
    description: 'Extend 7 KG dumbbell overhead behind neck.',
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    instructions: ['Lower dumbbell behind head, extend arms overhead.'],
    formTips: ['Keep elbows pointing forward'],
    commonMistakes: ['Flaring elbows outward'],
    safetyNotes: 'Keep elbows close to head.'
  },
  {
    name: 'Dumbbell Romanian Deadlift',
    muscleGroup: 'Legs',
    description: 'Hinge hips back holding 2 × 7 KG dumbbells along shins.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: ['Hinge backward at hips with flat back, feeling hamstring stretch.'],
    formTips: ['Keep flat back'],
    commonMistakes: ['Rounding back'],
    safetyNotes: 'Maintain neutral spine.'
  },
  {
    name: 'Dumbbell Reverse Lunge',
    muscleGroup: 'Legs',
    description: 'Step backward holding 2 × 7 KG dumbbells at sides.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: ['Step right foot backward and lower hips into lunge.'],
    formTips: ['Keep chest tall'],
    commonMistakes: ['Leaning forward'],
    safetyNotes: 'Controlled lunging motion.'
  },
  {
    name: 'Dumbbell Calf Raise',
    muscleGroup: 'Legs',
    description: 'Raise onto balls of feet holding 2 × 7 KG dumbbells.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 45,
    instructions: ['Raise high onto ankles, pause at top, and lower.'],
    formTips: ['Squeeze at peak'],
    commonMistakes: ['Bouncing fast'],
    safetyNotes: 'Maintain balance.'
  },
  {
    name: 'Bent-Over Dumbbell Row',
    muscleGroup: 'Back',
    description: 'Hinge forward 45 degrees and row 2 × 7 KG dumbbells simultaneously.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: ['Hinge at waist and row dumbbells to waist.'],
    formTips: ['Drive elbows back'],
    commonMistakes: ['Standing up mid-set'],
    safetyNotes: 'Brace core.'
  },
  {
    name: 'Dumbbell Reverse Fly',
    muscleGroup: 'Back',
    description: 'Hinge forward and raise dumbbells out to sides for rear delts.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    instructions: ['Raise dumbbells outward squeezing upper back.'],
    formTips: ['Lead with elbows'],
    commonMistakes: ['Using momentum'],
    safetyNotes: 'Controlled tempo.'
  },
  {
    name: 'Dumbbell Russian Twist',
    muscleGroup: 'Abs/Core',
    description: 'Sit on floor holding a 7 KG dumbbell and rotate torso side to side.',
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 45,
    instructions: ['Rotate torso left and right with dumbbell.'],
    formTips: ['Rotate shoulders fully'],
    commonMistakes: ['Moving arms only'],
    safetyNotes: 'Keep lower back comfortable.'
  },
  {
    name: 'Dumbbell Dead Bug Variation',
    muscleGroup: 'Abs/Core',
    description: 'Lie flat holding a 7 KG dumbbell overhead while lowering opposite legs.',
    equipment: '1 × 7 KG Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 45,
    instructions: ['Lower opposite leg while maintaining flat lower back.'],
    formTips: ['Press lower back into floor'],
    commonMistakes: ['Arching lower back'],
    safetyNotes: 'Controlled movement.'
  },
  {
    name: 'Dumbbell Squeeze Press',
    muscleGroup: 'Chest',
    description: 'Press 2 × 7 KG dumbbells pressed tightly together on floor.',
    equipment: '2 × 7 KG Dumbbells',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: ['Press dumbbells while maintaining inward pressure.'],
    formTips: ['Squeeze chest tightly'],
    commonMistakes: ['Allowing dumbbells to separate'],
    safetyNotes: 'Controlled movement.'
  }
];

const ExercisesPage = () => {
  const [exercises, setExercises] = useState(MOCK_EXERCISES);
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('ALL');
  const [selectedDemoExercise, setSelectedDemoExercise] = useState(null);

  useEffect(() => {
    API.get('/exercises')
      .then(res => {
        if (res.data && res.data.exercises && res.data.exercises.length > 0) {
          // Remove duplicate entries by exercise name
          const uniqueMap = new Map();
          res.data.exercises.forEach(ex => {
            if (!uniqueMap.has(ex.name.toLowerCase())) {
              uniqueMap.set(ex.name.toLowerCase(), ex);
            }
          });
          setExercises(Array.from(uniqueMap.values()));
        }
      })
      .catch(() => {});
  }, []);

  const muscles = ['ALL', 'Legs', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Abs/Core', 'Full Body'];

  const filtered = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
                          ex.description.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = selectedMuscle === 'ALL' || ex.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-6">
      {/* Demo Modal Launcher */}
      {selectedDemoExercise && (
        <ExerciseDemoModal
          exercise={selectedDemoExercise}
          onClose={() => setSelectedDemoExercise(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">Exercise Catalog</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Real photographic demonstrations and form instructions for 2 × 7 KG dumbbells.
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#30363D] text-xs font-semibold text-[#00F0FF]">
          <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
          <span>Home Dumbbell Gear</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search exercises by name or muscle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {muscles.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMuscle(m)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedMuscle === m
                  ? 'bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/20'
                  : 'bg-[#161B22] text-gray-400 border border-[#30363D] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards Grid with Real Photographic Demonstrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ex, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#00F0FF]/40 transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00F0FF] px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                  {ex.muscleGroup}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 bg-[#0D1117] px-2 py-0.5 rounded-lg border border-[#30363D]">
                  {ex.difficulty || 'Beginner'}
                </span>
              </div>

              {/* Real Photographic Visual Diagram */}
              <div className="mb-3">
                <ExerciseDiagram name={ex.name} className="w-full h-32" />
              </div>

              <h3 className="text-lg font-extrabold text-white">{ex.name}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{ex.description}</p>
            </div>

            <div className="pt-3 border-t border-[#30363D] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
                <div className="flex items-center space-x-1.5">
                  <Dumbbell className="w-4 h-4 text-[#00F0FF]" />
                  <span>{ex.defaultSets || 3} Sets × {ex.defaultReps || 10} Reps</span>
                </div>
                <span className="text-amber-400 font-mono">{ex.restSeconds || 60}s Rest</span>
              </div>

              <button
                onClick={() => setSelectedDemoExercise(ex)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#0D1117] hover:bg-[#1F242C] text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-bold transition-all"
              >
                <Eye className="w-4 h-4 text-[#00F0FF]" />
                <span>VIEW REAL DEMO & FORM TIPS</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisesPage;
