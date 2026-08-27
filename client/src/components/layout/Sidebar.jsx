import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  Calendar,
  BarChart3,
  History,
  User,
  Settings,
  Flame,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { streakStats } = useWorkout();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Workouts', path: '/workout', icon: Dumbbell },
    { label: 'Exercises', path: '/exercises', icon: BookOpen },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Progress', path: '/progress', icon: BarChart3 },
    { label: 'History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-[#30363D] bg-[#161B22] min-h-screen fixed left-0 top-0 bottom-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#30363D] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center shadow-lg shadow-[#00F0FF]/20">
            <Dumbbell className="w-6 h-6 text-black font-bold transform -rotate-12" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-gray-200 to-[#00F0FF] bg-clip-text text-transparent">
              DUMBBELL DAILY
            </h1>
            <p className="text-[10px] text-[#00F0FF] font-medium tracking-wide uppercase">
              2 × 7 KG Edition
            </p>
          </div>
        </div>
      </div>

      {/* Streak Badge Widget */}
      <div className="mx-4 my-4 p-3.5 rounded-xl bg-gradient-to-r from-[#1F242C] to-[#161B22] border border-[#30363D] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
            <Flame className="w-5 h-5 fill-orange-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Active Streak</div>
            <div className="text-sm font-bold text-white">{streakStats.currentStreak} Days</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] font-semibold border border-[#CCFF00]/20">
          🔥 ON FIRE
        </span>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-[#00F0FF]/15 to-[#0066FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#1F242C]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#00F0FF]' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer User Profile Card */}
      <div className="p-4 border-t border-[#30363D] bg-[#0D1117]/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center font-bold text-sm">
              {user?.name ? user.name[0].toUpperCase() : 'B'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate max-w-[110px]">{user?.name || 'Beast'}</div>
              <div className="text-[10px] text-gray-400 truncate max-w-[110px]">2 × 7 KG Gear</div>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#30363D] transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
