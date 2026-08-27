const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dumbbell_daily';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning]: Could not connect to MongoDB (${error.message}). Running in mock fallback memory mode for local demonstration.`);
  }
};

module.exports = connectDB;
