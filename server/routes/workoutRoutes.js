const express = require('express');
const router = express.Router();
const {
  getTodayWorkout,
  startWorkout,
  logSet,
  completeWorkout,
  getWorkoutHistory
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/today', getTodayWorkout);
router.get('/', getWorkoutHistory);
router.post('/:id/start', startWorkout);
router.put('/:id/sets', logSet);
router.put('/:id/complete', completeWorkout);

module.exports = router;
