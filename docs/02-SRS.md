# DUMBBELL DAILY — Software Requirements Specification (SRS)

## 1. Introduction
This document defines the functional and technical requirements for **DUMBBELL DAILY**. It establishes software behavioral constraints, interface requirements, data schema definitions, and system interaction flows.

---

## 2. Authentication & User Management

### 2.1 User Registration (`POST /api/auth/register`)
- **Inputs:** `name`, `email`, `password`.
- **Validation:**
  - Email must be valid format and unique.
  - Password must be at least 8 characters long, containing at least 1 number and 1 letter.
- **Behavior:** Hashes password with `bcrypt`, creates `User` document, initializes default `Settings`, `Streak`, and `Reminders` records, and returns JWT token and user profile object.

### 2.2 User Login (`POST /api/auth/login`)
- **Inputs:** `email`, `password`.
- **Behavior:** Validates credentials against stored bcrypt hash, returns a signed JWT token valid for 7 days.

### 2.3 User Profile Management (`GET / PUT /api/user/profile`)
- **Inputs:** `name`, `profileImage`, `preferences` (theme: light/dark, defaultRestSeconds, preferredWorkoutTime), `equipment` (default: 2 x 7 KG dumbbells).
- **Behavior:** Updates profile document and returns updated state.

---

## 3. Workout Management Engine

### 3.1 Today's Workout (`GET /api/workouts/today`)
- **Behavior:** 
  1. Determines the current date (server local time / UTC normalized).
  2. Queries existing `DailyWorkout` for the user for today.
  3. If none exists, selects the appropriate `WorkoutPlan` based on day-of-week schedule rotation (e.g., Mon: Full Body 1, Tue: Upper Body, Wed: Rest/Core, Thu: Lower Body, Fri: Full Body 2, Sat: Upper Body, Sun: Active Rest).
  4. Creates and returns a snapshot `DailyWorkout` record.

### 3.2 Workout Execution (`POST /api/workouts/start`, `PUT /api/workouts/:id`)
- **State Transitions:** `NOT_STARTED` → `IN_PROGRESS` → `COMPLETED` / `ABANDONED`.
- **Set & Rep Tracking:**
  - Complete set: Records `setIndex`, `repsCompleted`, `weightUsed` (default 7 KG), `timestamp`.
  - Undo set: Reverts set status to incomplete.
  - Skip exercise: Flags exercise as skipped without marking overall workout incomplete.
- **Completion Check:** Workout marks `COMPLETED` when all non-skipped exercises have their required sets completed. Computes exact `duration` (in minutes/seconds) based on `startTime` and `endTime`.

### 3.3 Built-in Rest Timer
- **Countdown Timer:** Client-side countdown initialized to `exercise.restSeconds` (default 60s).
- **Controls:** Start, Pause, Resume, Reset, +30s extension.
- **Audio/Visual Alert:** Triggers Web Audio API tone and browser toast when timer reaches 0.

---

## 4. Streak & Progress Analytics Engine

### 4.1 Streak Rules
- **Completed Day:** Defined as any calendar date with at least one `DailyWorkout` status = `COMPLETED`.
- **Calculation:**
  - Increments `currentStreak` by 1 if today or yesterday was completed.
  - If more than 1 calendar day passes without a completed workout (excluding designated rest days), `currentStreak` resets to 1 (or 0).
  - Updates `longestStreak` if `currentStreak` > `longestStreak`.
  - Deduplicates multiple workouts completed on the same date.

### 4.2 Calendar View Specifications
- Highlights dates with specific status color coding:
  - **Green Accent / Checkmark:** Workout Completed.
  - **Muted Gray / Dash:** Scheduled Rest Day.
  - **Red / Cross:** Missed Workout Day.
  - **Border Highlight:** Today.
- Interactivity: Tapping any historical completed day opens a modal drawer showing exact exercises performed, sets, reps, weight, and workout duration.

### 4.3 Analytics & Charts (Recharts Integration)
- **Weekly Volume & Completion:** Bar chart of workouts completed vs target per week.
- **Duration Metrics:** Line chart tracking workout duration trends over time.
- **Muscle Focus Distribution:** Pie/Donut chart visualizing target muscle distribution (Shoulders, Chest, Back, Legs, Arms, Core).

---

## 5. Workout Reminders & Notifications
- User can configure daily reminder time (e.g. `07:00 AM`).
- Client requests Notification API permissions to schedule local push/toast notifications.
- Server maintains reminder preferences in `Reminders` collection for future expansion (email/web push).

---

## 6. Non-Functional Requirements & Security Specifications
- **Authentication:** HTTP Authorization header using `Bearer <jwt_token>`.
- **Rate Limiting:** `express-rate-limit` capped at 100 requests per 15 minutes per IP (auth endpoints capped at 10 requests per 15 mins).
- **Data Integrity:** Strict Mongoose schemas with indexed foreign keys (`userId`, `date`, `workoutId`).
