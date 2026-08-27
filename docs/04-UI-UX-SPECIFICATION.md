# DUMBBELL DAILY — UI/UX Specification

## 1. Design Aesthetics & Visual Tokens

DUMBBELL DAILY features a modern, high-contrast, premium dark/light aesthetic inspired by top-tier fitness apps (Apple Fitness, Nike Training Club, Strava).

### Design Tokens

#### Color System
- **Primary Accent (Energy Blue/Cyan):** `#00F0FF` (Dark mode highlight) / `#0066FF` (Light mode)
- **Secondary Accent (Lime Volt):** `#CCFF00` (Streak & completion callouts)
- **Background Dark:** `#0D1117` (Deep Obsidian Charcoal)
- **Card Surface Dark:** `#161B22` (Elevated Glass Slate)
- **Background Light:** `#F8FAFC` (Clean Ice White)
- **Card Surface Light:** `#FFFFFF` (Pure White Slate)
- **Success:** `#10B981` (Vibrant Emerald)
- **Warning:** `#F59E0B` (Amber Flame)
- **Error:** `#EF4444` (Vivid Crimson)
- **Text Main (Dark Mode):** `#F3F4F6`
- **Text Muted (Dark Mode):** `#9CA3AF`

#### Typography
- **Primary Font:** Inter / Outfit (Google Fonts)
- **Headings:** Semi-bold to Bold with crisp tracking (`letter-spacing: -0.02em`)
- **Numbers/Metrics:** Monospace / Tabular figures for timers (`font-variant-numeric: tabular-nums`)

---

## 2. Layout Framework & Navigation Strategy

### Desktop View (Width >= 1024px)
- **Left Navigation Drawer / Sidebar (Fixed 260px):**
  - Brand Logo + Tagline
  - Navigation Links (Dashboard, Workouts, Exercises, Calendar, Progress, History, Profile, Settings)
  - User Mini-Profile & Theme Switcher
- **Main Viewport:** Flexible center-focused grid max-width 1280px with top greeting bar.

### Mobile View (Width < 768px)
- **Bottom Navigation Bar (Fixed Height 64px):**
  - Home (Dashboard)
  - Workout (Active Session)
  - Progress (Charts & Stats)
  - History (Calendar & Logs)
  - Profile (Settings & Prefs)
- Safe area inset padded for iOS home bar.

---

## 3. Screen Specifications

### 3.1 Dashboard Screen
1. **Header Greeting:** "Good morning, Alex! 👋" + date.
2. **Streak Card:** Prominent Flame icon 🔥 `7 Day Streak` with longest streak badge (`Longest: 14 Days`).
3. **Today's Workout Highlight Card:**
   - Workout Name (e.g. *Full Body Dumbbell Power*)
   - Meta Badges: `5 Exercises` • `35 Mins` • `2 × 7 KG Dumbbells`
   - Completion Gauge: `0 / 5 Exercises Completed`
   - Large Primary Action CTA: `[ START WORKOUT → ]`
4. **Weekly Activity Bar:** Interactive 7-day pill indicator (`MON ✓`, `TUE ✓`, `WED ✓`, `THU ✓`, `FRI ✓`, `SAT ✗`, `SUN ✓`).
5. **Quick Stats Overview Cards:** Total Workouts, Active Streak, Monthly Volume.

### 3.2 Live Workout Screen (Mobile-Optimized)
1. **Header Bar:** Workout Title, Elapsed Session Time (`14:25`), Progress bar (`60%`).
2. **Current Exercise Spotlight Card:**
   - Exercise Title & Target Muscle (`Dumbbell Shoulder Press - Shoulders`)
   - Visual Instruction Badge / Diagram preview
   - Target Sets: `3 Sets × 10 Reps (7 KG)`
3. **Interactive Set Matrix:**
   - `Set 1`: 10 Reps × 7 KG `[ ✓ Completed ]`
   - `Set 2`: 10 Reps × 7 KG `[ ✓ Completed ]`
   - `Set 3`: 10 Reps × 7 KG `[ ☐ Complete Set ]`
4. **Rest Timer Bar:** Integrated countdown (`00:45`), sound toggle, `+30s` button.
5. **Action Controls:** `[ ← Previous ]`, `[ Skip Exercise ]`, `[ Next Exercise → ]`, `[ Finish Workout ]`.

### 3.3 Celebration / Completion Modal
- Confetti effect via Canvas Confetti or Framer Motion celebration burst.
- Workout metrics summary card:
  - ⏱ Duration: 34 mins
  - 🏋️ Total Sets Completed: 15 Sets
  - 🔥 Streak Updated: 8 Days!
- Primary CTA: `[ VIEW PROGRESS DASHBOARD ]`.

### 3.4 Calendar & History Screen
- Interactive month navigator (`< August 2026 >`).
- Day cells color-coded for completed workouts.
- Tapping a cell displays bottom drawer with full workout breakdown, set logs, reps, and time elapsed.

---

## 4. Accessibility & Micro-Interactions
- Smooth spring physics for cards using Framer Motion.
- Tactile haptic feedback triggers (if supported on mobile browsers).
- WCAG AA contrast ratio (>4.5:1 for standard text, >3:1 for large text/icons).
