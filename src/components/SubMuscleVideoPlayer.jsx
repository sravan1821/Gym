import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Volume2,
  VolumeX,
  FastForward,
  Layers,
  Sparkles,
  Target,
  Plus,
  Check,
  ChevronRight,
  Eye,
  Camera,
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * MuscleWiki-Grade Exercise Video Demonstration Component
 * Interactive video player showcasing sub-muscle biomechanics, rep phase tracking,
 * multi-angle view simulation, timeline timestamps, and one-click workout queue addition.
 */
export default function SubMuscleVideoPlayer({
  subMuscle,
  parentMuscle,
  experienceLevel = 'intermediate',
  onAddToRoutine,
  addedExercises = [],
  onOpenFullModal,
}) {
  const exercises =
    subMuscle?.levelWorkouts?.[experienceLevel] ||
    subMuscle?.levelWorkouts?.intermediate ||
    parentMuscle?.levelWorkouts?.[experienceLevel] ||
    [];

  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5 | 1 | 1.5
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'angle' | 'side'
  const [progress, setProgress] = useState(0); // 0 to 1
  const [repCount, setRepCount] = useState(1);

  const activeExercise = exercises[selectedExerciseIndex] || exercises[0] || {
    name: 'Incline Barbell Bench Press',
    target: 'Clavicular Pec Mass',
    sets: '4 Sets',
    reps: '8 - 10 Reps',
    rest: '90s',
    tempo: '3-1-1-0',
    equipment: 'barbell',
  };

  // Video cycle timer
  useEffect(() => {
    if (!isPlaying) return;

    let frameId;
    let lastTime = performance.now();
    const cycleDuration = 3600 / playbackSpeed; // ms per rep

    const loop = (now) => {
      const delta = now - lastTime;
      setProgress((prev) => {
        const next = prev + delta / cycleDuration;
        if (next >= 1) {
          setRepCount((r) => (r >= 12 ? 1 : r + 1));
          return 0;
        }
        return next;
      });
      lastTime = now;
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, playbackSpeed]);

  // Derive phase text from progress
  let phaseName = 'ECCENTRIC (LOWER)';
  let phaseColor = '#38bdf8';
  let motionOffset = 0;

  if (progress < 0.45) {
    phaseName = 'CONTROLLED 3S LOWERING';
    phaseColor = '#38bdf8';
    motionOffset = progress / 0.45; // 0 to 1
  } else if (progress < 0.55) {
    phaseName = 'DEEP LOADED STRETCH PAUSE';
    phaseColor = '#f59e0b';
    motionOffset = 1.0;
  } else if (progress < 0.85) {
    phaseName = 'EXPLOSIVE CONCENTRIC DRIVE';
    phaseColor = '#ff2a5f';
    motionOffset = 1.0 - (progress - 0.55) / 0.3; // 1 to 0
  } else {
    phaseName = 'PEAK CONTRACTION SQUEEZE';
    phaseColor = '#dc2626';
    motionOffset = 0.0;
  }

  const isAdded = addedExercises.some((e) => e.name === activeExercise.name);

  const handleAdd = () => {
    onAddToRoutine({
      ...activeExercise,
      muscleName: subMuscle ? `${parentMuscle.name} (${subMuscle.name})` : parentMuscle.name,
    });
    confetti({
      particleCount: 35,
      spread: 60,
      colors: ['#00f2fe', '#ff2a5f', '#dc2626', '#f59e0b'],
    });
  };

  // Dynamic kinematic coordinates
  const weightY = 110 + motionOffset * 40;
  const leftElbowX = 85 + motionOffset * (viewAngle === 'side' ? 5 : 20);
  const leftElbowY = 150 + motionOffset * 18;
  const rightElbowX = 215 - motionOffset * (viewAngle === 'side' ? 5 : 20);

  return (
    <div className="space-y-4">
      {/* Exercise Selector Tabs (if multiple exercises exist for this sub-muscle) */}
      {exercises.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {exercises.map((ex, idx) => {
            const isSel = selectedExerciseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedExerciseIndex(idx);
                  setProgress(0);
                  setRepCount(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all font-bold flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-red-600 text-black shadow-md scale-102'
                    : 'bg-white/80 text-gray-500  hover:text-neutral-200'
                }`}
              >
                <Play className={`w-3 h-3 ${isSel ? 'fill-slate-950' : 'fill-red-500 text-red-500'}`} />
                <span>{ex.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Video Demonstration Frame */}
      <div className="relative rounded-3xl bg-[#080912]  overflow-hidden shadow-2xl">
        {/* Video Overlay Top HUD */}
        <div className="absolute top-0 inset-x-0 p-3.5 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-mono font-bold text-gray-900 tracking-wider uppercase">
              HD FORM VIDEO DEMO
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-600/15 text-red-400  uppercase font-bold">
              {subMuscle?.name || 'Target'}
            </span>
          </div>

          {/* Camera View Angle Switches */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono">
            {['front', 'angle', 'side'].map((angle) => (
              <button
                key={angle}
                onClick={() => setViewAngle(angle)}
                className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all ${
                  viewAngle === angle
                    ? 'bg-red-600 text-black shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {angle}
              </button>
            ))}
          </div>
        </div>

        {/* Video Kinematic Canvas Simulation */}
        <div className="relative w-full h-64 sm:h-72 flex items-center justify-center bg-gradient-to-b from-[#0a0c16] via-[#080910] to-[#04050a]">
          {/* Background studio ambient glow */}
          <div className="absolute w-56 h-56 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

          {/* Biomechanical Motion Graphic */}
          <svg viewBox="0 0 300 240" className="w-full h-full max-h-64 drop-shadow-2xl select-none">
            <defs>
              <linearGradient id="video-muscle-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a5f" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#ff7a00" stopOpacity={0.8} />
              </linearGradient>
              <filter id="video-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Incline / Flat Bench */}
            <rect x="110" y="80" width="80" height="150" rx="10" fill="#121524" stroke="#252b42" strokeWidth="2" />
            <line x1="150" y1="80" x2="150" y2="230" stroke="#1a2033" strokeWidth="2" strokeDasharray="4 4" />

            {/* Head & Torso Frame */}
            <circle cx="150" cy="70" r="18" fill="#181e30" stroke="#334155" strokeWidth="2" />
            <path
              d="M 120,100 Q 150,92 180,100 L 172,190 Q 150,195 128,190 Z"
              fill="#141828"
              stroke="#2d3748"
              strokeWidth="2"
            />

            {/* Target Sub-Muscle Glow with Real-Time Heatmap */}
            <path
              d="M 124,110 Q 150,106 176,110 Q 170,146 150,152 Q 130,146 124,110 Z"
              fill="url(#video-muscle-glow)"
              stroke="#ff2a5f"
              strokeWidth="2.5"
              filter="url(#video-glow)"
            />

            {/* Left Arm Joint Chain */}
            <polyline
              points={`120,110 ${leftElbowX},${leftElbowY} 115,${weightY}`}
              fill="none"
              stroke="#475569"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="120" cy="110" r="5" fill="#00f2fe" />
            <circle cx={leftElbowX} cy={leftElbowY} r="4.5" fill="#38bdf8" />
            <circle cx="115" cy={weightY} r="5" fill="#ffffff" />

            {/* Right Arm Joint Chain */}
            <polyline
              points={`180,110 ${rightElbowX},${leftElbowY} 185,${weightY}`}
              fill="none"
              stroke="#475569"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="180" cy="110" r="5" fill="#00f2fe" />
            <circle cx={rightElbowX} cy={leftElbowY} r="4.5" fill="#38bdf8" />
            <circle cx="185" cy={weightY} r="5" fill="#ffffff" />

            {/* Loaded Barbell / Dumbbells */}
            {activeExercise.equipment === 'barbell' ? (
              <g>
                <line x1="50" y1={weightY} x2="250" y2={weightY} stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
                <rect x="45" y={weightY - 14} width="10" height="28" rx="2" fill="#ff2a5f" />
                <rect x="58" y={weightY - 18} width="12" height="36" rx="2" fill="#00f2fe" />
                <rect x="230" y={weightY - 18} width="12" height="36" rx="2" fill="#00f2fe" />
                <rect x="245" y={weightY - 14} width="10" height="28" rx="2" fill="#ff2a5f" />
              </g>
            ) : (
              <g>
                <line x1="98" y1={weightY} x2="132" y2={weightY} stroke="#cbd5e1" strokeWidth="4" />
                <rect x="92" y={weightY - 12} width="8" height="24" rx="2" fill="#00f2fe" />
                <rect x="130" y={weightY - 12} width="8" height="24" rx="2" fill="#00f2fe" />
                <line x1="168" y1={weightY} x2="202" y2={weightY} stroke="#cbd5e1" strokeWidth="4" />
                <rect x="162" y={weightY - 12} width="8" height="24" rx="2" fill="#00f2fe" />
                <rect x="200" y={weightY - 12} width="8" height="24" rx="2" fill="#00f2fe" />
              </g>
            )}

            {/* Live Movement Vectors */}
            {progress >= 0.55 && progress < 0.85 && (
              <g>
                <line x1="150" y1={weightY + 24} x2="150" y2={weightY + 6} stroke="#ff2a5f" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points={`145,${weightY + 8} 150,${weightY} 155,${weightY + 8}`} fill="#ff2a5f" />
              </g>
            )}
          </svg>

          {/* Floating Rep Phase Callout */}
          <div className="absolute bottom-12 left-4 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phaseColor }} />
            <span>{phaseName}</span>
          </div>

          <div className="absolute bottom-12 right-4 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-red-500">
            REP {repCount} / 12
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-3.5 bg-[#0a0c16]  space-y-2.5">
          {/* Progress Bar / Scrubber */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              setProgress(Math.max(0, Math.min(1, clickPos)));
            }}
            className="w-full bg-gray-100 h-2 rounded-full cursor-pointer relative overflow-hidden group"
          >
            <div
              className="bg-gradient-to-r from-red-500 via-blue-500 to-red-500 h-full rounded-full transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-black font-bold transition-all shadow-md flex items-center gap-1"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={() => {
                  setProgress(0);
                  setRepCount(1);
                }}
                className="p-2 rounded-xl bg-gray-100 hover:bg-slate-700 text-gray-600 transition-colors"
                title="Restart Video Loop"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Speed multiplier */}
              <div className="flex items-center gap-1 bg-white  rounded-xl p-0.5">
                {[0.5, 1, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                      playbackSpeed === speed
                        ? 'bg-slate-700 text-gray-900'
                        : 'text-gray-500 hover:text-neutral-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenFullModal && onOpenFullModal(activeExercise)}
                className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-slate-700 text-red-400 font-bold transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>FULL GUIDE</span>
              </button>

              <button
                onClick={handleAdd}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  isAdded
                    ? 'bg-red-600/20 text-red-500 border border-red-600/40'
                    : 'bg-gradient-to-r from-red-600 to-red-500 text-black shadow-md hover:brightness-110'
                }`}
              >
                {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{isAdded ? 'ADDED' : 'ADD TO ROUTINE'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Key Form Checkpoints */}
      <div className="p-4 rounded-2xl bg-white/80  space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-gray-500 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>VIDEO FORM EXECUTION CHECKPOINTS</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-gray-100/60 ">
            <span className="font-mono text-[10px] text-red-500 block font-bold">0:00 • SETUP</span>
            <p className="text-gray-600 mt-0.5 leading-snug">
              {activeExercise.cues?.setup || 'Retract scapulae, plant feet firmly, grip barbell tightly.'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-100/60 ">
            <span className="font-mono text-[10px] text-red-500 block font-bold">0:02 • DESCENT</span>
            <p className="text-gray-600 mt-0.5 leading-snug">
              {activeExercise.cues?.execution || 'Lower with 3-second control to touch upper chest line.'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-100/60 ">
            <span className="font-mono text-[10px] text-red-500 block font-bold">0:04 • SQUEEZE</span>
            <p className="text-gray-600 mt-0.5 leading-snug">
              {activeExercise.cues?.focus || 'Drive upward with power and squeeze target sub-muscle at top.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
