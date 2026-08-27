# DUMBBELL DAILY — REST API Documentation

## Base URL
`/api`

---

## 1. Authentication Endpoints

### 1.1 Register User
- **POST** `/auth/register`
- **Request Body:**
  ```json
  {
    "name": "Alex Smith",
    "email": "alex@example.com",
    "password": "Password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "user": {
      "id": "64d3f1a2b...",
      "name": "Alex Smith",
      "email": "alex@example.com",
      "equipment": ["2 x 7 KG Dumbbells"]
    }
  }
  ```

### 1.2 Login User
- **POST** `/auth/login`
- **Request Body:**
  ```json
  {
    "email": "alex@example.com",
    "password": "Password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "user": { "id": "...", "name": "Alex Smith", "email": "alex@example.com" }
  }
  ```

---

## 2. Exercise Catalog Endpoints

### 2.1 Get All Exercises
- **GET** `/exercises`
- **Query Params:** `muscleGroup`, `search`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 12,
    "exercises": [
      {
        "_id": "64d3e...",
        "name": "Dumbbell Shoulder Press",
        "description": "Seated or standing overhead dumbbell press targeting shoulders.",
        "muscleGroup": "Shoulders",
        "equipment": "2 x 7 KG Dumbbells",
        "defaultSets": 3,
        "defaultReps": 10,
        "restSeconds": 60
      }
    ]
  }
  ```

---

## 3. Daily Workout Endpoints (Protected)

### 3.1 Get Today's Workout
- **GET** `/workouts/today`
- **Headers:** `Authorization: Bearer <JWT>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "workout": {
      "_id": "64d4a...",
      "date": "2026-08-25",
      "title": "Full Body Dumbbell Power",
      "status": "NOT_STARTED",
      "exercises": [ ... ]
    }
  }
  ```

### 3.2 Start Workout
- **POST** `/workouts/:id/start`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "workout": { "_id": "...", "status": "IN_PROGRESS", "startTime": "2026-08-25T13:40:00.000Z" }
  }
  ```

### 3.3 Log Set Completion
- **PUT** `/workouts/:id/sets`
- **Request Body:**
  ```json
  {
    "exerciseIndex": 0,
    "setIndex": 0,
    "repsCompleted": 10,
    "weightKg": 7,
    "completed": true
  }
  ```
- **Response (200 OK):** Updated workout snapshot.

### 3.4 Complete Entire Workout
- **PUT** `/workouts/:id/complete`
- **Request Body:**
  ```json
  {
    "durationSeconds": 2100,
    "notes": "Felt energetic today! Increased pace on shoulder press."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "workout": { "_id": "...", "status": "COMPLETED", "durationSeconds": 2100 },
    "streak": { "currentStreak": 8, "longestStreak": 14, "totalCompletedDays": 24 }
  }
  ```

---

## 4. Progress & Streak Endpoints (Protected)

### 4.1 Get User Streak
- **GET** `/streak`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "currentStreak": 8,
    "longestStreak": 14,
    "totalCompletedDays": 24,
    "completedDates": ["2026-08-18", "2026-08-19", "2026-08-20", "..."]
  }
  ```

### 4.2 Get Progress Dashboard Stats
- **GET** `/progress/stats`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "totalWorkouts": 24,
    "thisMonthCount": 18,
    "completionRate": 85.7,
    "weeklyData": [
      { "day": "Mon", "completed": true, "durationMins": 35 },
      { "day": "Tue", "completed": true, "durationMins": 32 }
    ],
    "muscleDistribution": [
      { "name": "Shoulders", "count": 12 },
      { "name": "Chest", "count": 10 },
      { "name": "Legs", "count": 14 }
    ]
  }
  ```

---

## 5. Reminder Endpoints (Protected)

### 5.1 Get & Update Reminder Settings
- **GET** `/reminders`
- **PUT** `/reminders`
- **Request Body:**
  ```json
  {
    "enabled": true,
    "reminderTime": "07:30"
  }
  ```
