import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0D1117] text-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar Navigation (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen pb-20 lg:pb-8">
        <Header />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default Layout;
