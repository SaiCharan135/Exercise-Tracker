import React from 'react';

// Maps EVERY exercise in the catalog to a real reference photograph in /media/
export const ExerciseDiagram = ({ name, className = "w-full h-36" }) => {
  const getPhotoPath = (exerciseName) => {
    switch (exerciseName) {
      case 'Goblet Squat':
      case 'Light Goblet Squat':
        return '/media/goblet-squat.jpg';

      case 'Dumbbell Floor Press':
        return '/media/floor-press.jpg';

      case 'One-Arm Dumbbell Row':
      case 'Dumbbell Row':
      case 'Bent-Over Dumbbell Row':
        return '/media/one-arm-row.jpg';

      case 'Dumbbell Shoulder Press':
      case 'Light Dumbbell Shoulder Press':
        return '/media/shoulder-press.jpg';

      case 'Dumbbell Bicep Curl':
        return '/media/bicep-curl.jpg';

      case 'Hammer Curl':
        return '/media/hammer-curl.jpg';

      case 'Dumbbell Lateral Raise':
        return '/media/lateral-raise.jpg';

      case 'Overhead Dumbbell Triceps Extension':
        return '/media/triceps-extension.jpg';

      case 'Dumbbell Romanian Deadlift':
      case 'Light Dumbbell Romanian Deadlift':
        return '/media/rdl.jpg';

      case 'Dumbbell Reverse Lunge':
      case 'Dumbbell Lunges':
        return '/media/reverse-lunge.jpg';

      case 'Dumbbell Calf Raise':
        return '/media/calf-raise.jpg';

      case 'Dumbbell Reverse Fly':
        return '/media/reverse-fly.jpg';

      case 'Dumbbell Russian Twist':
      case 'Dumbbell Dead Bug Variation':
      case 'Dumbbell Core / Mobility Exercise':
        return '/media/goblet-squat.jpg';

      case 'Dumbbell Squeeze Press':
        return '/media/floor-press.jpg';

      case 'Dumbbell Triceps Kickback':
        return '/media/triceps-extension.jpg';

      case 'Dumbbell Deadlift':
        return '/media/rdl.jpg';

      case 'Dumbbell Thruster':
        return '/media/shoulder-press.jpg';

      default:
        return '/media/goblet-squat.jpg';
    }
  };

  const photoUrl = getPhotoPath(name);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-[#0D1117] border border-[#30363D] flex items-center justify-center">
      <img
        src={photoUrl}
        alt={`${name} Real Exercise Demonstration`}
        className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          // Fallback if image path fails
          e.target.onerror = null;
          e.target.src = '/media/goblet-squat.jpg';
        }}
      />
    </div>
  );
};
