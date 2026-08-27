const express = require('express');
const router = express.Router();
const { updateProfile, getReminders, updateReminders } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.put('/profile', updateProfile);
router.get('/reminders', getReminders);
router.put('/reminders', updateReminders);

module.exports = router;
