import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'demo_user_123',
  name: 'Beast',
  email: 'beast@dumbbelldaily.com',
  equipment: ['2 × 7 KG Dumbbells'],
  preferences: {
    theme: 'dark',
    defaultRestSeconds: 60,
    preferredWorkoutTime: '07:00'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dumbbell_daily_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure default name is Beast if not customized
      if (parsed.name === 'Alex Smith' || parsed.name === 'Alex') {
        parsed.name = 'Beast';
        localStorage.setItem('dumbbell_daily_user', JSON.stringify(parsed));
      }
      return parsed;
    }
    return DEMO_USER;
  });
  const [token, setToken] = useState(() => localStorage.getItem('dumbbell_daily_token') || 'demo_token_xyz');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && token !== 'demo_token_xyz') {
      API.get('/auth/me')
        .then(res => {
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('dumbbell_daily_user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token: newToken, user: userData } = res.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('dumbbell_daily_token', newToken);
      localStorage.setItem('dumbbell_daily_user', JSON.stringify(userData));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const demoToken = 'demo_token_' + Date.now();
      const demoUserData = { ...DEMO_USER, email, name: email.split('@')[0] || 'Beast' };
      setToken(demoToken);
      setUser(demoUserData);
      localStorage.setItem('dumbbell_daily_token', demoToken);
      localStorage.setItem('dumbbell_daily_user', JSON.stringify(demoUserData));
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', { name, email, password });
      const { token: newToken, user: userData } = res.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('dumbbell_daily_token', newToken);
      localStorage.setItem('dumbbell_daily_user', JSON.stringify(userData));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const demoToken = 'demo_token_' + Date.now();
      const demoUserData = { ...DEMO_USER, name: name || 'Beast', email };
      setToken(demoToken);
      setUser(demoUserData);
      localStorage.setItem('dumbbell_daily_token', demoToken);
      localStorage.setItem('dumbbell_daily_user', JSON.stringify(demoUserData));
      return { success: true };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(DEMO_USER);
    localStorage.removeItem('dumbbell_daily_token');
    localStorage.removeItem('dumbbell_daily_user');
  };

  const updateProfile = async (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('dumbbell_daily_user', JSON.stringify(newUser));
    try {
      await API.put('/user/profile', updatedData);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
