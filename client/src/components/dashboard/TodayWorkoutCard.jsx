import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Clock, Dumbbell, Shield, Eye, Flame, Timer } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import ExerciseDemoModal from '../exercise/ExerciseDemoModal';

const TodayWorkoutCard = () => {
  const { todayWorkout, exerciseTimers = {}, startWorkout } = useWorkout();
  const [selectedDemoExercise, setSelectedDemoExercise] = useState(null);
  const navigate = useNavigate();

  if (!todayWorkout || !todayWorkout.exercises) return null;

  const exercises = todayWorkout.exercises.slice(0, 4);
  const totalExercises = 4;
  const safeExerciseTimers = exerciseTimers || {};

  const completedExercises = exercises.filter((ex, idx) => ex?.isCompleted || safeExerciseTimers[idx]?.isCompleted).length;
  const progressPercent = Math.round((completedExercises / totalExercises) * 100);
  const isCompleted = todayWorkout.status === 'COMPLETED' || completedExercises === 4;
  const isInProgress = todayWorkout.status === 'IN_PROGRESS';

  const dayOfWeekName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

  const handleStartOrContinue = () => {
    if (todayWorkout.status === 'NOT_STARTED') {
      if (typeof startWorkout === 'function') {
        startWorkout();
      }
    }
    navigate('/workout');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161B22] via-[#1A212C] to-[#0D1117] border border-[#30363D] p-6 lg:p-8 shadow-xl space-y-6">
      {/* Demo Modal Launcher Popup */}
      {selectedDemoExercise && (
        <ExerciseDemoModal
          exercise={selectedDemoExercise}
          onClose={() => setSelectedDemoExercise(null)}
        />
      )}

      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{dayOfWeekName} ACTIVE WORKOUT (7 DAYS ACTIVE)</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-400 font-medium bg-[#0D1117]/60 px-3 py-1 rounded-lg border border-[#30363D]">
          <Shield className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>2 × 7 KG Dumbbells</span>
        </div>
      </div>

      {/* Title & Meta */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">
          {todayWorkout.title || 'Daily Dumbbell Workout'}
        </h2>
        <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-300">
          <div className="flex items-center space-x-1.5 bg-[#1F242C] px-3 py-1.5 rounded-lg border border-[#30363D]">
            <Dumbbell className="w-4 h-4 text-[#00F0FF]" />
            <span>4 Required Exercises</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#1F242C] px-3 py-1.5 rounded-lg border border-[#30363D]">
            <Timer className="w-4 h-4 text-amber-400" />
            <span>Min 5 Mins / Exercise (20 Mins Total)</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#1F242C] px-3 py-1.5 rounded-lg border border-[#30363D]">
            <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
            <span>{completedExercises} / 4 Completed</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-2">
          <span>Daily 5-Minute Exercise Timer Completion</span>
          <span className="text-[#00F0FF]">{completedExercises} / 4 ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#0D1117] border border-[#30363D] overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-[#CCFF00] transition-all duration-500 ease-out shadow-lg shadow-[#00F0FF]/30"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Today's 4 Exercises Checklist Table */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {"TODAY'S 4 EXERCISES (5 MINS PER EXERCISE)"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {exercises.map((ex, idx) => {
            const timerData = safeExerciseTimers[idx] || {};
            const isDone = ex?.isCompleted || timerData.isCompleted;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-[#10B981]/15 border-[#10B981]/40 text-emerald-300'
                    : 'bg-[#0D1117] border-[#30363D] text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isDone ? 'bg-[#10B981] text-black' : 'bg-[#161B22] text-gray-400 border border-[#30363D]'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs text-white truncate">{ex.name}</div>
                    <div className="text-[10px] text-gray-400">Min 5 Mins Timer • 7 KG</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDemoExercise(ex)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#161B22] hover:bg-[#30363D] text-[#00F0FF] border border-[#30363D] text-[10px] font-bold shrink-0 ml-2"
                >
                  <Eye className="w-3 h-3" />
                  <span>DEMO</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start / Resume Action CTA */}
      <div className="pt-2">
        {isCompleted ? (
          <div className="flex items-center space-x-3 w-full bg-[#10B981]/15 border border-[#10B981]/30 p-4 rounded-xl text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold">🎉 DAY COMPLETED! (4 / 4 Exercises • 20 Mins Total)</div>
              <div className="text-xs text-emerald-400/80 font-normal">
                All 4 exercise 5-minute timers completed! Active streak incremented.
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleStartOrContinue}
            className="w-full group flex items-center justify-center space-x-3 bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-black font-extrabold text-base py-4 px-6 rounded-xl hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#00F0FF]/20"
          >
            <Play className="w-5 h-5 fill-black transform group-hover:scale-110 transition-transform" />
            <span>
              {isInProgress ? 'RESUME WORKOUT (5-MIN EXERCISE TIMERS)' : 'START WORKOUT (5-MIN EXERCISE TIMERS)'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodayWorkoutCard;
