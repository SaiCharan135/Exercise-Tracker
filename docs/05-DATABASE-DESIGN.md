# DUMBBELL DAILY — Database Design Specification

## 1. Database Overview
- **Database Engine:** MongoDB (v6.0+) with Mongoose ODM.
- **Data Modeling Strategy:** Hybrid embedding and referencing. Core domain entity templates (`WorkoutPlan`, `Exercise`) are referenced; daily user execution sessions (`DailyWorkout`, `ExerciseLog`) embed configuration snapshots to protect historical integrity against template changes.

---

## 2. Collection Schemas & Data Models

### 2.1 `Users` Collection
```javascript
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  profileImage: { type: String, default: '' },
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'dark' },
    defaultRestSeconds: { type: Number, default: 60 },
    preferredWorkoutTime: { type: String, default: '07:00' }
  },
  equipment: {
    type: [String],
    default: ['2 x 7 KG Dumbbells']
  }
}, { timestamps: true });
```

### 2.2 `Exercises` Collection
```javascript
const ExerciseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  instructions: [{ type: String }],
  muscleGroup: { 
    type: String, 
    required: true, 
    enum: ['Shoulders', 'Chest', 'Back', 'Biceps', 'Triceps', 'Legs', 'Abs/Core', 'Full Body'],
    index: true 
  },
  equipment: { type: String, default: '2 x 7 KG Dumbbells' },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  defaultSets: { type: Number, default: 3 },
  defaultReps: { type: Number, default: 10 },
  restSeconds: { type: Number, default: 60 },
  safetyNotes: { type: String, default: 'Stop immediately if you feel pain.' },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });
```

### 2.3 `WorkoutPlans` Collection
```javascript
const WorkoutPlanSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  targetDayOfWeek: { type: Number, enum: [0,1,2,3,4,5,6] }, // 0 = Sun, 1 = Mon...
  category: { type: String, enum: ['Full Body', 'Upper Body', 'Lower Body', 'Core & Mobility', 'Rest Day'] },
  estimatedDurationMins: { type: Number, default: 35 },
  exercises: [{
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    sets: { type: Number, default: 3 },
    reps: { type: Number, default: 10 },
    restSeconds: { type: Number, default: 60 }
  }]
}, { timestamps: true });
```

### 2.4 `DailyWorkouts` Collection
```javascript
const DailyWorkoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  workoutPlanId: { type: Schema.Types.ObjectId, ref: 'WorkoutPlan' },
  date: { type: String, required: true, index: true }, // Format: YYYY-MM-DD
  title: { type: String, required: true },
  status: { type: String, enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'], default: 'NOT_STARTED', index: true },
  startTime: { type: Date },
  endTime: { type: Date },
  durationSeconds: { type: Number, default: 0 },
  exercises: [{
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    name: { type: String },
    muscleGroup: { type: String },
    targetSets: { type: Number },
    targetReps: { type: Number },
    completedSets: [{
      setIndex: { type: Number },
      repsCompleted: { type: Number },
      weightKg: { type: Number, default: 7 },
      completedAt: { type: Date }
    }],
    isCompleted: { type: Boolean, default: false },
    isSkipped: { type: Boolean, default: false }
  }],
  notes: { type: String, default: '' },
  completedAt: { type: Date }
}, { timestamps: true });

// Compound index for user & date uniqueness
DailyWorkoutSchema.index({ userId: 1, date: 1 });
```

### 2.5 `Streaks` Collection
```javascript
const StreakSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  totalCompletedDays: { type: Number, default: 0 },
  lastCompletedDate: { type: String }, // Format: YYYY-MM-DD
  completedDates: [{ type: String }]  // Array of YYYY-MM-DD strings for fast calendar lookup
}, { timestamps: true });
```

### 2.6 `Reminders` Collection
```javascript
const ReminderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  enabled: { type: Boolean, default: true },
  reminderTime: { type: String, default: '07:00' }, // HH:mm format
  daysOfWeek: [{ type: Number }] // [1,2,3,4,5,6,0]
}, { timestamps: true });
```

---

## 3. Database Indexing & Performance Strategy
- `DailyWorkout`: Compound index on `{ userId: 1, date: -1 }` for ultra-fast query execution when retrieving user workout history.
- `Streak`: Index on `userId` (1:1 relationship with User).
- `Exercise`: Index on `muscleGroup` and `name` for catalog search.
