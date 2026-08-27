import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Dumbbell,
  AlertTriangle,
  Eye,
  ShieldAlert,
  Flame,
  Timer
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import SetTracker from '../components/workout/SetTracker';
import RestTimer from '../components/workout/RestTimer';
import CelebrationModal from '../components/workout/CelebrationModal';
import ExerciseDemoModal from '../components/exercise/ExerciseDemoModal';
import { ExerciseDiagram } from '../utils/exerciseDiagrams';

const WorkoutPage = () => {
  const {
    todayWorkout,
    activeExerciseIndex,
    setActiveExerciseIndex,
    elapsedSeconds,
    exerciseTimers,
    startWorkout,
    startActiveExerciseTimer,
    pauseActiveExerciseTimer,
    restartExerciseTimer,
    finishWorkout
  } = useWorkout();

  const [notes, setNotes] = useState('');
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [incompleteWarning, setIncompleteWarning] = useState(false);

  if (!todayWorkout) {
    return <div className="p-8 text-center text-gray-400">Loading today's 4-exercise routine...</div>;
  }

  const exercises = todayWorkout.exercises?.slice(0, 4) || [];
  const currentExercise = exercises[activeExerciseIndex] || exercises[0];
  const totalExercises = 4;
  const isStarted = todayWorkout.status === 'IN_PROGRESS' || todayWorkout.status === 'COMPLETED';

  // 5-Minute Timer state for active exercise
  const currentTimerData = exerciseTimers[activeExerciseIndex] || { remainingSeconds: 300, isRunning: false, isCompleted: false };
  const { remainingSeconds, isRunning: isTimerRunning, isCompleted: isExerciseTimerDone } = currentTimerData;

  const formatMinSec = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const timerProgressPercent = Math.round(((300 - remainingSeconds) / 300) * 100);

  const handleSelectExerciseTab = (idx) => {
    // If switching away before 5 minutes timer completes, warn user that switching resets timer from 5:00
    const activeTimer = exerciseTimers[activeExerciseIndex];
    if (activeTimer && !activeTimer.isCompleted && activeTimer.remainingSeconds < 300 && activeTimer.remainingSeconds > 0) {
      setIncompleteWarning(true);
    }
    setActiveExerciseIndex(idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      <CelebrationModal />

      {/* Demo Modal Launcher */}
      {showDemoModal && currentExercise && (
        <ExerciseDemoModal
          exercise={currentExercise}
          onClose={() => setShowDemoModal(false)}
        />
      )}

      {/* Top Session Bar */}
      <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-5 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#00F0FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>DAILY WORKOUT — NO REST DAYS (7 DAYS ACTIVE)</span>
          </div>
          <h1 className="text-xl font-extrabold text-white">
            Exercise {activeExerciseIndex + 1} of 4 • Minimum 5 Mins Required Per Exercise
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-[#0D1117] px-4 py-2 rounded-xl border border-[#30363D] flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-mono font-bold text-white">{formatMinSec(elapsedSeconds)}</span>
          </div>

          {!isStarted ? (
            <button
              onClick={startWorkout}
              className="flex items-center space-x-2 bg-[#00F0FF] text-black font-extrabold px-5 py-3 rounded-xl hover:brightness-110 shadow-md shadow-[#00F0FF]/20"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>START WORKOUT (5-MIN TIMER)</span>
            </button>
          ) : (
            <button
              onClick={() => setShowFinishConfirm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold px-4 py-2.5 rounded-xl hover:brightness-110 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              <span>FINISH WORKOUT</span>
            </button>
          )}
        </div>
      </div>

      <RestTimer />

      {/* 4-Exercise Selector Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {exercises.map((ex, idx) => {
          const isCurrent = idx === activeExerciseIndex;
          const timerData = exerciseTimers[idx] || {};
          const isDone = ex.isCompleted || timerData.isCompleted;

          return (
            <button
              key={idx}
              onClick={() => handleSelectExerciseTab(idx)}
              className={`p-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
                isCurrent
                  ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/30 scale-102'
                  : isDone
                  ? 'bg-[#10B981]/20 text-emerald-400 border border-[#10B981]/40'
                  : 'bg-[#161B22] text-gray-400 border border-[#30363D]'
              }`}
            >
              <div className="flex items-center space-x-1">
                <span>Ex {idx + 1}</span>
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : <Timer className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <span className="text-[10px] font-normal truncate max-w-full">{ex.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Exercise Focus Card */}
      {currentExercise && (
        <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 lg:p-8 space-y-6 shadow-xl relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-[#30363D] pb-5">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00F0FF] px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                  TARGET: {currentExercise.muscleGroup || 'Full Body'}
                </span>
                <span className="text-xs font-semibold text-gray-400 bg-[#0D1117] px-2 py-0.5 rounded-lg border border-[#30363D]">
                  2 × 7 KG
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-black text-white">{currentExercise.name}</h2>
              <p className="text-xs text-gray-400">Must complete 5 minutes timer for this exercise to be marked DONE ✓</p>

              {/* VIEW DEMO BUTTON */}
              <div className="pt-2">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0D1117] text-[#00F0FF] border border-[#00F0FF]/40 hover:bg-[#00F0FF]/20 text-xs font-bold transition-all"
                >
                  <Eye className="w-4 h-4 text-[#00F0FF]" />
                  <span>VIEW REAL EXERCISE DEMO</span>
                </button>
              </div>
            </div>

            {/* Visual Vector/Photo Diagram */}
            <div className="w-full">
              <ExerciseDiagram name={currentExercise.name} className="w-full h-36" />
            </div>
          </div>

          {/* 5-MINUTE MANDATORY COUNTDOWN TIMER WIDGET */}
          <div className="p-5 rounded-2xl bg-[#0D1117] border border-[#00F0FF]/40 space-y-4 text-center">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Timer className="w-4 h-4 text-[#00F0FF]" />
                <span>5-Minute Required Exercise Timer</span>
              </span>
              <span className={isExerciseTimerDone ? 'text-emerald-400 font-extrabold' : 'text-amber-400 font-mono'}>
                {isExerciseTimerDone ? '5 / 5 MINS COMPLETED ✓' : `${timerProgressPercent}% Elapsed`}
              </span>
            </div>

            {/* Big Digit Timer Display */}
            <div className="text-4xl lg:text-5xl font-black font-mono text-white tracking-wider my-2">
              {formatMinSec(remainingSeconds)}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-[#161B22] border border-[#30363D] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0066FF] to-[#00F0FF] transition-all duration-500"
                style={{ width: `${timerProgressPercent}%` }}
              />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center space-x-3 pt-2">
              {isExerciseTimerDone ? (
                <div className="flex items-center space-x-2 bg-[#10B981]/20 text-emerald-400 px-5 py-2.5 rounded-xl border border-[#10B981]/40 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  <span>5-MINUTES COMPLETED ✓ (EXERCISE DONE)</span>
                </div>
              ) : isTimerRunning ? (
                <button
                  onClick={() => pauseActiveExerciseTimer(activeExerciseIndex)}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30"
                >
                  <Pause className="w-4 h-4 fill-amber-400" />
                  <span>PAUSE TIMER</span>
                </button>
              ) : (
                <button
                  onClick={() => startActiveExerciseTimer(activeExerciseIndex)}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#00F0FF] text-black font-extrabold text-xs hover:brightness-110 shadow-lg shadow-[#00F0FF]/20"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>START 5-MIN TIMER</span>
                </button>
              )}

              <button
                onClick={() => restartExerciseTimer(activeExerciseIndex)}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#161B22] text-gray-400 hover:text-white border border-[#30363D] text-xs font-semibold"
                title="Restart 5-minute timer from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart 05:00</span>
              </button>
            </div>
          </div>

          {/* Set Tracker Matrix */}
          <SetTracker exercise={currentExercise} exerciseIndex={activeExerciseIndex} />

          {/* Footer Action Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#30363D] gap-2">
            <button
              onClick={() => handleSelectExerciseTab(Math.max(0, activeExerciseIndex - 1))}
              disabled={activeExerciseIndex === 0}
              className="flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-gray-300 hover:text-white disabled:opacity-40 text-xs font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Exercise</span>
            </button>

            <button
              onClick={() => handleSelectExerciseTab(Math.min(3, activeExerciseIndex + 1))}
              disabled={activeExerciseIndex === totalExercises - 1}
              className="flex items-center space-x-1.5 px-5 py-3 rounded-xl bg-[#00F0FF] text-black hover:brightness-110 disabled:opacity-40 text-xs font-black shadow-lg shadow-[#00F0FF]/20"
            >
              <span>Next Exercise</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Completion Confirmation Modal */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Complete Workout Session?</h3>
            <p className="text-xs text-gray-400">
              Your 5-minute exercise completions will be saved to your active daily streak!
            </p>

            <textarea
              placeholder="Add optional workout notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
              rows={3}
            />

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-gray-400 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowFinishConfirm(false);
                  finishWorkout(notes);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00F0FF] text-black font-extrabold text-xs hover:brightness-110"
              >
                Confirm & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;
