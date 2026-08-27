const DailyWorkout = require('../models/DailyWorkout');
const WorkoutRotationService = require('../services/workoutRotationService');
const StreakService = require('../services/streakService');

// @desc Get Today's scheduled workout
// @route GET /api/workouts/today
exports.getTodayWorkout = async (req, res, next) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const workout = await WorkoutRotationService.getOrCreateTodayWorkout(req.user._id, todayStr);
    res.status(200).json({
      success: true,
      workout
    });
  } catch (error) {
    next(error);
  }
};

// @desc Start a workout session
// @route POST /api/workouts/:id/start
exports.startWorkout = async (req, res, next) => {
  try {
    const workout = await DailyWorkout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    workout.status = 'IN_PROGRESS';
    workout.startTime = workout.startTime || new Date();
    await workout.save();

    res.status(200).json({
      success: true,
      workout
    });
  } catch (error) {
    next(error);
  }
};

// @desc Log/toggle set completion
// @route PUT /api/workouts/:id/sets
exports.logSet = async (req, res, next) => {
  try {
    const { exerciseIndex, setIndex, repsCompleted, weightKg, completed } = req.body;
    const workout = await DailyWorkout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    if (workout.exercises[exerciseIndex]) {
      const exercise = workout.exercises[exerciseIndex];
      let setItemIndex = exercise.completedSets.findIndex(s => s.setIndex === setIndex);

      if (completed) {
        if (setItemIndex > -1) {
          exercise.completedSets[setItemIndex].repsCompleted = repsCompleted || 10;
          exercise.completedSets[setItemIndex].weightKg = weightKg || 7;
        } else {
          exercise.completedSets.push({
            setIndex,
            repsCompleted: repsCompleted || 10,
            weightKg: weightKg || 7,
            completedAt: new Date()
          });
        }
      } else {
        if (setItemIndex > -1) {
          exercise.completedSets.splice(setItemIndex, 1);
        }
      }

      // Update exercise completion flag
      exercise.isCompleted = exercise.completedSets.length >= exercise.targetSets;
    }

    await workout.save();
    res.status(200).json({ success: true, workout });
  } catch (error) {
    next(error);
  }
};

// @desc Complete entire workout session
// @route PUT /api/workouts/:id/complete
exports.completeWorkout = async (req, res, next) => {
  try {
    const { durationSeconds, notes } = req.body;
    const workout = await DailyWorkout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    workout.status = 'COMPLETED';
    workout.endTime = new Date();
    workout.durationSeconds = durationSeconds || 2100; // default 35 mins
    workout.notes = notes || workout.notes;
    workout.completedAt = new Date();

    await workout.save();

    // Update user streak
    const streak = await StreakService.calculateAndUpdateStreak(req.user._id, workout.date);

    res.status(200).json({
      success: true,
      workout,
      streak
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all workout logs / history
// @route GET /api/workouts
exports.getWorkoutHistory = async (req, res, next) => {
  try {
    const workouts = await DailyWorkout.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts
    });
  } catch (error) {
    next(error);
  }
};
