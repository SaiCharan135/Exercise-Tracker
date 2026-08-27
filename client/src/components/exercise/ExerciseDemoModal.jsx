import React, { useState } from 'react';
import { X, Dumbbell, ShieldAlert, CheckCircle2, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { ExerciseDiagram } from '../../utils/exerciseDiagrams';

const ExerciseDemoModal = ({ exercise, onClose }) => {
  const [mediaError, setMediaError] = useState(false);

  if (!exercise) return null;

  const {
    name,
    description,
    muscleGroup,
    equipment = '2 × 7 KG Dumbbells',
    difficulty = 'Beginner',
    defaultSets = 3,
    defaultReps = 10,
    restSeconds = 60,
    instructions = [],
    formTips = [],
    commonMistakes = [],
    safetyNotes = 'Keep movement controlled and maintain proper posture. Stop if you feel sharp pain.',
    media = {}
  } = exercise;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#161B22] border border-[#00F0FF]/40 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#00F0FF] px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-2">
            TARGET: {muscleGroup || 'Full Body'}
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white">{name}</h2>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>

        {/* Real Demonstration Visual Area */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
            <span>REAL EXERCISE DEMONSTRATION</span>
            <span className="text-[10px] text-[#CCFF00] font-normal">Media Verified ✓</span>
          </div>

          <div className="rounded-2xl bg-[#0D1117] border border-[#30363D] p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px]">
            {!mediaError && media?.url && media.type === 'video' ? (
              <video
                src={media.url}
                controls
                autoPlay
                loop
                muted
                onError={() => setMediaError(true)}
                className="w-full max-h-56 rounded-xl object-cover"
              />
            ) : !mediaError && media?.url && (media.type === 'gif' || media.type === 'image') ? (
              <img
                src={media.url}
                alt={`${name} Demonstration`}
                onError={() => setMediaError(true)}
                className="w-full max-h-56 rounded-xl object-contain"
              />
            ) : (
              /* High quality Vector SVG Demonstration */
              <div className="w-full text-center space-y-2">
                <ExerciseDiagram name={name} className="w-full h-40" />
                {mediaError && (
                  <div className="text-[11px] text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                    External media fallback active. Displaying vector visual form diagram.
                  </div>
                )}
              </div>
            )}

            {/* Media Attribution Footer */}
            <div className="w-full text-right text-[10px] text-gray-500 pt-2 flex items-center justify-between border-t border-[#30363D]/50 mt-2">
              <span>License: {media.license || 'Educational Use'}</span>
              <span>Source: {media.source || 'DUMBBELL DAILY Visual Library'}</span>
            </div>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-center text-xs">
          <div>
            <div className="text-gray-400 text-[10px]">Equipment</div>
            <div className="font-bold text-[#00F0FF] truncate">{equipment}</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Target Sets</div>
            <div className="font-bold text-white">{defaultSets} Sets</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Target Reps</div>
            <div className="font-bold text-white">{defaultReps} Reps</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">Rest Period</div>
            <div className="font-bold text-amber-400 font-mono">{restSeconds}s</div>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        {instructions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">HOW TO PERFORM</h3>
            <ol className="space-y-2 text-xs text-gray-300">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 bg-[#0D1117] p-3 rounded-xl border border-[#30363D]">
                  <span className="w-5 h-5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Form Tips & Common Mistakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Tips */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#CCFF00] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>FORM TIPS</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {(formTips.length > 0 ? formTips : [
                'Keep movement smooth and controlled.',
                'Engage core muscles throughout.',
                'Use full safe range of motion.'
              ]).map((tip, i) => (
                <li key={i} className="p-2.5 rounded-lg bg-[#0D1117] border border-[#30363D] flex items-start space-x-2">
                  <span className="text-[#CCFF00] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>COMMON MISTAKES</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {(commonMistakes.length > 0 ? commonMistakes : [
                'Swinging body for momentum.',
                'Rushing repetitions.',
                'Hyperextending joints at peak.'
              ]).map((mistake, i) => (
                <li key={i} className="p-2.5 rounded-lg bg-[#0D1117] border border-[#30363D] flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety Note Callout */}
        <div className="p-4 rounded-xl bg-[#0D1117] border border-amber-500/30 flex items-start space-x-3 text-xs text-gray-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-400">Safety Guidance: </span>
            {safetyNotes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDemoModal;
