# DUMBBELL DAILY — Development Roadmap

## Phase 0: Planning & Architectural Foundations
- Create PRD, SRS, System Architecture, Database Schema, API Docs, and Roadmap.
- Set up root repository configurations (`.gitignore`, `.env.example`, `README.md`).

## Phase 1: Frontend Foundation & UI Component Design
- Vite + React setup with Tailwind CSS and CSS design tokens.
- Navigation components (Desktop Sidebar & Mobile Bottom Nav).
- Core pages layout with high-fidelity UI mockup data:
  - Dashboard (Greeting, Streak, Today's Workout Card, Weekly Bar)
  - Interactive Workout Mode (Set Matrix, Rest Timer countdown, Audio alert)
  - Exercise Library Catalog
  - Calendar View (Interactive month grid with historical popups)
  - Progress Dashboard (Recharts integration)
  - History Page
  - User Profile & Settings

## Phase 2: Backend Architecture & Database Initialization
- Express.js server boilerplate with modular MVC structure.
- MongoDB connection config with Mongoose models (`User`, `Exercise`, `WorkoutPlan`, `DailyWorkout`, `Streak`, `Reminder`).
- Authentication middleware with JWT and bcrypt.
- Seed database with 12+ pre-configured 2 × 7 KG dumbbell exercises and 5 workout routines.

## Phase 3: Frontend & Backend Integration
- Auth flow (Registration, Login, JWT state in React Context).
- Today's workout rotation logic and live set/rep updates via REST API.
- Workout start, set completion, exercise skip, and workout finish workflow integration.

## Phase 4: Analytics, Streak Engine & Calendar Integration
- Live streak calculator service (current streak, longest streak, deduplication logic).
- Calendar backend history endpoint and frontend detail drawer.
- Progress analytics calculations and Recharts visual rendering.

## Phase 5: Reminders, PWA & Polish
- Workout reminder preferences controller & client Web Notification triggers.
- Service Worker registration & PWA Manifest setup for installable mobile home screen experience.
- UI animations with Framer Motion, confetti triggers, sound effects.

## Phase 6: Automated Testing & Verification
- Unit & integration tests for streak calculator and workout state transitions.
- End-to-end API regression testing.

## Phase 7: Deployment Readiness
- Environment configurations for frontend (Vercel) and backend (Render/Railway).
- MongoDB Atlas cluster setup guide.
