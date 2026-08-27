import React from 'react';
import { Flame, Trophy, CalendarCheck } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

const StreakCard = () => {
  const { streakStats } = useWorkout();

  return (
    <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 shadow-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-[#00F0FF] text-xs font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
          <span>Consistency Streak</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] font-semibold border border-[#CCFF00]/30">
          Daily Target: 1 Session
        </span>
      </div>

      <div className="flex items-baseline space-x-3 mb-6">
        <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
          {streakStats.currentStreak}
        </span>
        <span className="text-lg font-bold text-gray-400">DAYS</span>
      </div>

      {/* Streak Meta Cards */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#30363D]">
        <div className="bg-[#0D1117] p-3 rounded-xl border border-[#30363D] flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-medium">Longest</div>
            <div className="text-xs font-bold text-white">{streakStats.longestStreak} Days</div>
          </div>
        </div>

        <div className="bg-[#0D1117] p-3 rounded-xl border border-[#30363D] flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-medium">Total Days</div>
            <div className="text-xs font-bold text-white">{streakStats.totalCompletedDays} Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
