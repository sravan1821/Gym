import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Plus,
  Check,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Target,
  AlertCircle,
  Dumbbell,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXERCISE_VIDEO_MAP } from './RealWorkoutVideoPlayer';

/**
 * High-definition Exercise Detail & Form Trainer Modal
 * Inspired by MuscleWiki exercise pages with:
 * - Animated biomechanics visualizer
 * - Step-by-step cues (Setup, Execution, Focus, Common Mistakes)
 * - Primary/Secondary muscle activation bars
 * - Web Audio cadence metronome & interactive set timer
 */
export default function ExerciseDetailModal({
  exercise,
  muscleName = 'Chest',
  onClose,
  onAddToRoutine,
  isAdded = false,
}) {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'timer' | 'anatomy'
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Set Rest Timer State
  const [restSeconds, setRestSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Metronome Cadence Coach State
  const [coachRunning, setCoachRunning] = useState(false);
  const [cadencePhase, setCadencePhase] = useState('Ready');
  const coachIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Parse rest time from exercise.rest (e.g. '90s' -> 90)
  useEffect(() => {
    if (exercise?.rest) {
      const match = exercise.rest.match(/\d+/);
      if (match) setRestSeconds(parseInt(match[0], 10));
    }
  }, [exercise]);

  // Audio Beep Synthesizer using Web Audio API
  const playBeep = (freq = 440, type = 'sine', duration = 0.1) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  };

  // Rest Timer Loop
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
            playBeep(880, 'triangle', 0.4);
            return 0;
          }
          if (prev <= 4) {
            playBeep(440, 'sine', 0.1);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, soundEnabled]);

  // Cadence Coach Loop (3s lower, 1s pause, 1s explode, 1s squeeze)
  useEffect(() => {
    if (!coachRunning) {
      clearInterval(coachIntervalRef.current);
      setCadencePhase('Ready');
      return;
    }

    let step = 0;
    const steps = [
      { text: 'Lowering (3s)...', freq: 350 },
      { text: 'Lowering (2s)...', freq: 350 },
      { text: 'Lowering (1s)...', freq: 350 },
      { text: 'Pause / Stretch', freq: 440 },
      { text: 'EXPLODE UP!', freq: 700 },
      { text: 'PEAK SQUEEZE', freq: 880 },
    ];

    coachIntervalRef.current = setInterval(() => {
      const current = steps[step];
      setCadencePhase(current.text);
      playBeep(current.freq, 'sine', 0.12);
      step = (step + 1) % steps.length;
    }, 1000);

    return () => clearInterval(coachIntervalRef.current);
  }, [coachRunning, soundEnabled]);

  if (!exercise) return null;

  const handleAdd = () => {
    onAddToRoutine({
      ...exercise,
      muscleName: muscleName,
    });
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#ff2a5f', '#10b981', '#f59e0b'],
    });
  };

  const cues = exercise.cues || {
    setup: 'Set up with solid foundation, keep core braced and shoulder blades retracted.',
    execution: exercise.simpleGuide || 'Execute with smooth tempo, control the negative portion of each repetition.',
    focus: 'Focus on maximum mind-muscle connection and target muscle squeeze.',
    commonMistakes: ['Rushing the negative (eccentric) phase', 'Using excessive momentum', 'Incomplete range of motion'],
  };

  const activation = exercise.activation || {
    primary: 90,
    secondary: [
      { name: 'Front Deltoids', percent: 50 },
      { name: 'Triceps', percent: 40 },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0e17] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto text-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800 bg-[#080910]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Dumbbell className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700 uppercase">
                  {exercise.equipment || 'Standard'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                  {exercise.level || 'Intermediate'}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {exercise.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              title={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Top Section: Real HD Video + Quick Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Real HD Video Demonstration */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-black border border-slate-700/80 shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${EXERCISE_VIDEO_MAP[exercise.name]?.youtubeId || '0G2_kW746co'}?autoplay=1&mute=1&loop=1&playlist=${EXERCISE_VIDEO_MAP[exercise.name]?.youtubeId || '0G2_kW746co'}&controls=1&modestbranding=1&rel=0&showinfo=0`}
                  title={`${exercise.name} Real HD Demonstration`}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: Key Stats & Activation Bars */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">SETS</span>
                  <span className="text-base sm:text-lg font-bold text-white">{exercise.sets || '3 - 4'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">REPS</span>
                  <span className="text-base sm:text-lg font-bold text-cyan-400">{exercise.reps || '8 - 12'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">REST</span>
                  <span className="text-base sm:text-lg font-bold text-amber-400">{exercise.rest || '90s'}</span>
                </div>
              </div>

              {/* Muscle Activation Progress Bars */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PRIMARY ACTIVATION</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{activation.primary}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${activation.primary}%` }}
                  />
                </div>

                {activation.secondary?.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-slate-500 block">
                      SECONDARY SYNERGISTS
                    </span>
                    {activation.secondary.map((sec, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-300">{sec.name}</span>
                          <span className="text-slate-400">{sec.percent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-slate-600 h-full rounded-full"
                            style={{ width: `${sec.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'guide'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>STEP-BY-STEP FORM GUIDE</span>
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'timer'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>CADENCE COACH & REST TIMER</span>
            </button>
          </div>

          {/* Tab 1: Step-by-Step Form Execution */}
          {activeTab === 'guide' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Setup */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                      1
                    </span>
                    <span>INITIAL SETUP</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">{cues.setup}</p>
                </div>

                {/* 2. Execution */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                      2
                    </span>
                    <span>MOVEMENT EXECUTION</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">{cues.execution}</p>
                </div>

                {/* 3. Mind-Muscle Focus */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                      3
                    </span>
                    <span>MIND-MUSCLE CUE</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">{cues.focus}</p>
                </div>

                {/* 4. Why It Works */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                      4
                    </span>
                    <span>BIOMECHANICAL BENEFIT</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">{exercise.whyItWorks || cues.focus}</p>
                </div>
              </div>

              {/* Common Mistakes to Avoid */}
              {cues.commonMistakes?.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
                    <ShieldAlert className="w-4 h-4" />
                    <span>COMMON MISTAKES TO AVOID</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-200">
                    {cues.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Interactive Cadence Coach & Set Timer */}
          {activeTab === 'timer' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Cadence Coach Metronome */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between text-center space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                      REAL-TIME CADENCE COACH
                    </span>
                    <p className="text-xs text-slate-500">
                      Guides 3s eccentric lowering, 1s pause, and explosive concentric power.
                    </p>
                  </div>

                  <div className="py-6 px-4 rounded-2xl bg-[#080a10] border border-slate-800">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-cyan-400">
                      {cadencePhase}
                    </span>
                  </div>

                  <button
                    onClick={() => setCoachRunning((prev) => !prev)}
                    className={`w-full py-3 rounded-xl font-bold font-mono text-sm transition-all flex items-center justify-center gap-2 ${
                      coachRunning
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:brightness-110 shadow-lg'
                    }`}
                  >
                    {coachRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{coachRunning ? 'STOP CADENCE COACH' : 'START CADENCE COACH'}</span>
                  </button>
                </div>

                {/* Rest Timer */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between text-center space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                      SET REST TIMER
                    </span>
                    <p className="text-xs text-slate-500">
                      Countdown recovery timer between working sets.
                    </p>
                  </div>

                  <div className="py-6 px-4 rounded-2xl bg-[#080a10] border border-slate-800">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-wider text-amber-400">
                      {Math.floor(restSeconds / 60)}:{(restSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTimerRunning((prev) => !prev)}
                      className={`flex-1 py-3 rounded-xl font-bold font-mono text-sm transition-all flex items-center justify-center gap-2 ${
                        timerRunning
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{timerRunning ? 'PAUSE' : 'START REST'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        const match = exercise.rest?.match(/\d+/);
                        setRestSeconds(match ? parseInt(match[0], 10) : 90);
                      }}
                      className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-4 border-t border-slate-800 bg-[#080910] flex items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            Target: <strong className="text-cyan-400">{exercise.target || muscleName}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-colors"
            >
              CLOSE
            </button>
            <button
              onClick={handleAdd}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-mono text-xs font-bold hover:brightness-110 shadow-lg transition-all flex items-center gap-2"
            >
              {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isAdded ? 'ADDED TO ROUTINE' : 'ADD TO ROUTINE'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
