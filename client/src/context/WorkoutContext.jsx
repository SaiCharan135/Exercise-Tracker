import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const WorkoutContext = createContext();

const MIN_EXERCISE_SECONDS = 300; // 5 minutes required per exercise

const DAILY_SCHEDULE_MAP = {
  0: {
    title: 'Sunday Active Dumbbell Routine',
    exercises: [
      { name: 'Goblet Squat', muscleGroup: 'Legs', targetSets: 3, targetReps: 12, restSeconds: 60 },
      { name: 'Dumbbell Romanian Deadlift', muscleGroup: 'Legs', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Shoulder Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Russian Twist', muscleGroup: 'Abs/Core', targetSets: 3, targetReps: 15, restSeconds: 45 }
    ]
  },
  1: {
    title: 'Monday Full Body Dumbbell Power',
    exercises: [
      { name: 'Goblet Squat', muscleGroup: 'Legs', targetSets: 3, targetReps: 12, restSeconds: 60 },
      { name: 'Dumbbell Floor Press', muscleGroup: 'Chest', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'One-Arm Dumbbell Row', muscleGroup: 'Back', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Shoulder Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: 10, restSeconds: 60 }
    ]
  },
  2: {
    title: 'Tuesday Arms & Shoulders Blast',
    exercises: [
      { name: 'Dumbbell Bicep Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { name: 'Hammer Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { name: 'Dumbbell Lateral Raise', muscleGroup: 'Shoulders', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { name: 'Overhead Dumbbell Triceps Extension', muscleGroup: 'Triceps', targetSets: 3, targetReps: 12, restSeconds: 45 }
    ]
  },
  3: {
    title: 'Wednesday Lower Body & Legs Focus',
    exercises: [
      { name: 'Goblet Squat', muscleGroup: 'Legs', targetSets: 3, targetReps: 12, restSeconds: 60 },
      { name: 'Dumbbell Romanian Deadlift', muscleGroup: 'Legs', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Reverse Lunge', muscleGroup: 'Legs', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Calf Raise', muscleGroup: 'Legs', targetSets: 3, targetReps: 15, restSeconds: 45 }
    ]
  },
  4: {
    title: 'Thursday Back & Core Sculpt',
    exercises: [
      { name: 'Bent-Over Dumbbell Row', muscleGroup: 'Back', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Reverse Fly', muscleGroup: 'Back', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { name: 'Dumbbell Russian Twist', muscleGroup: 'Abs/Core', targetSets: 3, targetReps: 15, restSeconds: 45 },
      { name: 'Dumbbell Dead Bug Variation', muscleGroup: 'Abs/Core', targetSets: 3, targetReps: 12, restSeconds: 45 }
    ]
  },
  5: {
    title: 'Friday Chest & Arms Hypertrophy',
    exercises: [
      { name: 'Dumbbell Floor Press', muscleGroup: 'Chest', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Squeeze Press', muscleGroup: 'Chest', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Bicep Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: 12, restSeconds: 45 },
      { name: 'Dumbbell Triceps Kickback', muscleGroup: 'Triceps', targetSets: 3, targetReps: 12, restSeconds: 45 }
    ]
  },
  6: {
    title: 'Saturday Full Body Endurance',
    exercises: [
      { name: 'Dumbbell Deadlift', muscleGroup: 'Full Body', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Dumbbell Thruster', muscleGroup: 'Full Body', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'One-Arm Dumbbell Row', muscleGroup: 'Back', targetSets: 3, targetReps: 10, restSeconds: 60 },
      { name: 'Hammer Curl', muscleGroup: 'Biceps', targetSets: 3, targetReps: 12, restSeconds: 45 }
    ]
  }
};

export const WorkoutProvider = ({ children }) => {
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [exerciseTimers, setExerciseTimers] = useState({
    0: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false },
    1: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false },
    2: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false },
    3: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false }
  });

  const [restTimerSeconds, setRestTimerSeconds] = useState(0);
  const [isRestTimerActive, setIsRestTimerActive] = useState(false);

  const [streakStats, setStreakStats] = useState(() => {
    const saved = localStorage.getItem('dumbbell_daily_streak');
    if (saved) return JSON.parse(saved);
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalWorkoutsCompleted: 0,
      completedDates: []
    };
  });

  const [completedWorkoutsHistory, setCompletedWorkoutsHistory] = useState(() => {
    const saved = localStorage.getItem('dumbbell_daily_history');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [showCelebration, setShowCelebration] = useState(false);

  // Load active 4-exercise workout routine for TODAY (0=Sun..6=Sat)
  useEffect(() => {
    const todayObj = new Date();
    const todayStr = todayObj.toISOString().split('T')[0];
    const dayOfWeek = todayObj.getDay(); // 0 = Sunday ... 6 = Saturday

    const daySchedule = DAILY_SCHEDULE_MAP[dayOfWeek] || DAILY_SCHEDULE_MAP[6];

    API.get(`/workouts/today?date=${todayStr}`)
      .then(res => {
        if (res.data && res.data.workout && res.data.workout.exercises?.length === 4) {
          setTodayWorkout(res.data.workout);
        } else {
          // Guarantee 4 active exercises for today
          setTodayWorkout({
            _id: 'local_today_' + todayStr,
            date: todayStr,
            title: daySchedule.title,
            status: 'NOT_STARTED',
            exercises: daySchedule.exercises.map(ex => ({
              ...ex,
              completedSets: [],
              isCompleted: false,
              isSkipped: false
            }))
          });
        }
      })
      .catch(() => {
        // Fallback local routine for today
        setTodayWorkout({
          _id: 'local_today_' + todayStr,
          date: todayStr,
          title: daySchedule.title,
          status: 'NOT_STARTED',
          exercises: daySchedule.exercises.map(ex => ({
            ...ex,
            completedSets: [],
            isCompleted: false,
            isSkipped: false
          }))
        });
      });
  }, []);

  // Workout Total Elapsed Timer
  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Active Exercise 5-Minute Timer Countdown Tick
  useEffect(() => {
    let timer;
    const currentTimer = exerciseTimers[activeExerciseIndex];

    if (currentTimer && currentTimer.isRunning && currentTimer.remainingSeconds > 0) {
      timer = setInterval(() => {
        setExerciseTimers(prev => {
          const target = prev[activeExerciseIndex];
          if (!target || target.remainingSeconds <= 1) {
            markExerciseAsCompleted(activeExerciseIndex);
            return {
              ...prev,
              [activeExerciseIndex]: { remainingSeconds: 0, isRunning: false, isCompleted: true }
            };
          }
          return {
            ...prev,
            [activeExerciseIndex]: { ...target, remainingSeconds: target.remainingSeconds - 1 }
          };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeExerciseIndex, exerciseTimers]);

  // Rest Timer Tick
  useEffect(() => {
    let timer;
    if (isRestTimerActive && restTimerSeconds > 0) {
      timer = setInterval(() => {
        setRestTimerSeconds(prev => {
          if (prev <= 1) {
            setIsRestTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRestTimerActive, restTimerSeconds]);

  const startWorkout = () => {
    setIsTimerRunning(true);
    if (todayWorkout) {
      setTodayWorkout(prev => ({ ...prev, status: 'IN_PROGRESS' }));
    }
    startActiveExerciseTimer(0);
  };

  const startActiveExerciseTimer = (index = activeExerciseIndex) => {
    setExerciseTimers(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        remainingSeconds: prev[index]?.remainingSeconds || MIN_EXERCISE_SECONDS,
        isRunning: true
      }
    }));
  };

  const pauseActiveExerciseTimer = (index = activeExerciseIndex) => {
    setExerciseTimers(prev => ({
      ...prev,
      [index]: { ...prev[index], isRunning: false }
    }));
  };

  const restartExerciseTimer = (index = activeExerciseIndex) => {
    setExerciseTimers(prev => ({
      ...prev,
      [index]: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false }
    }));

    if (todayWorkout && todayWorkout.exercises) {
      const updatedExercises = [...todayWorkout.exercises];
      if (updatedExercises[index]) {
        updatedExercises[index].isCompleted = false;
        setTodayWorkout({ ...todayWorkout, exercises: updatedExercises });
      }
    }
  };

  const markExerciseAsCompleted = (exerciseIndex) => {
    if (!todayWorkout) return;

    const updatedExercises = [...todayWorkout.exercises];
    if (updatedExercises[exerciseIndex]) {
      updatedExercises[exerciseIndex].isCompleted = true;
    }

    const all4Done = updatedExercises.every(ex => ex.isCompleted);
    const newStatus = all4Done ? 'COMPLETED' : 'IN_PROGRESS';

    setTodayWorkout(prev => ({
      ...prev,
      status: newStatus,
      exercises: updatedExercises
    }));

    setRestTimerSeconds(60);
    setIsRestTimerActive(true);
  };

  const startRestTimer = (seconds = 60) => {
    setRestTimerSeconds(seconds);
    setIsRestTimerActive(true);
  };

  const logSet = (exerciseIndex, setNumber, reps, weight = 7) => {
    if (!todayWorkout) return;

    const updatedExercises = [...todayWorkout.exercises];
    const targetEx = { ...updatedExercises[exerciseIndex] };

    const newCompletedSets = [...(targetEx.completedSets || [])];
    const existingIdx = newCompletedSets.findIndex(s => s.setNumber === setNumber);

    if (existingIdx >= 0) {
      newCompletedSets[existingIdx] = { setNumber, reps, weight, completedAt: new Date().toISOString() };
    } else {
      newCompletedSets.push({ setNumber, reps, weight, completedAt: new Date().toISOString() });
    }

    targetEx.completedSets = newCompletedSets;
    updatedExercises[exerciseIndex] = targetEx;

    setTodayWorkout(prev => ({ ...prev, exercises: updatedExercises }));
    startRestTimer(targetEx.restSeconds || 60);
  };

  const finishWorkout = (notes = '') => {
    setIsTimerRunning(false);
    const todayStr = new Date().toISOString().split('T')[0];

    const completedEntry = {
      id: 'workout_' + Date.now(),
      date: todayStr,
      dateFormatted: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      title: todayWorkout?.title || 'Daily 4-Exercise Workout',
      durationMins: Math.max(20, Math.round(elapsedSeconds / 60)),
      notes,
      exercises: todayWorkout?.exercises?.map(e => e.name) || []
    };

    const newHistory = [completedEntry, ...completedWorkoutsHistory];
    setCompletedWorkoutsHistory(newHistory);
    localStorage.setItem('dumbbell_daily_history', JSON.stringify(newHistory));

    const isNewDay = !streakStats.completedDates.includes(todayStr);
    const newCompletedDates = isNewDay ? [...streakStats.completedDates, todayStr] : streakStats.completedDates;
    const newStreak = isNewDay ? streakStats.currentStreak + 1 : streakStats.currentStreak;

    const newStats = {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streakStats.longestStreak),
      totalWorkoutsCompleted: newHistory.length,
      completedDates: newCompletedDates
    };

    setStreakStats(newStats);
    localStorage.setItem('dumbbell_daily_streak', JSON.stringify(newStats));

    setTodayWorkout(prev => ({ ...prev, status: 'COMPLETED' }));
    setShowCelebration(true);
  };

  const resetAllWorkoutData = () => {
    const cleanStats = { currentStreak: 0, longestStreak: 0, totalWorkoutsCompleted: 0, completedDates: [] };
    setStreakStats(cleanStats);
    setCompletedWorkoutsHistory([]);
    setExerciseTimers({
      0: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false },
      1: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false },
      2: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false },
      3: { remainingSeconds: MIN_EXERCISE_SECONDS, isRunning: false, isCompleted: false }
    });
    localStorage.removeItem('dumbbell_daily_streak');
    localStorage.removeItem('dumbbell_daily_history');
    localStorage.removeItem('active_workout_session');
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayWorkout,
        activeExerciseIndex,
        setActiveExerciseIndex,
        elapsedSeconds,
        isTimerRunning,
        exerciseTimers,
        restTimerSeconds,
        isRestTimerActive,
        streakStats,
        completedWorkoutsHistory,
        showCelebration,
        setShowCelebration,
        startWorkout,
        startActiveExerciseTimer,
        pauseActiveExerciseTimer,
        restartExerciseTimer,
        markExerciseAsCompleted,
        startRestTimer,
        logSet,
        finishWorkout,
        resetAllWorkoutData
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);
