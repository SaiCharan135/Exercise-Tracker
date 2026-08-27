const WorkoutPlan = require('../models/WorkoutPlan');
const Exercise = require('../models/Exercise');
const DailyWorkout = require('../models/DailyWorkout');

/**
 * Service to generate daily workouts from WorkoutPlans based on day-of-week schedule.
 * Implements the 7-Day Workout System: Exactly 4 exercises per day (28 total weekly slots).
 */
class WorkoutRotationService {
  static async getOrCreateTodayWorkout(userId, dateStr) {
    let dailyWorkout = await DailyWorkout.findOne({ userId, date: dateStr });
    if (dailyWorkout && dailyWorkout.exercises && dailyWorkout.exercises.length === 4) {
      return dailyWorkout;
    }

    const dateObj = new Date(dateStr);
    const dayOfWeek = dateObj.getDay();

    let plan = await WorkoutPlan.findOne({ targetDayOfWeek: dayOfWeek }).populate('exercises.exerciseId');

    let workoutTitle = 'Full Body Dumbbell Power';
    let exerciseSnapshots = [];

    if (plan && plan.exercises && plan.exercises.length > 0) {
      workoutTitle = plan.title;
      // Guarantee exactly 4 exercises
      exerciseSnapshots = plan.exercises.slice(0, 4).map(item => ({
        exerciseId: item.exerciseId ? item.exerciseId._id : null,
        name: item.exerciseId ? item.exerciseId.name : 'Dumbbell Exercise',
        muscleGroup: item.exerciseId ? item.exerciseId.muscleGroup : 'Full Body',
        targetSets: item.sets || 3,
        targetReps: item.reps || 10,
        restSeconds: item.restSeconds || 60,
        completedSets: [],
        isCompleted: false,
        isSkipped: false
      }));
    } else {
      const fallback4Exercises = [
        { name: 'Goblet Squat', muscleGroup: 'Legs', targetSets: 3, targetReps: 12, restSeconds: 60 },
        { name: 'Dumbbell Floor Press', muscleGroup: 'Chest', targetSets: 3, targetReps: 10, restSeconds: 60 },
        { name: 'One-Arm Dumbbell Row', muscleGroup: 'Back', targetSets: 3, targetReps: 10, restSeconds: 60 },
        { name: 'Dumbbell Shoulder Press', muscleGroup: 'Shoulders', targetSets: 3, targetReps: 10, restSeconds: 60 }
      ];

      exerciseSnapshots = fallback4Exercises.map(ex => ({
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        targetSets: ex.targetSets,
        targetReps: ex.targetReps,
        restSeconds: ex.restSeconds,
        completedSets: [],
        isCompleted: false,
        isSkipped: false
      }));
    }

    if (dailyWorkout) {
      dailyWorkout.exercises = exerciseSnapshots;
      dailyWorkout.title = workoutTitle;
      await dailyWorkout.save();
    } else {
      dailyWorkout = await DailyWorkout.create({
        userId,
        date: dateStr,
        title: workoutTitle,
        status: 'NOT_STARTED',
        exercises: exerciseSnapshots
      });
    }

    return dailyWorkout;
  }
}

module.exports = WorkoutRotationService;
