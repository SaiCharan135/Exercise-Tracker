import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, Flame, Clock, Dumbbell, CheckCircle2, ArrowRight } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

const CelebrationModal = () => {
  const { showCelebration, setShowCelebration, streakStats, todayWorkout } = useWorkout();
  const navigate = useNavigate();

  useEffect(() => {
    if (showCelebration) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [showCelebration]);

  if (!showCelebration) return null;

  const totalExercises = todayWorkout?.exercises?.length || 5;
  const completedExercises = todayWorkout?.exercises?.filter(ex => ex.isCompleted).length || totalExercises;
  const totalSets = completedExercises * 3;

  const handleClose = () => {
    setShowCelebration(false);
    navigate('/progress');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#161B22] border border-[#00F0FF]/40 rounded-3xl p-6 lg:p-8 shadow-2xl text-center space-y-6 overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Celebration Trophy Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center shadow-xl shadow-[#00F0FF]/30">
          <Trophy className="w-10 h-10 text-black fill-black" />
        </div>

        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            WORKOUT COMPLETE! 🎉
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Outstanding session! You logged your daily dumbbell routine.
          </p>
        </div>

        {/* Summary Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0D1117] border border-[#30363D]">
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-400 text-[10px] font-medium mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Duration</span>
            </div>
            <div className="text-sm font-extrabold text-white">35 Mins</div>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-400 text-[10px] font-medium mb-1">
              <Dumbbell className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Exercises</span>
            </div>
            <div className="text-sm font-extrabold text-white">{completedExercises} Done</div>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-400 text-[10px] font-medium mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total Sets</span>
            </div>
            <div className="text-sm font-extrabold text-white">{totalSets} Sets</div>
          </div>
        </div>

        {/* Streak Update Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1F242C] to-[#161B22] border border-orange-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
              <Flame className="w-6 h-6 fill-orange-400 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400 font-medium">Active Streak Updated</div>
              <div className="text-base font-extrabold text-white">{streakStats.currentStreak} Days Consecutive 🔥</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-black font-extrabold py-4 rounded-xl shadow-lg shadow-[#00F0FF]/20 hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <span>VIEW PROGRESS DASHBOARD</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;
