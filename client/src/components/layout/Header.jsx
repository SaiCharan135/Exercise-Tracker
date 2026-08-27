import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Settings, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { user } = useAuth();
  const { streakStats } = useWorkout();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-20 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#30363D] px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Greeting Title */}
      <div className="flex items-center space-x-3">
        <div className="lg:hidden w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-black transform -rotate-12" />
        </div>
        <div>
          <h2 className="text-base lg:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {getGreeting()}, <span className="text-[#00F0FF]">{user?.name || 'Beast'}</span>! 👋
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            {todayFormatted} • Ready for today's 4 dumbbell exercises?
          </p>
        </div>
      </div>

      {/* Right Action Header Bar */}
      <div className="flex items-center space-x-2.5">
        {/* Mobile Streak Pill */}
        <div className="lg:hidden flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-orange-400" />
          <span>{streakStats.currentStreak}d</span>
        </div>

        {/* Equipment Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#30363D] text-xs font-medium text-gray-300">
          <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
          <span>2 × 7 KG Gear</span>
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-gray-400 hover:text-white transition-colors"
          title="Toggle Theme Mode"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Settings Navigation Icon Button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-[#00F0FF] hover:bg-[#00F0FF]/15 transition-all shadow-sm"
          title="App Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
