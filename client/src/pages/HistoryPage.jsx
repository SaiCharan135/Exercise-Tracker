import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, Dumbbell, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

const HistoryPage = () => {
  const { completedWorkoutsHistory, startWorkout } = useWorkout();
  const navigate = useNavigate();

  const handleStartToday = () => {
    startWorkout();
    navigate('/workout');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">Workout History</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Complete log of your completed 4-exercise daily workouts.
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#30363D] text-xs font-semibold text-[#00F0FF]">
          <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
          <span>{completedWorkoutsHistory.length} Sessions Completed</span>
        </div>
      </div>

      {completedWorkoutsHistory.length === 0 ? (
        /* Empty Clean State */
        <div className="p-8 lg:p-12 rounded-3xl bg-[#161B22] border border-[#30363D] text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 flex items-center justify-center mx-auto">
            <Dumbbell className="w-8 h-8 transform -rotate-12" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No Workouts Completed Yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Your workout history is clean! Complete today's 4 required exercises to log your first workout session.
            </p>
          </div>

          <button
            onClick={handleStartToday}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-black font-extrabold text-xs py-3.5 px-6 rounded-xl hover:brightness-110 shadow-lg shadow-[#00F0FF]/20 transition-all"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START TODAY'S 4-EXERCISE WORKOUT</span>
          </button>
        </div>
      ) : (
        /* Logged Sessions List */
        <div className="space-y-4">
          {completedWorkoutsHistory.map((session, idx) => (
            <div
              key={session.id || idx}
              className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#00F0FF]/40 transition-all space-y-4 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363D] pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#10B981]/20 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{session.dateFormatted || session.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{session.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <div className="flex items-center space-x-1 text-amber-400 bg-[#0D1117] px-3 py-1 rounded-lg border border-[#30363D]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{session.durationMins || 30} mins</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#10B981]/20 text-emerald-400 font-bold border border-[#10B981]/30">
                    4 / 4 Completed ✓
                  </span>
                </div>
              </div>

              {session.exercises && session.exercises.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {session.exercises.map((ex, exIdx) => (
                    <div key={exIdx} className="p-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center space-x-2">
                      <Dumbbell className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                      <span className="font-medium text-gray-300 truncate">{ex}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
