# DUMBBELL DAILY — System Architecture Specification

## 1. System High-Level Architecture

DUMBBELL DAILY follows a modern, decoupled client-server architecture with a clear separation of concerns.

```text
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  React (Vite) + Tailwind CSS + Lucide Icons + Recharts  │
│  ├── React Router v6 (SPA Routing)                      │
│  ├── State: React Context + Axios API Services          │
│  ├── Local Persistence: Live Workout State Storage      │
│  └── PWA: Service Worker + Web App Manifest             │
└───────────────────────────┬─────────────────────────────┘
                            │ REST API (JSON / JWT)
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                        │
│             Node.js + Express.js Server                 │
│  ├── Middleware: Auth JWT, Helmet, CORS, Rate Limit     │
│  ├── Controllers: Auth, Workouts, Exercises, Analytics  │
│  ├── Services: Streak Engine, Rotation Engine           │
│  └── Validation: Express-Validator / Joi Schemas        │
└───────────────────────────┬─────────────────────────────┘
                            │ Mongoose ODM
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                       │
│                     MongoDB Atlas                       │
│  Collections: Users, WorkoutPlans, Exercises,           │
│  DailyWorkouts, ExerciseLogs, Streaks, Reminders        │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Component Design & Directory Structure

```text
DUMBBELL-DAILY/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets, icons, manifest.json
│   └── src/
│       ├── assets/             # Images, sounds (timer alert)
│       ├── components/         # Reusable UI components
│       │   ├── common/         # Buttons, Cards, Modals, Loading, Badges
│       │   ├── dashboard/      # TodayCard, StreakCard, WeeklyActivityChart
│       │   ├── workout/        # SetTracker, RestTimer, ExerciseCard, CompletionModal
│       │   ├── calendar/       # CalendarGrid, DayDetailsModal
│       │   ├── progress/       # Recharts Analytics, VolumeChart, MuscleBreakdown
│       │   └── layout/         # Header, MobileNav, Sidebar, Footer
│       ├── context/            # AuthContext, WorkoutContext, ThemeContext
│       ├── hooks/              # useTimer, useStreak, useAudioAlert, useLocalStorage
│       ├── pages/              # Dashboard, WorkoutPage, ExerciseLibrary, CalendarPage, ProgressPage, HistoryPage, ProfilePage, SettingsPage, AuthPages
│       ├── services/           # Axios instance, api.js, authService.js, workoutService.js
│       ├── styles/             # index.css (Tailwind & custom tokens)
│       └── utils/              # dateUtils.js, streakCalculator.js, formatters.js
│
├── server/                     # Backend API Server
│   ├── config/                 # db.js, passport/jwt config
│   ├── controllers/            # authController.js, workoutController.js, exerciseController.js, progressController.js
│   ├── middleware/             # authMiddleware.js, errorHandler.js, rateLimiter.js
│   ├── models/                 # User.js, Exercise.js, WorkoutPlan.js, DailyWorkout.js, ExerciseLog.js, Streak.js, Reminder.js
│   ├── routes/                 # authRoutes.js, workoutRoutes.js, exerciseRoutes.js, progressRoutes.js, userRoutes.js
│   ├── services/               # workoutRotationService.js, streakService.js
│   ├── seeders/                # exerciseSeeder.js, workoutPlanSeeder.js
│   ├── utils/                  # logger.js, apiResponse.js
│   └── app.js                  # Express entry point
│
├── docs/                       # Comprehensive documentation
├── .env.example
├── .gitignore
└── README.md
```

---

## 3. Key Technical Subsystems

### 3.1 Workout Rotation Engine
- Automatically assigns scheduled daily routines:
  - **Day 1 (Mon):** Full Body Dumbbell Power
  - **Day 2 (Tue):** Upper Body Hypertrophy
  - **Day 3 (Wed):** Core & Mobility (Active Rest)
  - **Day 4 (Thu):** Lower Body & Glutes
  - **Day 5 (Fri):** Full Body Sculpt
  - **Day 6 (Sat):** Upper Body Pump
  - **Day 7 (Sun):** Full Rest / Recovery

### 3.2 Live Workout State Recovery
- To prevent loss of active sets if browser refreshes or phone screen sleeps:
  1. `WorkoutContext` syncs current workout draft (`workoutId`, `completedSets`, `startTime`, `elapsedSeconds`) to `localStorage` key `active_workout_session` on every set toggle.
  2. Upon app open/refresh, `WorkoutContext` checks for `active_workout_session` and offers seamless resumption.
  3. Upon workout submission, `localStorage` active draft is safely cleared.

### 3.3 Audio Rest Timer Subsystem
- Utilizes browser `Web Audio API` synth oscillator to produce a pleasant 3-beep chime when rest timer hits zero (no external heavy audio assets required).

---

## 4. Security & Performance Architecture
- **JWT Lifespan:** 7 days stored securely in HTTP-only cookies or Bearer Authorization headers.
- **Data Sanitization:** MongoDB query sanitization to prevent NoSQL injection.
- **Client Bundling:** Code splitting with Vite dynamic imports `React.lazy()` for calendar and progress chart modules.
