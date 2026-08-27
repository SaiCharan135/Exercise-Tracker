# DUMBBELL DAILY — Testing Strategy & Verification Document

## 1. Testing Strategy Overview

The testing suite ensures strict data integrity, zero regression in workout streak calculations, and reliable user authentication.

---

## 2. Test Execution Areas

### 2.1 Authentication & User Access
- [x] Successful user registration generates valid JWT token and default settings.
- [x] Invalid password or unregistered email returns 401 Unauthorized with clear message.
- [x] Protected routes (e.g. `/api/workouts/today`) reject requests lacking Bearer token.

### 2.2 Workout Engine Logic
- [x] `GET /api/workouts/today` returns correct routine snapshot based on current date.
- [x] Logging set completion updates array index without altering other set states.
- [x] Skipping an exercise flags `isSkipped = true` but allows overall workout completion.
- [x] Workout completion records duration and updates status to `COMPLETED`.

### 2.3 Streak Engine Integrity
- [x] Single workout completed today increments `currentStreak` by +1.
- [x] Multiple workouts completed on the same date do NOT double-increment streak.
- [x] Skipping a full day without completing a workout correctly resets `currentStreak` to 0 or 1.
- [x] Modifying workout templates in `WorkoutPlans` collection does NOT alter historical `DailyWorkout` instances.

### 2.4 UI & Accessibility Testing
- [x] Responsive layout verified across mobile (375px), tablet (768px), and desktop (1280px).
- [x] Keyboard navigation accessible on set checkboxes and navigation links.
- [x] High-contrast colors meet WCAG AA standards in both light and dark themes.

---

## 3. Automated Test Commands
- **Backend Tests:** `npm run test` (Jest / Supertest API suite)
- **Frontend Tests:** `npm run test` (Vitest / React Testing Library)
