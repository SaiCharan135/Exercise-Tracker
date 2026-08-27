import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { Trophy, Flame, Target, Clock, Dumbbell } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

const ProgressPage = () => {
  const { streakStats } = useWorkout();

  const weeklyVolumeData = [
    { week: 'W1', workouts: 4, duration: 140 },
    { week: 'W2', workouts: 5, duration: 175 },
    { week: 'W3', workouts: 6, duration: 210 },
    { week: 'W4', workouts: 5, duration: 175 },
    { week: 'W5 (Current)', workouts: 6, duration: 210 },
  ];

  const muscleDistributionData = [
    { name: 'Legs', value: 30, color: '#00F0FF' },
    { name: 'Shoulders', value: 25, color: '#CCFF00' },
    { name: 'Chest', value: 20, color: '#10B981' },
    { name: 'Back', value: 15, color: '#F59E0B' },
    { name: 'Arms', value: 10, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white">Progress Analytics</h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Visualize consistency, workout duration trends, and target muscle balance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
            <Flame className="w-6 h-6 fill-orange-400" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Active Streak</div>
            <div className="text-2xl font-black text-white">{streakStats.currentStreak} Days</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Longest Streak</div>
            <div className="text-2xl font-black text-white">{streakStats.longestStreak} Days</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Total Sessions</div>
            <div className="text-2xl font-black text-white">{streakStats.totalCompletedDays} Workouts</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Completion Rate</div>
            <div className="text-2xl font-black text-white">86%</div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Workouts Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Workouts Per Week
            </h3>
            <span className="text-xs text-[#00F0FF] font-semibold">Target: 5–6 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                <XAxis dataKey="week" stroke="#8B949E" fontSize={12} />
                <YAxis stroke="#8B949E" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="workouts" fill="#00F0FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Muscle Group Distribution Donut */}
        <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Muscle Focus Distribution
          </h3>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={muscleDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {muscleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {muscleDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Trend Line Chart */}
      <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Weekly Session Duration (Minutes)</span>
        </h3>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="week" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', borderRadius: '12px', color: '#fff' }}
              />
              <Line type="monotone" dataKey="duration" stroke="#CCFF00" strokeWidth={3} dot={{ r: 5, fill: '#CCFF00' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
