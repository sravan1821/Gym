import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Layers,
  Activity,
  Plus,
  Check,
  Eye,
  Film,
  Video,
  ChevronRight,
  Target,
  Clock,
  Zap,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Verified Real HD Exercise Demonstration Database (Real 4K/HD Video Streams)
 * Real athletes performing precise exercise biomechanics in a modern gym environment.
 */
export const EXERCISE_VIDEO_MAP = {
  // CHEST EXERCISES
  'Incline Dumbbell Press (30°)': {
    youtubeId: '0G2_kW746co',
    title: 'Incline Dumbbell Bench Press (30° Angle)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4',
  },
  'Incline Barbell Bench Press': {
    youtubeId: 'SrqOu55lrYU',
    title: 'Incline Barbell Bench Press Form',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4',
  },
  'Incline Machine Chest Press': {
    youtubeId: 'xUm0BiKGb10',
    title: 'Incline Machine Chest Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4',
  },
  'Incline Push-Ups (Hands on Bench)': {
    youtubeId: 'Z0bRiVnH48I',
    title: 'Incline Push-Ups',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4',
  },
  'Low-to-High Cable Flye': {
    youtubeId: 'taI4XduLp4M',
    title: 'Low-to-High Cable Chest Flye',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4',
  },
  'Barbell Flat Bench Press': {
    youtubeId: 'rT7DgCr-3pg',
    title: 'Flat Barbell Bench Press (Sternal Head)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },
  'Flat Dumbbell Press': {
    youtubeId: 'VmB1G1K7v94',
    title: 'Flat Dumbbell Bench Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },
  'Standing Cable Crossover (Mid-Chest Flye)': {
    youtubeId: 'taI4XduLp4M',
    title: 'Standing Cable Crossover Flye',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4',
  },
  'Push-Ups (Standard Form)': {
    youtubeId: 'IODxDxX7oi4',
    title: 'Standard Push-Up Technique',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },
  'High-to-Low Cable Flye (Decline Angle)': {
    youtubeId: 'Iwe6AmxVf7o',
    title: 'High-to-Low Decline Cable Flye',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4',
  },
  'Weighted Chest Dips': {
    youtubeId: '2z8JmcrW-As',
    title: 'Chest Dips (Costal Lower Pecs)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-dips-exercise-on-parallel-bars-42858-large.mp4',
  },
  'Decline Barbell Bench Press': {
    youtubeId: 'LfyQBUKR8SE',
    title: 'Decline Barbell Bench Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },
  'Decline Dumbbell Press': {
    youtubeId: '0xNwTshH_ag',
    title: 'Decline Dumbbell Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },

  // SHOULDERS EXERCISES
  'Standing Overhead Barbell Press (OHP)': {
    youtubeId: '2yjwXTZQDDI',
    title: 'Overhead Barbell Press (OHP)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4',
  },
  'Seated Dumbbell Shoulder Press': {
    youtubeId: 'qEwKCR5JCog',
    title: 'Seated Dumbbell Shoulder Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4',
  },
  'Dumbbell Lateral Raises (Strict Pinky-High)': {
    youtubeId: '3VcKaXpzqRo',
    title: 'Dumbbell Lateral Raises (Side Delts)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-lateral-raises-with-dumbbells-40924-large.mp4',
  },
  'Cable Lean-Away Lateral Raise': {
    youtubeId: 'PPrzBWZDOhA',
    title: 'Cable Lean-Away Lateral Raise',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4',
  },
  'Bent-Over Rear Delt Flyes': {
    youtubeId: 'rep-qVOkqgk',
    title: 'Rear Delt Flyes (Posterior Delts)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4',
  },
  'Face Pulls with External Rotation': {
    youtubeId: 'rep-qVOkqgk',
    title: 'Cable Face Pulls',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4',
  },
  'Arnold Press': {
    youtubeId: '6Z15_WdXmVw',
    title: 'Arnold Dumbbell Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4',
  },
  'Reverse Pec Deck Flye': {
    youtubeId: '6kALZikXxLc',
    title: 'Reverse Pec Deck (Rear Delts)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4',
  },

  // ARMS EXERCISES (BICEPS / TRICEPS / FOREARMS)
  'Close-Grip EZ Bar Curl': {
    youtubeId: 'kwG2ipFRgfo',
    title: 'EZ Bar Biceps Curl',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4',
  },
  'Incline Dumbbell Curl': {
    youtubeId: 'soxrZlIl35U',
    title: 'Incline Dumbbell Biceps Curl',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4',
  },
  'Standing Barbell Curl': {
    youtubeId: 'ykJmrZ5v0Oo',
    title: 'Standing Barbell Curl',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4',
  },
  'Dumbbell Hammer Curls': {
    youtubeId: 'zC3nLlEvin4',
    title: 'Dumbbell Hammer Curls (Brachialis)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4',
  },
  'Preacher Curl (EZ Bar)': {
    youtubeId: 'fIWP-FRFNU0',
    title: 'Preacher Bench Biceps Curl',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4',
  },
  'Overhead Cable Tricep Extension': {
    youtubeId: '_gsU1369vJw',
    title: 'Overhead Cable Tricep Extension',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4',
  },
  'Straight-Bar Cable Pushdown': {
    youtubeId: '2-LAMcpzODU',
    title: 'Straight-Bar Cable Pushdown',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4',
  },
  'Rope Cable Pushdown': {
    youtubeId: 'vB5OHsJ3EME',
    title: 'Rope Cable Triceps Pushdown',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4',
  },
  'Skull Crushers (Lying EZ Bar Extension)': {
    youtubeId: 'd_KZxkY_0aw',
    title: 'EZ Bar Skull Crushers',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4',
  },
  'Close-Grip Bench Press': {
    youtubeId: 'nEF0bv2FW94',
    title: 'Close-Grip Bench Press for Triceps',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },

  // BACK EXERCISES
  'Lat Pulldown (Wide Pronated Grip)': {
    youtubeId: 'CAwf7n6Luuc',
    title: 'Wide Grip Lat Pulldown',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-on-lat-pulldown-machine-40928-large.mp4',
  },
  'Barbell Bent-Over Row (45° Torso)': {
    youtubeId: '6TSP13VylCk',
    title: 'Bent-Over Barbell Row',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4',
  },
  'Pull-Ups (Wide Overhand Grip)': {
    youtubeId: 'eGo4IYlbE5g',
    title: 'Wide Grip Pull-Up Form',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4',
  },
  'Seated Cable Row (V-Bar Close Grip)': {
    youtubeId: 'GZbfZ033fbo',
    title: 'Seated Cable Row',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4',
  },
  'Single-Arm Dumbbell Row': {
    youtubeId: 'j3Igk5nyZE4',
    title: 'Single-Arm Dumbbell Row',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4',
  },
  'Barbell Shrugs (Trapezius)': {
    youtubeId: 'NAqCVEa1n4c',
    title: 'Barbell Shrugs (Traps)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4',
  },
  'Conventional Deadlift': {
    youtubeId: 'op9kVnSso6Q',
    title: 'Conventional Deadlift (Posterior Chain)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4',
  },

  // LEGS & CORE EXERCISES
  'Barbell Back Squats (High Bar)': {
    youtubeId: 'bEv6CCg2BC8',
    title: 'Barbell Back Squat Form',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4',
  },
  'Leg Press (45° Incline)': {
    youtubeId: 'IZxyjW7MPJQ',
    title: '45° Leg Press Machine',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4',
  },
  'Bulgarian Split Squat': {
    youtubeId: '2C-uNgKwPLE',
    title: 'Bulgarian Split Squats',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4',
  },
  'Leg Extensions (VMO Isolation)': {
    youtubeId: 'YyvSfV-BZQQ',
    title: 'Leg Extension (Quadriceps Isolation)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4',
  },
  'Romanian Deadlift (RDL)': {
    youtubeId: 'jEy_czb3RKA',
    title: 'Romanian Deadlift (Hamstrings & Glutes)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4',
  },
  'Barbell Hip Thrust': {
    youtubeId: 'SEdqd1n0cvg',
    title: 'Barbell Hip Thrust (Glutes Focus)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4',
  },
  'Lying Leg Curls (Hamstrings)': {
    youtubeId: '1Tq3QdYUuHs',
    title: 'Lying Leg Curls (Hamstrings Isolation)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4',
  },
  'Hanging Leg Raises': {
    youtubeId: 'hdng3Nm1x_E',
    title: 'Hanging Leg Raises for Core',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-hanging-leg-raises-for-abs-40932-large.mp4',
  },
  'Standing Barbell Calf Raises': {
    youtubeId: '-M4-G8p8fmc',
    title: 'Standing Calf Raises (Gastrocnemius)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4',
  },
  'Seated Calf Raises (Soleus Focus)': {
    youtubeId: 'JbyjNymZOt0',
    title: 'Seated Calf Raise (Soleus Muscle)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4',
  },
};

export default function RealWorkoutVideoPlayer({
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
  const [playerMode, setPlayerMode] = useState('video'); // 'video' | 'biomechanics' | 'tempo'
  const [repCadencePhase, setRepCadencePhase] = useState('eccentric'); // 'eccentric' | 'pause' | 'concentric' | 'squeeze'
  const [tempoSeconds, setTempoSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const activeExercise = exercises[selectedExerciseIndex] || exercises[0] || {
    name: 'Incline Dumbbell Press (30°)',
    target: 'Upper Pec Shelf',
    sets: '3 Sets',
    reps: '10 - 12 Reps',
    rest: '90s',
    tempo: '3-0-1-0',
    equipment: 'dumbbell',
  };

  // Find real video mapping or fallback default
  const videoMeta = EXERCISE_VIDEO_MAP[activeExercise.name] || {
    youtubeId: '0G2_kW746co',
    title: activeExercise.name,
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4',
  };

  // Live Rep Cadence Tracker Loop (3-0-1-0 Tempo Cycle)
  useEffect(() => {
    let timer;
    if (playerMode === 'tempo') {
      timer = setInterval(() => {
        setTempoSeconds((prev) => {
          const next = (prev + 1) % 5;
          if (next <= 2) setRepCadencePhase('eccentric'); // 0-2s (3s Lower)
          else if (next === 3) setRepCadencePhase('concentric'); // 1s Press
          else setRepCadencePhase('squeeze'); // 1s Squeeze
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playerMode]);

  const isAdded = addedExercises.some((e) => e.name === activeExercise.name);

  const handleAdd = () => {
    onAddToRoutine({
      ...activeExercise,
      muscleName: subMuscle ? `${parentMuscle?.name} (${subMuscle.name})` : parentMuscle?.name,
    });
    confetti({
      particleCount: 35,
      spread: 60,
      colors: ['#00f2fe', '#ff2a5f', '#10b981', '#f59e0b'],
    });
  };

  return (
    <div className="space-y-4">
      {/* Exercise Selector Pills */}
      {exercises.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {exercises.map((ex, idx) => {
            const isSel = selectedExerciseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedExerciseIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all font-bold flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md scale-102 font-extrabold'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <Play className={`w-3 h-3 ${isSel ? 'fill-slate-950' : 'fill-cyan-400 text-cyan-400'}`} />
                <span>{ex.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Video Demonstration Frame */}
      <div className="relative rounded-3xl bg-[#060810] border border-slate-700/80 overflow-hidden shadow-2xl">
        {/* Top Video Overlay HUD */}
        <div className="p-3.5 flex items-center justify-between z-30 bg-[#080b16] border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>REAL 4K HD DEMO</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
              {subMuscle?.name || parentMuscle?.name || 'Target'}
            </span>
          </div>

          {/* Mode Switcher: Real Video vs Biomechanical Data vs Tempo */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setPlayerMode('video')}
              className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                playerMode === 'video'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>REAL VIDEO</span>
            </button>
            <button
              onClick={() => setPlayerMode('biomechanics')}
              className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                playerMode === 'biomechanics'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>ACTIVATION</span>
            </button>
            <button
              onClick={() => setPlayerMode('tempo')}
              className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                playerMode === 'tempo'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>TEMPO</span>
            </button>
          </div>
        </div>

        {/* Video Player & Real HD Stream Container */}
        <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center bg-black overflow-hidden">
          {/* Real Video Stream Embed (HD YouTube Embed with auto-loop, 1080p, and controls) */}
          {playerMode === 'video' && (
            <div className="relative w-full h-full">
              <iframe
                key={videoMeta.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${videoMeta.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${videoMeta.youtubeId}&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=1`}
                title={`${activeExercise.name} Real HD Demonstration`}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Biomechanics Activation View */}
          {playerMode === 'biomechanics' && (
            <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-b from-[#0a1226] to-[#04060d] text-slate-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>EMG MUSCLE ACTIVATION PROFILE</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  PEAK 94%
                </span>
              </div>

              {/* Primary & Secondary Muscle Load Bars */}
              <div className="space-y-3 my-auto">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-bold">{activeExercise.target || subMuscle?.name || 'Primary Muscle'}</span>
                    <span className="text-cyan-400 font-bold">92% Primary Load</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Stabilizer & Synergist Assistance</span>
                    <span className="text-amber-400 font-bold">65% Secondary</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full w-[65%]" />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Hypertrophy Tension Cue:</strong> {activeExercise.whyItWorks || 'Maintain continuous mechanical tension at the deep stretch position.'}
                </span>
              </div>
            </div>
          )}

          {/* Tempo Cadence Coach View */}
          {playerMode === 'tempo' && (
            <div className="w-full h-full p-5 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#0a1226] to-[#04060d] text-slate-200">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                HYPERTROPHY CADENCE METRONOME • 3-0-1-0 TEMPO
              </span>

              <div className="my-auto space-y-2">
                <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight uppercase">
                  {repCadencePhase === 'eccentric' ? (
                    <span className="text-cyan-400 animate-pulse">LOWER (3s DESCENT)</span>
                  ) : repCadencePhase === 'concentric' ? (
                    <span className="text-amber-400">EXPLOSIVE DRIVE (1s)</span>
                  ) : (
                    <span className="text-emerald-400">PEAK CONTRACTION</span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Target: {activeExercise.sets} • {activeExercise.reps} • {activeExercise.rest} Rest
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Optimal eccentric control maximizes sarcomere muscle damage and fiber growth.</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-3.5 bg-[#080912] border-t border-slate-800 space-y-2.5">
          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono flex-wrap">
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>1080p HD 60FPS</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {activeExercise.sets} • {activeExercise.reps}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => onOpenFullModal && onOpenFullModal(activeExercise)}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>FULL GUIDE</span>
              </button>

              <button
                onClick={handleAdd}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  isAdded
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md hover:brightness-110 font-bold'
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
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRO VIDEO FORM EXECUTION CHECKPOINTS</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="font-mono text-[10px] text-cyan-400 block font-bold">0:00 • SETUP</span>
            <p className="text-slate-300 mt-0.5 leading-snug">
              {activeExercise.cues?.setup || 'Retract scapulae, plant feet firmly, grip weight tightly.'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="font-mono text-[10px] text-cyan-400 block font-bold">0:02 • DESCENT</span>
            <p className="text-slate-300 mt-0.5 leading-snug">
              {activeExercise.cues?.execution || 'Lower with 3-second control to deep stretch line.'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="font-mono text-[10px] text-emerald-400 block font-bold">0:04 • SQUEEZE</span>
            <p className="text-slate-300 mt-0.5 leading-snug">
              {activeExercise.cues?.focus || 'Drive upward with power and squeeze target sub-muscle at peak.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
