import React, { useState } from 'react';
import { User, ShieldCheck, Dumbbell, Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || 'Beast');
  const [equipment, setEquipment] = useState('2 × 7 KG Dumbbells');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, equipment: [equipment] });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-white">User Profile</h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Manage your equipment setup and account profile.
        </p>
      </div>

      <div className="rounded-2xl bg-[#161B22] border border-[#30363D] p-6 lg:p-8 space-y-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Banner */}
          <div className="flex items-center space-x-4 border-b border-[#30363D] pb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] text-black font-black text-2xl flex items-center justify-center shadow-lg shadow-[#00F0FF]/20">
              {name[0] ? name[0].toUpperCase() : 'B'}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">{name}</h2>
              <p className="text-xs text-gray-400 font-mono">{user?.email || 'beast@dumbbelldaily.com'}</p>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-sm text-white focus:outline-none focus:border-[#00F0FF]"
            />
          </div>

          {/* Primary Equipment Setup */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#00F0FF] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
              <span>Primary Home Equipment Setup</span>
            </label>
            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center space-x-3">
              <Dumbbell className="w-5 h-5 text-[#00F0FF]" />
              <input
                type="text"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-semibold focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Default app exercise target weights and routines are pre-optimized for 2 × 7 KG dumbbells.
            </p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#00F0FF] text-black font-extrabold text-sm hover:brightness-110 shadow-lg shadow-[#00F0FF]/20 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>PROFILE SAVED ✓</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>SAVE PROFILE CHANGES</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
