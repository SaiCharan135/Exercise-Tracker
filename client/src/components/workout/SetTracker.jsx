import React from 'react';
import { Check, ShieldAlert } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

const SetTracker = ({ exercise, exerciseIndex }) => {
  const { toggleSetCompletion } = useWorkout();

  const targetSets = exercise.targetSets || 3;
  const targetReps = exercise.targetReps || 10;
  const completedSetsList = exercise.completedSets || [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
        <span>Target: {targetSets} Sets × {targetReps} Reps</span>
        <span className="text-[#00F0FF]">Equipment: 2 × 7 KG Dumbbells</span>
      </div>

      <div className="space-y-2">
        {Array.from({ length: targetSets }).map((_, setIdx) => {
          const isDone = completedSetsList.some(s => s.setIndex === setIdx);

          return (
            <div
              key={setIdx}
              onClick={() => toggleSetCompletion(exerciseIndex, setIdx)}
              className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                isDone
                  ? 'bg-[#10B981]/15 border-[#10B981]/40 text-emerald-300 shadow-md shadow-[#10B981]/5'
                  : 'bg-[#161B22] border-[#30363D] hover:border-[#00F0FF]/40 text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                    isDone ? 'bg-[#10B981] text-black' : 'bg-[#0D1117] text-gray-400 border border-[#30363D]'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : setIdx + 1}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">Set {setIdx + 1}</div>
                  <div className="text-xs text-gray-400 font-mono">10 Reps • 2 × 7 KG</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  isDone
                    ? 'bg-[#10B981]/20 border-[#10B981]/40 text-emerald-400'
                    : 'bg-[#0D1117] border-[#30363D] text-gray-400'
                }`}>
                  {isDone ? 'COMPLETED ✓' : 'TAP TO LOG'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetTracker;
