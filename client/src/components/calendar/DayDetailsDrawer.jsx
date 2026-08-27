import React from 'react';
import { X, CheckCircle2, Clock, Dumbbell, ShieldCheck } from 'lucide-react';

const DayDetailsDrawer = ({ dayData, onClose }) => {
  if (!dayData) return null;

  const isCompleted = dayData.status === 'completed';

  const default4Exercises = [
    'Goblet Squat',
    'Dumbbell Floor Press',
    'One-Arm Dumbbell Row',
    'Dumbbell Shoulder Press'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#161B22] border border-[#30363D] rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-2xl ${isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold">{dayData.dateFormatted}</div>
            <h3 className="text-lg font-bold text-white">{dayData.title || 'Full Body Dumbbell Routine'}</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-center text-xs">
          <div>
            <div className="text-gray-400 text-[10px]">Daily Status</div>
            <div className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-gray-400'}`}>
              {isCompleted ? '4 / 4 Completed ✓' : 'Incomplete'}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Duration</div>
            <div className="font-bold text-white">35 Mins</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Equipment</div>
            <div className="font-bold text-[#00F0FF]">2 × 7 KG</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">4 REQUIRED EXERCISES</div>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {default4Exercises.map((name, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center">
                    ✓
                  </div>
                  <span className="font-semibold text-white">{name}</span>
                </div>
                <span className="text-gray-400 font-mono text-[11px]">3 Sets × 10 Reps</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetailsDrawer;
