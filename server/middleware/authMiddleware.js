const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dumbbell_daily_jwt_secret_key_change_me_in_prod_2026');
    req.user = await User.findById(decoded.id).select('-passwordHash');
    if (!req.user) {
      // Demo mock user fallback if database ID was lost
      req.user = { _id: decoded.id, name: decoded.name || 'Demo User', email: decoded.email || 'demo@dumbbelldaily.com' };
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token verification failed or expired' });
  }
};

module.exports = { protect };
