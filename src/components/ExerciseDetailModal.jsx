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
import { resolveExerciseVideo } from './RealWorkoutVideoPlayer';

/**
 * High-definition Exercise Detail & Form Trainer Modal
 * White & Red professional theme with:
 * - Real 4K/HD Video Stream
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
      // Audio context policy fallback
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

  const videoMeta = resolveExerciseVideo(exercise.name);

  const handleAdd = () => {
    onAddToRoutine({
      ...exercise,
      muscleName: muscleName,
    });
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#dc2626', '#ef4444', '#f87171', '#b91c1c'],
    });
  };

  const cues = exercise.cues || {
    setup: 'Set up with solid foundation, keep core braced and shoulder blades retracted.',
    execution: exercise.simpleGuide || 'Execute with smooth tempo, control the negative portion of each repetition.',
    focus: 'Focus on maximum mind-muscle connection and target muscle squeeze.',
    commonMistakes: ['Rushing the negative (eccentric) phase', 'Using excessive momentum', 'Incomplete range of motion'],
  };

  const activation = exercise.activation || {
    primary: 92,
    secondary: [
      { name: 'Core Stabilizers', percent: 45 },
      { name: 'Synergist Load', percent: 60 },
    ],
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto text-gray-800">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100">
              <Dumbbell className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-600 uppercase border border-red-100">
                  {exercise.equipment || 'Standard'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gray-100 text-gray-700 uppercase">
                  {exercise.level || 'Intermediate'}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 mt-0.5">
                {exercise.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              title={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
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
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-black border border-gray-800 shadow-lg">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoMeta.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${videoMeta.youtubeId}&controls=1&modestbranding=1&rel=0&showinfo=0`}
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
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">SETS</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">{exercise.sets || '3 - 4'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">REPS</span>
                  <span className="text-base sm:text-lg font-bold text-red-600">{exercise.reps || '8 - 12'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">REST</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">{exercise.rest || '90s'}</span>
                </div>
              </div>

              {/* Muscle Activation Progress Bars */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-gray-600 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-red-600" />
                    <span>PRIMARY ACTIVATION</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600">{activation.primary}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${activation.primary}%` }}
                  />
                </div>

                {activation.secondary?.length > 0 && (
                  <div className="pt-2 border-t border-gray-200 space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-gray-400 block">
                      SECONDARY SYNERGISTS
                    </span>
                    {activation.secondary.map((sec, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-gray-700">{sec.name}</span>
                          <span className="text-gray-500">{sec.percent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gray-400 h-full rounded-full"
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
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-mono">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'guide'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>STEP-BY-STEP FORM GUIDE</span>
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'timer'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>REST TIMER & CADENCE METRONOME</span>
            </button>
          </div>

          {/* TAB 1: FORM CUES & COMMON MISTAKES */}
          {activeTab === 'guide' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-red-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  1. SETUP & STANCE
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">{cues.setup}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-red-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  2. EXECUTION & DESCENT
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">{cues.execution}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-red-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  3. MIND-MUSCLE FOCUS
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">{cues.focus}</p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
                <span className="text-xs font-mono uppercase font-bold text-red-600 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                  COMMON MISTAKES TO AVOID
                </span>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  {cues.commonMistakes?.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE REST TIMER & AUDIO METRONOME */}
          {activeTab === 'timer' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Rest Interval Timer */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-gray-500 block mb-1">
                    BETWEEN-SET REST INTERVAL
                  </span>
                  <div className="text-5xl font-black font-mono text-gray-900 tracking-tight my-4">
                    {formatTimer(restSeconds)}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setTimerRunning((prev) => !prev)}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{timerRunning ? 'PAUSE' : 'START REST'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setRestSeconds(90);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cadence Metronome */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-red-600 block mb-1">
                    HYPERTROPHY CADENCE METRONOME (3-0-1-0)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-display text-gray-900 my-4 uppercase tracking-tight">
                    {cadencePhase}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCoachRunning((prev) => !prev)}
                    className="px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    {coachRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{coachRunning ? 'STOP METRONOME' : 'START CADENCE'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs font-mono text-gray-500 hidden sm:inline">
            Target Muscle Group: <strong className="text-gray-900">{muscleName}</strong>
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-mono font-bold transition-colors"
            >
              CLOSE
            </button>
            <button
              onClick={handleAdd}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                isAdded
                  ? 'bg-red-50 border border-red-200 text-red-600'
                  : 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md shadow-red-600/20 hover:brightness-110'
              }`}
            >
              {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isAdded ? 'ADDED TO ROUTINE' : 'ADD TO WORKOUT ROUTINE'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
