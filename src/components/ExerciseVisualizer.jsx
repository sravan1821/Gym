import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

/**
 * Interactive Biomechanical Exercise Movement Visualizer
 * Animates the rep motion cycle (eccentric, pause, concentric, contraction)
 * with real-time joint angles and muscle activation heatmap glow.
 */
export default function ExerciseVisualizer({
  exerciseName = 'Incline Dumbbell Press',
  targetMuscle = 'Upper Pec Shelf',
  equipment = 'dumbbell',
  tempo = '3-0-1-0',
  accentColor = '#ff2a5f',
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [repPhase, setRepPhase] = useState('concentric'); // 'eccentric' | 'pause' | 'concentric' | 'squeeze'
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [repCount, setRepCount] = useState(1);

  // Smooth animation loop for rep cadence
  useEffect(() => {
    if (!isPlaying) return;

    let frameId;
    let startTime = performance.now();
    const cycleDuration = 3600; // ms for 1 full rep cycle

    const loop = (now) => {
      const elapsed = (now - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration; // 0 to 1

      // Map progress to phases:
      // 0.00 - 0.45: Eccentric (Lowering, 45%)
      // 0.45 - 0.55: Stretch Pause (10%)
      // 0.55 - 0.85: Concentric (Pressing, 30%)
      // 0.85 - 1.00: Peak Contraction Squeeze (15%)
      if (progress < 0.45) {
        setRepPhase('eccentric');
        setPhaseProgress(progress / 0.45);
      } else if (progress < 0.55) {
        setRepPhase('pause');
        setPhaseProgress((progress - 0.45) / 0.1);
      } else if (progress < 0.85) {
        setRepPhase('concentric');
        setPhaseProgress((progress - 0.55) / 0.3);
      } else {
        setRepPhase('squeeze');
        setPhaseProgress((progress - 0.85) / 0.15);
      }

      // Check if wrapped around for rep count
      if (elapsed < 30) {
        setRepCount((prev) => (prev >= 12 ? 1 : prev + 1));
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // Motion calculation for SVG kinematics
  // y-position: 0 (top/contracted) to 1 (bottom/stretched)
  let motionY = 0;
  if (repPhase === 'eccentric') {
    motionY = phaseProgress; // 0 to 1
  } else if (repPhase === 'pause') {
    motionY = 1.0;
  } else if (repPhase === 'concentric') {
    motionY = 1.0 - phaseProgress; // 1 to 0
  } else {
    motionY = 0.0;
  }

  // Barbell/Dumbbell vertical offset
  const weightY = 110 + motionY * 42;
  const elbowX = 85 + motionY * 20;
  const elbowY = 150 + motionY * 18;
  const rightElbowX = 215 - motionY * 20;

  // Muscle glow intensity based on phase
  const muscleGlow = repPhase === 'squeeze' ? 1.0 : repPhase === 'concentric' ? 0.85 : 0.4;

  return (
    <div className="relative w-full rounded-2xl bg-[#090b10] /80 p-4 overflow-hidden select-none">
      {/* Studio lighting glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-25"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top HUD */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            BIOMECHANICAL FORM SCAN
          </span>
        </div>

        {/* Phase Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900/90  text-[10px] font-mono font-bold text-neutral-300">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                repPhase === 'squeeze'
                  ? '#10b981'
                  : repPhase === 'concentric'
                  ? '#ff2a5f'
                  : repPhase === 'pause'
                  ? '#f59e0b'
                  : '#3b82f6',
            }}
          />
          <span className="uppercase">
            {repPhase === 'squeeze'
              ? 'PEAK SQUEEZE'
              : repPhase === 'concentric'
              ? 'CONCENTRIC (DRIVE)'
              : repPhase === 'pause'
              ? 'STRETCH PAUSE'
              : 'ECCENTRIC (LOWER)'}
          </span>
        </div>
      </div>

      {/* SVG Kinetic Motion Canvas */}
      <div className="relative w-full h-48 flex items-center justify-center">
        <svg viewBox="0 0 300 240" className="w-full h-full max-h-48 drop-shadow-md">
          <defs>
            <linearGradient id="muscle-heat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2a5f" stopOpacity={0.9 * muscleGlow} />
              <stop offset="100%" stopColor="#ff7a00" stopOpacity={0.7 * muscleGlow} />
            </linearGradient>
            <linearGradient id="bone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Workout Bench Outline */}
          <rect x="110" y="80" width="80" height="150" rx="10" fill="#141724" stroke="#334155" strokeWidth="2" />
          <line x1="150" y1="80" x2="150" y2="230" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />

          {/* Torso & Head Silhouette */}
          <circle cx="150" cy="70" r="18" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <path
            d="M 120,100 Q 150,92 180,100 L 172,190 Q 150,195 128,190 Z"
            fill="#181e2e"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Target Active Muscle (Pectorals / Target) with Dynamic Heatmap Glow */}
          <path
            d="M 124,110 Q 150,106 176,110 Q 170,146 150,152 Q 130,146 124,110 Z"
            fill="url(#muscle-heat)"
            stroke="#ff2a5f"
            strokeWidth={repPhase === 'squeeze' ? 2.5 : 1.5}
            filter="url(#glow-filter)"
          />

          {/* Sternal Center Divider */}
          <line x1="150" y1="108" x2="150" y2="150" stroke="#090b10" strokeWidth="1.5" />

          {/* Left Arm Kinematic Chain (Shoulder -> Elbow -> Hand) */}
          <polyline
            points={`120,110 ${elbowX},${elbowY} 115,${weightY}`}
            fill="none"
            stroke="#64748b"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Shoulder Joint */}
          <circle cx="120" cy="110" r="5" fill="#38bdf8" />
          {/* Left Elbow Joint */}
          <circle cx={elbowX} cy={elbowY} r="4.5" fill="#0ea5e9" />
          {/* Left Hand */}
          <circle cx="115" cy={weightY} r="5" fill="#f8fafc" />

          {/* Right Arm Kinematic Chain (Shoulder -> Elbow -> Hand) */}
          <polyline
            points={`180,110 ${rightElbowX},${elbowY} 185,${weightY}`}
            fill="none"
            stroke="#64748b"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Shoulder Joint */}
          <circle cx="180" cy="110" r="5" fill="#38bdf8" />
          {/* Right Elbow Joint */}
          <circle cx={rightElbowX} cy={elbowY} r="4.5" fill="#0ea5e9" />
          {/* Right Hand */}
          <circle cx="185" cy={weightY} r="5" fill="#f8fafc" />

          {/* Barbell / Dumbbell Graphic */}
          {equipment === 'barbell' ? (
            <g>
              <line x1="50" y1={weightY} x2="250" y2={weightY} stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
              <rect x="45" y={weightY - 14} width="10" height="28" rx="2" fill="#ef4444" />
              <rect x="58" y={weightY - 18} width="12" height="36" rx="2" fill="#3b82f6" />
              <rect x="230" y={weightY - 18} width="12" height="36" rx="2" fill="#3b82f6" />
              <rect x="245" y={weightY - 14} width="10" height="28" rx="2" fill="#ef4444" />
            </g>
          ) : (
            <g>
              {/* Left Dumbbell */}
              <line x1="98" y1={weightY} x2="132" y2={weightY} stroke="#cbd5e1" strokeWidth="4" />
              <rect x="92" y={weightY - 12} width="8" height="24" rx="2" fill="#0ea5e9" />
              <rect x="130" y={weightY - 12} width="8" height="24" rx="2" fill="#0ea5e9" />
              {/* Right Dumbbell */}
              <line x1="168" y1={weightY} x2="202" y2={weightY} stroke="#cbd5e1" strokeWidth="4" />
              <rect x="162" y={weightY - 12} width="8" height="24" rx="2" fill="#0ea5e9" />
              <rect x="200" y={weightY - 12} width="8" height="24" rx="2" fill="#0ea5e9" />
            </g>
          )}

          {/* Dynamic Force Arrow on Concentric Drive */}
          {repPhase === 'concentric' && (
            <g>
              <line x1="150" y1={weightY + 22} x2="150" y2={weightY + 6} stroke="#ff2a5f" strokeWidth="3" strokeLinecap="round" />
              <polygon points={`146,${weightY + 8} 150,${weightY} 154,${weightY + 8}`} fill="#ff2a5f" />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Controls & Telemetry */}
      <div className="flex items-center justify-between gap-3 mt-2 pt-2.5 /80 text-xs font-mono">
        <div className="flex items-center gap-3 text-neutral-400">
          <span>
            REP: <strong className="text-white font-bold">{repCount} / 12</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span>
            TEMPO: <span className="text-emerald-400">{tempo}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-slate-700 text-neutral-200 transition-colors flex items-center gap-1 text-[11px]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setRepCount(1)}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-slate-700 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Reset Reps"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
