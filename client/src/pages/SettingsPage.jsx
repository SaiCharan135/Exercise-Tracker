import React, { useState } from 'react';
import { Bell, Moon, Sun, Clock, ShieldCheck, Check, RotateCcw, Save, Dumbbell, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateProfile } = useAuth();

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('07:00');
  const [restDuration, setRestDuration] = useState('60');
  const [weightUnit, setWeightUnit] = useState('KG');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      preferences: {
        theme,
        defaultRestSeconds: parseInt(restDuration),
        preferredWorkoutTime: reminderTime,
        weightUnit
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetActiveWorkout = () => {
    localStorage.removeItem('active_workout_session');
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-2">
          App Settings <Sparkles className="w-6 h-6 text-[#00F0FF]" />
        </h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Customize workout preferences, themes, rest timers, and notification reminders.
        </p>
      </div>

      <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 lg:p-8 space-y-6 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Theme Selection */}
          <div className="flex items-center justify-between border-b border-[#30363D] pb-5">
            <div>
              <div className="font-bold text-sm text-white">Theme Display Mode</div>
              <div className="text-xs text-gray-400">Current mode: <span className="text-[#00F0FF] font-semibold uppercase">{theme}</span></div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs font-bold text-white hover:border-[#00F0FF]/50 transition-all shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Daily Reminder Setup */}
          <div className="space-y-4 border-b border-[#30363D] pb-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#00F0FF]" />
                  <span>Daily Workout Notification Reminder</span>
                </div>
                <div className="text-xs text-gray-400">Receive daily reminders to complete your 4 exercises</div>
              </div>

              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#00F0FF] rounded cursor-pointer"
              />
            </div>

            {reminderEnabled && (
              <div className="flex items-center space-x-3 pt-2">
                <label className="text-xs font-semibold text-gray-300">Preferred Reminder Time:</label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="p-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs font-mono text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            )}
          </div>

          {/* Default Rest Seconds */}
          <div className="space-y-3 border-b border-[#30363D] pb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Default Exercise Rest Period</span>
            </label>
            <select
              value={restDuration}
              onChange={(e) => setRestDuration(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white focus:outline-none focus:border-[#00F0FF]"
            >
              <option value="30">30 Seconds (Fast Pace)</option>
              <option value="45">45 Seconds (Standard Strength)</option>
              <option value="60">60 Seconds (Default Standard)</option>
              <option value="90">90 Seconds (Hypertrophy Rest)</option>
            </select>
          </div>

          {/* Weight Unit Preference */}
          <div className="space-y-3 border-b border-[#30363D] pb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#00F0FF]" />
              <span>Weight Unit Display</span>
            </label>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setWeightUnit('KG')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  weightUnit === 'KG'
                    ? 'bg-[#00F0FF] text-black border-[#00F0FF]'
                    : 'bg-[#0D1117] text-gray-400 border-[#30363D]'
                }`}
              >
                KG (Kilograms • 7 KG Default)
              </button>
              <button
                type="button"
                onClick={() => setWeightUnit('LBS')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  weightUnit === 'LBS'
                    ? 'bg-[#00F0FF] text-black border-[#00F0FF]'
                    : 'bg-[#0D1117] text-gray-400 border-[#30363D]'
                }`}
              >
                LBS (Pounds • 15 LBS Default)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#00F0FF] text-black font-extrabold text-sm hover:brightness-110 shadow-lg shadow-[#00F0FF]/20 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>PREFERENCES SAVED SUCCESSFULLY ✓</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>SAVE ALL PREFERENCES</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetActiveWorkout}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#0D1117] text-gray-400 hover:text-white border border-[#30363D] text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{resetSuccess ? 'ACTIVE SESSION DRAFT CLEARED ✓' : 'Clear Active Workout Session Draft'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
