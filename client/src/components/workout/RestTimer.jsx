import React from 'react';
import { Play, Pause, RotateCcw, Plus, Volume2 } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

const RestTimer = () => {
  const {
    restSecondsLeft,
    isRestTimerActive,
    addRestTime,
    pauseRestTimer,
    resumeRestTimer,
    resetRestTimer
  } = useWorkout();

  if (restSecondsLeft <= 0 && !isRestTimerActive) return null;

  const minutes = Math.floor(restSecondsLeft / 60);
  const seconds = restSecondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#0066FF]/20 via-[#00F0FF]/15 to-[#161B22] border border-[#00F0FF]/40 p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF] animate-pulse">
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#00F0FF]">REST TIMER</div>
          <div className="text-3xl font-black font-timer text-white tracking-tight">{formattedTime}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {isRestTimerActive ? (
          <button
            onClick={pauseRestTimer}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1F242C] hover:bg-[#30363D] text-gray-200 border border-[#30363D] text-xs font-semibold"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={resumeRestTimer}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#00F0FF] text-black hover:brightness-110 text-xs font-bold"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Resume</span>
          </button>
        )}

        <button
          onClick={() => addRestTime(30)}
          className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-[#1F242C] hover:bg-[#30363D] text-gray-200 border border-[#30363D] text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>30s</span>
        </button>

        <button
          onClick={resetRestTimer}
          className="p-2 rounded-xl bg-[#1F242C] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-[#30363D] transition-colors"
          title="Reset Rest Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RestTimer;
