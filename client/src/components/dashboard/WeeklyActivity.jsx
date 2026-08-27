import React from 'react';
import { Check, Flame } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

const WeeklyActivity = () => {
  const { streakStats } = useWorkout();
  const completedDates = streakStats?.completedDates || [];

  const todayObj = new Date();
  const currentDayOfWeek = (todayObj.getDay() + 6) % 7; // Convert Sun=0..Sat=6 to Mon=0..Sun=6

  const daysList = [
    { label: 'MON', dayIndex: 1 },
    { label: 'TUE', dayIndex: 2 },
    { label: 'WED', dayIndex: 3 },
    { label: 'THU', dayIndex: 4 },
    { label: 'FRI', dayIndex: 5 },
    { label: 'SAT', dayIndex: 6 },
    { label: 'SUN', dayIndex: 0 },
  ];

  return (
    <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 shadow-md select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            This Week's 7-Day Workout Routine
          </h3>
        </div>
        <span className="text-xs text-[#00F0FF] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20">
          7 / 7 Days Active (No Rest Days)
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysList.map((item, idx) => {
          const isToday = item.dayIndex === todayObj.getDay();

          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                isToday
                  ? 'bg-gradient-to-b from-[#0066FF]/20 to-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] shadow-lg shadow-[#00F0FF]/20'
                  : 'bg-[#0D1117] border-[#30363D] text-gray-300 hover:border-[#00F0FF]/30'
              }`}
            >
              <span className={`text-[10px] font-bold mb-1 ${isToday ? 'text-[#00F0FF]' : 'text-gray-400'}`}>
                {item.label}
              </span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                {isToday ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                ) : (
                  <span className="text-[10px] text-gray-500 font-mono">4 Ex</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyActivity;
