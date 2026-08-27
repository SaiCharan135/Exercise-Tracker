const User = require('../models/User');
const Reminder = require('../models/Reminder');

// @desc Update user profile & preferences
// @route PUT /api/user/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, preferences, equipment } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    if (equipment) user.equipment = equipment;

    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc Get user reminder settings
// @route GET /api/reminders
exports.getReminders = async (req, res, next) => {
  try {
    let reminder = await Reminder.findOne({ userId: req.user._id });
    if (!reminder) {
      reminder = await Reminder.create({
        userId: req.user._id,
        enabled: true,
        reminderTime: '07:00'
      });
    }
    res.status(200).json({ success: true, reminder });
  } catch (error) {
    next(error);
  }
};

// @desc Update user reminder settings
// @route PUT /api/reminders
exports.updateReminders = async (req, res, next) => {
  try {
    const { enabled, reminderTime } = req.body;
    let reminder = await Reminder.findOne({ userId: req.user._id });
    if (!reminder) {
      reminder = new Reminder({ userId: req.user._id });
    }

    if (typeof enabled === 'boolean') reminder.enabled = enabled;
    if (reminderTime) reminder.reminderTime = reminderTime;

    await reminder.save();
    res.status(200).json({ success: true, reminder });
  } catch (error) {
    next(error);
  }
};
