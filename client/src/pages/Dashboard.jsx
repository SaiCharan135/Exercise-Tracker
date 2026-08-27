import React from 'react';
import TodayWorkoutCard from '../components/dashboard/TodayWorkoutCard';
import StreakCard from '../components/dashboard/StreakCard';
import WeeklyActivity from '../components/dashboard/WeeklyActivity';
import { Dumbbell, Target, Zap, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top Hero Grid: Today's Workout & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayWorkoutCard />
        </div>
        <div>
          <StreakCard />
        </div>
      </div>

      {/* Weekly Activity Row */}
      <WeeklyActivity />

      {/* Quick Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Monthly Workouts</div>
            <div className="text-xl font-extrabold text-white">18 Sessions</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Completion Rate</div>
            <div className="text-xl font-extrabold text-white">86% Target</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Volume Lifted</div>
            <div className="text-xl font-extrabold text-white">3,150 KG</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Avg Workout Time</div>
            <div className="text-xl font-extrabold text-white">34 Mins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
