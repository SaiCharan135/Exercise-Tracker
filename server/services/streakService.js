const Streak = require('../models/Streak');
const DailyWorkout = require('../models/DailyWorkout');

/**
 * Service to process and update user streak upon workout completion.
 * Ensures:
 * 1. Multiple completed workouts on the same calendar day count as 1 completed day.
 * 2. Consecutive completed days increment streak.
 * 3. Missed days reset active streak appropriately.
 */
class StreakService {
  static async calculateAndUpdateStreak(userId, workoutDate) {
    let streakDoc = await Streak.findOne({ userId });
    if (!streakDoc) {
      streakDoc = new Streak({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        totalCompletedDays: 0,
        completedDates: []
      });
    }

    // Add workout date if not already included
    if (!streakDoc.completedDates.includes(workoutDate)) {
      streakDoc.completedDates.push(workoutDate);
    }

    // Sort all completed dates chronologically
    const sortedDates = [...new Set(streakDoc.completedDates)].sort();

    let currentStreak = 0;
    let maxStreak = 0;
    let totalDays = sortedDates.length;

    if (sortedDates.length > 0) {
      // Calculate streak backwards from the latest date
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      let tempStreak = 1;
      maxStreak = 1;

      for (let i = sortedDates.length - 1; i > 0; i--) {
        const currentDate = new Date(sortedDates[i]);
        const prevDate = new Date(sortedDates[i - 1]);
        const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          tempStreak += 1;
        } else if (diffDays > 1) {
          if (tempStreak > maxStreak) maxStreak = tempStreak;
          tempStreak = 1;
        }
      }

      if (tempStreak > maxStreak) maxStreak = tempStreak;

      // Determine active streak based on whether latest workout was today or yesterday
      const latestCompleted = sortedDates[sortedDates.length - 1];
      if (latestCompleted === today || latestCompleted === yesterday) {
        currentStreak = tempStreak;
      } else {
        currentStreak = 0;
      }
    }

    streakDoc.currentStreak = currentStreak;
    if (maxStreak > streakDoc.longestStreak) {
      streakDoc.longestStreak = maxStreak;
    }
    streakDoc.totalCompletedDays = totalDays;
    streakDoc.lastCompletedDate = workoutDate;

    await streakDoc.save();
    return streakDoc;
  }

  static async getStreak(userId) {
    let streakDoc = await Streak.findOne({ userId });
    if (!streakDoc) {
      streakDoc = await Streak.create({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        totalCompletedDays: 0,
        completedDates: []
      });
    }
    return streakDoc;
  }
}

module.exports = StreakService;
