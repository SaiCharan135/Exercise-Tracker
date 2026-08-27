const express = require('express');
const router = express.Router();
const { getProgressStats, getStreak } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/stats', getProgressStats);
router.get('/streak', getStreak);

module.exports = router;
