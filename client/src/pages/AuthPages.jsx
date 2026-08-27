import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, ShieldCheck, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('alex@dumbbelldaily.com');
  const [password, setPassword] = useState('Password123');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center shadow-lg shadow-[#00F0FF]/20">
            <Dumbbell className="w-7 h-7 text-black transform -rotate-12" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">DUMBBELL DAILY</h1>
          <p className="text-xs text-gray-400 font-medium">Train Daily. Track Progress. Stay Consistent.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#00F0FF] text-black font-extrabold text-sm hover:brightness-110 shadow-lg shadow-[#00F0FF]/20 transition-all"
          >
            <span>{loading ? 'LOGGING IN...' : 'SIGN IN TO WORKOUT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center shadow-lg shadow-[#00F0FF]/20">
            <Dumbbell className="w-7 h-7 text-black transform -rotate-12" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Create Account</h1>
          <p className="text-xs text-gray-400 font-medium">Start your daily 2 × 7 KG dumbbell workout habit today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Smith"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#00F0FF] text-black font-extrabold text-sm hover:brightness-110 shadow-lg shadow-[#00F0FF]/20 transition-all"
          >
            <span>CREATE ACCOUNT & START</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
