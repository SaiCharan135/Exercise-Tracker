import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';

// Page Imports
import Dashboard from './pages/Dashboard';
import WorkoutPage from './pages/WorkoutPage';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import CalendarPage from './pages/CalendarPage';
import ProgressPage from './pages/ProgressPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkoutProvider>
          <BrowserRouter>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Main App Layout Routes */}
              <Route
                path="/*"
                element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/workout" element={<WorkoutPage />} />
                      <Route path="/exercises" element={<ExercisesPage />} />
                      <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/progress" element={<ProgressPage />} />
                      <Route path="/history" element={<HistoryPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </WorkoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
