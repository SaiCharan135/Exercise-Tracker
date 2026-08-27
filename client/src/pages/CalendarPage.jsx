import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Dumbbell, Calendar as CalendarIcon, RefreshCw, Info } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import DayDetailsDrawer from '../components/calendar/DayDetailsDrawer';

const CalendarPage = () => {
  const { streakStats, resetAllWorkoutData } = useWorkout();
  const [currentDate, setCurrentDate] = useState(new Date()); // Current real calendar month
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [resetNotice, setResetNotice] = useState(false);

  const realToday = new Date();
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth(); // 0-indexed

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

  // Accurate number of days in month
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // 0 = Sun ... 6 = Sat

  // Monday offset (0 = Mon, 6 = Sun)
  const mondayOffset = (firstDayOfWeek + 6) % 7;

  // Real completed dates array formatted YYYY-MM-DD
  const completedDatesList = streakStats?.completedDates || [];

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDayClick = (dayNum) => {
    const monthStr = String(monthIndex + 1).padStart(2, '0');
    const dayStr = String(dayNum).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    const isCompleted = completedDatesList.includes(dateStr);

    const formattedDate = new Date(year, monthIndex, dayNum).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    setSelectedDayData({
      dayNumber: dayNum,
      dateFormatted: formattedDate,
      status: isCompleted ? 'completed' : 'scheduled',
      title: isCompleted ? '4 / 4 Exercises Completed ✓' : 'Scheduled 4-Exercise Routine',
      dateStr
    });
  };

  const handleRefreshCalendar = () => {
    resetAllWorkoutData();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      {selectedDayData && (
        <DayDetailsDrawer
          dayData={selectedDayData}
          onClose={() => setSelectedDayData(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#00F0FF] font-bold uppercase tracking-wider">
            REAL TIME WORKOUT CALENDAR
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">{monthName}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefreshCalendar}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#00F0FF]/40 text-xs text-gray-300 font-semibold transition-all"
            title="Refresh calendar & clear test history"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>{resetNotice ? 'CALENDAR REFRESHED ✓' : 'Clear & Reset Log'}</span>
          </button>

          <div className="flex items-center space-x-2 bg-[#161B22] p-1.5 rounded-2xl border border-[#30363D]">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-[#0D1117] text-gray-400 hover:text-white border border-[#30363D]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-white px-2 tracking-wider">{monthName.split(' ')[0]}</span>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-[#0D1117] text-gray-400 hover:text-white border border-[#30363D]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-4 rounded-2xl bg-[#161B22] border border-[#30363D] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-5 h-5 text-[#00F0FF] shrink-0" />
          <span className="text-gray-300 font-medium">
            Active Streak: <strong className="text-[#00F0FF]">{streakStats.currentStreak} Days</strong> • Total Workouts: <strong className="text-white">{streakStats.totalWorkoutsCompleted} Completed</strong>
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#00F0FF] inline-block" />
            <span className="text-gray-400">Today</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />
            <span className="text-gray-400">Completed (4/4)</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-5 lg:p-7 space-y-4 shadow-xl">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-gray-400 border-b border-[#30363D] pb-3">
          {weekDays.map(d => (
            <div key={d} className="tracking-wider">{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty offset cells */}
          {Array.from({ length: mondayOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="h-16 lg:h-20 rounded-2xl bg-[#0D1117]/30 border border-transparent" />
          ))}

          {/* Real Calendar Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const monthStr = String(monthIndex + 1).padStart(2, '0');
            const dayStr = String(dayNum).padStart(2, '0');
            const dateStr = `${year}-${monthStr}-${dayStr}`;

            const isToday =
              realToday.getFullYear() === year &&
              realToday.getMonth() === monthIndex &&
              realToday.getDate() === dayNum;

            const isCompleted = completedDatesList.includes(dateStr);

            return (
              <button
                key={dayNum}
                onClick={() => handleDayClick(dayNum)}
                className={`h-16 lg:h-20 rounded-2xl p-2 flex flex-col justify-between items-start transition-all relative border ${
                  isToday
                    ? 'bg-gradient-to-br from-[#0066FF]/20 to-[#00F0FF]/20 border-[#00F0FF] shadow-lg shadow-[#00F0FF]/20'
                    : isCompleted
                    ? 'bg-[#10B981]/15 border-[#10B981]/40 hover:bg-[#10B981]/25'
                    : 'bg-[#0D1117] border-[#30363D] hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-black ${isToday ? 'text-[#00F0FF]' : 'text-gray-200'}`}>
                    {dayNum}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  )}
                </div>

                <div className="w-full text-left">
                  {isCompleted ? (
                    <span className="text-[9px] font-bold text-emerald-400 block truncate">
                      4/4 Done ✓
                    </span>
                  ) : (
                    <span className="text-[9px] font-normal text-gray-500 block truncate">
                      4 Ex Slot
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
