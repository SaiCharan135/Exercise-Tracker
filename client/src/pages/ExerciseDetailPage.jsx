import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dumbbell, ShieldAlert, CheckCircle2, Info, AlertTriangle, Eye } from 'lucide-react';
import API from '../services/api';
import { ExerciseDiagram } from '../utils/exerciseDiagrams';

const ExerciseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    API.get('/exercises')
      .then(res => {
        if (res.data && res.data.exercises) {
          const found = res.data.exercises.find(ex => ex._id === id || ex.name.toLowerCase().replace(/\s+/g, '-') === id);
          if (found) setExercise(found);
        }
      })
      .catch(() => {});
  }, [id]);

  if (!exercise) {
    return (
      <div className="p-8 text-center text-gray-400 space-y-4">
        <div>Loading exercise details...</div>
        <button
          onClick={() => navigate('/exercises')}
          className="px-4 py-2 bg-[#161B22] border border-[#30363D] rounded-xl text-xs text-white"
        >
          Back to Exercises
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Exercises</span>
      </button>

      {/* Hero Header */}
      <div className="rounded-3xl bg-[#161B22] border border-[#30363D] p-6 lg:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20">
            {exercise.muscleGroup || 'Full Body'}
          </span>
          <span className="text-xs font-semibold text-[#CCFF00] bg-[#0D1117] px-3 py-1 rounded-xl border border-[#30363D]">
            {exercise.equipment || '2 × 7 KG Dumbbells'}
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-black text-white">{exercise.name}</h1>
          <p className="text-xs text-gray-400 mt-1">{exercise.description}</p>
        </div>

        {/* Visual Demonstration */}
        <div className="rounded-2xl bg-[#0D1117] border border-[#30363D] p-4 flex flex-col items-center justify-center">
          <ExerciseDiagram name={exercise.name} className="w-full h-48" />
          <div className="w-full text-right text-[10px] text-gray-500 pt-2 border-t border-[#30363D] mt-2 flex items-center justify-between">
            <span>License: {exercise.media?.license || 'Public Educational'}</span>
            <span>Source: {exercise.media?.source || 'DUMBBELL DAILY Visual Library'}</span>
          </div>
        </div>

        {/* Target Specs */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0D1117] border border-[#30363D] text-center text-xs">
          <div>
            <div className="text-gray-400 text-[10px]">Sets</div>
            <div className="font-bold text-white text-base">{exercise.defaultSets || 3}</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Reps</div>
            <div className="font-bold text-white text-base">{exercise.defaultReps || 10}</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Rest</div>
            <div className="font-bold text-amber-400 text-base font-mono">{exercise.restSeconds || 60}s</div>
          </div>
        </div>

        {/* Instructions */}
        {exercise.instructions?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">HOW TO PERFORM</h3>
            <ol className="space-y-2 text-xs text-gray-300">
              {exercise.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-3 bg-[#0D1117] p-3 rounded-xl border border-[#30363D]">
                  <span className="w-5 h-5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
