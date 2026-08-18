import React, { useState, useEffect } from 'react';
import {
  Dumbbell,
  Trash2,
  Pause,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  Layers,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXPERIENCE_LEVELS } from '../data/muscleData';

export default function WorkoutRoutineQueue({
  routine = [],
  onRemoveExercise,
  onClearRoutine,
  onLoadPresetSplit,
  experienceLevel = 'intermediate',
}) {
  const [completedSets, setCompletedSets] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentLevelData = EXPERIENCE_LEVELS[experienceLevel] || EXPERIENCE_LEVELS.intermediate;
  const safeRoutine = (routine || []).filter(Boolean);

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      confetti({
        particleCount: 40,
        spread: 65,
        colors: ['#dc2626', '#ef4444', '#f87171', '#b91c1c'],
      });
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const startRestTimer = (seconds) => {
    setTimerSeconds(seconds);
    setTimerActive(true);
  };

  const toggleSet = (exerciseName, setIndex) => {
    if (!exerciseName) return;
    const key = `${exerciseName}-${setIndex}`;
    setCompletedSets((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyRoutine = () => {
    const text = safeRoutine
      .map(
        (ex, i) =>
          `${i + 1}. ${ex?.name || 'Exercise'} (${ex?.muscleName || ex?.target || 'Target'}) - ${ex?.sets || '3 Sets'} x ${ex?.reps || '10 Reps'}`
      )
      .join('\n');
    navigator.clipboard.writeText(`MY WORKOUT ROUTINE:\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const numSetsToDisplay = experienceLevel === 'beginner' ? 3 : experienceLevel === 'intermediate' ? 4 : 5;
  const totalSets = safeRoutine.length * numSetsToDisplay;
  const totalCompleted = Object.values(completedSets).filter(Boolean).length;
  const progressPercent = totalSets > 0 ? Math.round((totalCompleted / totalSets) * 100) : 0;

  return (
    <section id="routine" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)] relative overflow-hidden text-gray-800">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-mono mb-2 font-bold shadow-sm">
              <Dumbbell className="w-3.5 h-3.5 text-red-600" />
              <span>CUSTOM WORKOUT BUILDER & LOG</span>
              <span className="text-gray-900 font-bold ml-1">({currentLevelData.name.toUpperCase()} LEVEL)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Active Routine & Set Tracker
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-mono mt-1">
              {routine.length} exercises queued • Progress: <strong className="text-red-600">{progressPercent}% complete</strong> ({totalCompleted}/{totalSets} sets)
            </p>
          </div>

          {/* Quick Rest Timer & Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="font-mono text-sm font-bold text-gray-900">
                {timerSeconds > 0 ? formatTimer(timerSeconds) : 'REST TIMER'}
              </span>
              {timerActive ? (
                <button
                  onClick={() => setTimerActive(false)}
                  className="p-1 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200"
                  title="Pause Timer"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => startRestTimer(75)}
                  className="p-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                  title="Start 75s Rest"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {routine.length > 0 && (
              <>
                <button
                  onClick={handleCopyRoutine}
                  className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  title="Copy Routine to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-red-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClearRoutine}
                  className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Clear Routine"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Preset Split Fast-Loaders */}
        <div className="mt-5 flex items-center gap-2 flex-wrap text-xs font-mono">
          <span className="text-gray-500 font-bold uppercase flex items-center gap-1.5 mr-1">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            LOAD PRESETS:
          </span>
          <button
            onClick={() => onLoadPresetSplit('push')}
            className="px-3.5 py-1.5 rounded-xl bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-200 text-gray-700 hover:text-red-600 font-bold transition-all"
          >
            🔥 Push Day (Chest & Shoulders)
          </button>
          <button
            onClick={() => onLoadPresetSplit('pull')}
            className="px-3.5 py-1.5 rounded-xl bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-200 text-gray-700 hover:text-red-600 font-bold transition-all"
          >
            ⚡ Pull Day (Back & Biceps)
          </button>
          <button
            onClick={() => onLoadPresetSplit('legs')}
            className="px-3.5 py-1.5 rounded-xl bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-200 text-gray-700 hover:text-red-600 font-bold transition-all"
          >
            🦵 Leg Day (Quads, Glutes & Calves)
          </button>
        </div>

        {/* Routine Exercises Grid */}
        <div className="mt-6 space-y-3">
          {safeRoutine.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-gray-50 border border-gray-200 text-gray-500 space-y-2">
              <Dumbbell className="w-10 h-10 mx-auto text-gray-400 opacity-60" />
              <p className="text-sm font-mono font-bold text-gray-900">Your workout routine is empty</p>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Select muscles on the 3D anatomy model above and click "Add to Routine", or choose a preset split above.
              </p>
            </div>
          ) : (
            safeRoutine.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200 hover:border-red-200 hover:bg-white hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-100 text-red-600 text-xs font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-600 uppercase">
                      {item.muscleName || item.target || 'Target Region'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-200 text-gray-700 uppercase font-semibold">
                      {item.equipment || 'Standard'}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-gray-900 pl-8">{item.name}</h4>
                  <p className="text-xs text-gray-500 pl-8 font-mono">
                    Target: {item.sets || '3-4 Sets'} • {item.reps || '8-12 Reps'} • Rest: {item.rest || '90s'}
                  </p>
                </div>

                {/* Right: Interactive Set Checkoff Tracker */}
                <div className="flex items-center gap-3 self-end md:self-center pl-8 md:pl-0">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: numSetsToDisplay }).map((_, sIdx) => {
                      const isChecked = !!completedSets[`${item.name}-${sIdx}`];
                      return (
                        <button
                          key={sIdx}
                          onClick={() => toggleSet(item.name, sIdx)}
                          className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center ${
                            isChecked
                              ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-105'
                              : 'bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300'
                          }`}
                          title={`Toggle Set ${sIdx + 1}`}
                        >
                          {isChecked ? <CheckCircle2 className="w-4 h-4" /> : `S${sIdx + 1}`}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => onRemoveExercise(item.name)}
                    className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove from routine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
