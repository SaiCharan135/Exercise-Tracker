# DUMBBELL DAILY — Product Requirements Document (PRD)

## 1. Product Overview
**DUMBBELL DAILY** is a hyper-focused daily workout tracking application built specifically for home fitness enthusiasts exercising with **2 × 7 KG dumbbells**. It provides a structured **7-day weekly workout system** containing **exactly 4 required exercises per day = 28 exercise slots per week**, paired with real exercise visual demonstrations, form tips, common mistakes guidance, and 4/4 checklist streak tracking.

### Tagline
*"Train Daily. Track Progress. Stay Consistent."*

---

## 2. Weekly Workout Structure (7 Days × 4 Exercises = 28 Slots)

```text
MONDAY — FULL BODY (4 Exercises)
1. Goblet Squat (3 × 12, Rest 60s)
2. Dumbbell Floor Press (3 × 10, Rest 60s)
3. One-Arm Dumbbell Row (3 × 10, Rest 60s)
4. Dumbbell Shoulder Press (3 × 10, Rest 60s)

TUESDAY — ARMS & SHOULDERS (4 Exercises)
1. Dumbbell Bicep Curl (3 × 12, Rest 45s)
2. Hammer Curl (3 × 12, Rest 45s)
3. Dumbbell Lateral Raise (3 × 12, Rest 45s)
4. Overhead Dumbbell Triceps Extension (3 × 12, Rest 45s)

WEDNESDAY — LOWER BODY (4 Exercises)
1. Goblet Squat (3 × 12, Rest 60s)
2. Dumbbell Romanian Deadlift (3 × 10, Rest 60s)
3. Dumbbell Reverse Lunge (3 × 10, Rest 60s)
4. Dumbbell Calf Raise (3 × 15, Rest 45s)

THURSDAY — BACK & CORE (4 Exercises)
1. Bent-Over Dumbbell Row (3 × 10, Rest 60s)
2. Dumbbell Reverse Fly (3 × 12, Rest 45s)
3. Dumbbell Russian Twist (3 × 15, Rest 45s)
4. Dumbbell Dead Bug Variation (3 × 12, Rest 45s)

FRIDAY — CHEST & ARMS (4 Exercises)
1. Dumbbell Floor Press (3 × 10, Rest 60s)
2. Dumbbell Squeeze Press (3 × 10, Rest 60s)
3. Dumbbell Bicep Curl (3 × 12, Rest 45s)
4. Dumbbell Triceps Kickback (3 × 12, Rest 45s)

SATURDAY — FULL BODY (4 Exercises)
1. Dumbbell Deadlift (3 × 10, Rest 60s)
2. Dumbbell Thruster (3 × 10, Rest 60s)
3. One-Arm Dumbbell Row (3 × 10, Rest 60s)
4. Hammer Curl (3 × 12, Rest 45s)

SUNDAY — LIGHT FULL BODY / RECOVERY (4 Exercises)
1. Light Goblet Squat (2 × 12, Rest 60s)
2. Light Dumbbell Romanian Deadlift (2 × 10, Rest 60s)
3. Light Dumbbell Shoulder Press (2 × 10, Rest 60s)
4. Dumbbell Core / Mobility Exercise (2 × 12, Rest 45s)
```

---

## 3. Real Exercise Demonstrations & Media System
- Every exercise supports visual demonstration media (`type`: `video` | `gif` | `image` | `svg`, `url`, `thumbnail`, `source`, `sourceUrl`, `license`, `attribution`).
- Tapping **`[ VIEW DEMO ]`** opens a dedicated demonstration modal displaying visual motion diagrams, target muscles, equipment, step-by-step instructions, form tips, common mistakes, and safety guidance.
- Graceful text fallback ensures broken external URLs never break the UI.
