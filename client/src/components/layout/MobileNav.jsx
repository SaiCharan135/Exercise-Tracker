import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, BarChart3, History, Settings } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: LayoutDashboard },
    { label: 'Workout', path: '/workout', icon: Dumbbell },
    { label: 'Progress', path: '/progress', icon: BarChart3 },
    { label: 'History', path: '/history', icon: History },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161B22]/95 backdrop-blur-md border-t border-[#30363D] px-2 py-1.5 select-none">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#00F0FF]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#00F0FF]/15 text-[#00F0FF]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-[#00F0FF] font-semibold' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
