import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { MUSCLE_GROUPS } from '../../data/muscleData';
import {
  RotateCw,
  ZoomOut,
  Compass,
  Zap,
  Move,
  CheckCircle2,
  Crosshair,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

/**
 * ============================================================================
 * REALISTIC 360° ROTATABLE ANATOMICAL HUMAN MODEL (CLEAN LIGHT THEME)
 * 
 * 1. Single Rotatable Body with organic anatomical curves & muscle bellies
 * 2. Professional 360° Drag Rotation & Precision Angle Presets
 * 3. Deep Zoom into clicked muscle with Sub-Muscle Divisions & Striations
 * 4. Contextual "Less-Pixel" Dimmed Background Anatomy
 * 5. Light, Attractive, Medical-Grade UI (Strictly NO Pink)
 * ============================================================================
 */

// Anatomical Zoom Coordinates & Facing Angles
const MUSCLE_FOCUS_CONFIG = {
  chest: { x: 75, y: 90, w: 250, h: 170, angle: 0, label: 'CHEST / PECS' },
  shoulders: { x: 50, y: 90, w: 300, h: 170, angle: 0, label: 'DELTOIDS' },
  biceps: { x: 40, y: 150, w: 320, h: 220, angle: 0, label: 'BICEPS & ARMS' },
  abs: { x: 80, y: 160, w: 240, h: 180, angle: 0, label: 'ABS & CORE' },
  quads: { x: 70, y: 290, w: 260, h: 220, angle: 0, label: 'QUADRICEPS' },
  calves: { x: 90, y: 460, w: 220, h: 200, angle: 0, label: 'CALVES' },
  back: { x: 60, y: 80, w: 280, h: 220, angle: 180, label: 'LATS & BACK' },
  triceps: { x: 50, y: 150, w: 300, h: 220, angle: 180, label: 'TRICEPS' },
  glutes_hamstrings: { x: 70, y: 260, w: 260, h: 240, angle: 180, label: 'GLUTES & HAMSTRINGS' },
};

// Clean, attractive, non-pink color themes
const MUSCLE_PALETTES = {
  chest: { base: '#ea580c', glow: '#f97316', fill: 'url(#grad-pecs)', stroke: '#c2410c' },
  shoulders: { base: '#d97706', glow: '#f59e0b', fill: 'url(#grad-delts)', stroke: '#b45309' },
  biceps: { base: '#dc2626', glow: '#ef4444', fill: 'url(#grad-biceps)', stroke: '#b91c1c' },
  triceps: { base: '#ea580c', glow: '#f97316', fill: 'url(#grad-triceps)', stroke: '#c2410c' },
  abs: { base: '#b91c1c', glow: '#dc2626', fill: 'url(#grad-abs)', stroke: '#991b1b' },
  quads: { base: '#2563eb', glow: '#3b82f6', fill: 'url(#grad-quads)', stroke: '#1d4ed8' },
  back: { base: '#4338ca', glow: '#6366f1', fill: 'url(#grad-lats)', stroke: '#3730a3' },
  glutes_hamstrings: { base: '#1e40af', glow: '#3b82f6', fill: 'url(#grad-posterior)', stroke: '#1e3a8a' },
  calves: { base: '#059669', glow: '#10b981', fill: 'url(#grad-calves)', stroke: '#047857' },
};

export default function AnatomyDiagramMap({
  selectedMuscle = null,
  hoveredMuscle = null,
  onSelectMuscle,
  onHoverMuscle,
  // Sub-muscle drill-down props
  zoomedMuscle = null,
  onZoomIntoMuscle,
  onZoomOut,
  selectedSubMuscle = null,
  hoveredSubMuscle = null,
  onSelectSubMuscle,
  onHoverSubMuscle,
  experienceLevel = 'intermediate',
}) {
  // 360° Rotation State [0° to 360°]
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  
  // Feature Toggles
  const [showLeaderLines, setShowLeaderLines] = useState(true);
  const [showStriations, setShowStriations] = useState(true);

  // Floating Workout Hover Card
  const [hoverCard, setHoverCard] = useState({ visible: false, subData: null });

  const containerRef = useRef(null);
  const isZoomed = !!zoomedMuscle;
  const activeMuscleKey = zoomedMuscle || hoveredMuscle || selectedMuscle || 'chest';
  const activeMuscleData = MUSCLE_GROUPS[activeMuscleKey] || MUSCLE_GROUPS.chest;

  // Normalized rotation in 0-360 range
  const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
  // Front-facing if angle is within [270°..360°] or [0°..90°]
  const isFrontFacing = normalizedAngle < 90 || normalizedAngle >= 270;

  // Auto-Rotation Loop
  useEffect(() => {
    if (!isAutoRotating || isZoomed) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1.0) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotating, isZoomed]);

  // When zooming into a muscle, auto-rotate to its anatomical facing angle
  useEffect(() => {
    if (zoomedMuscle && MUSCLE_FOCUS_CONFIG[zoomedMuscle]) {
      const targetAngle = MUSCLE_FOCUS_CONFIG[zoomedMuscle].angle;
      setIsAutoRotating(false);
      setRotationAngle(targetAngle);
    }
  }, [zoomedMuscle]);

  // Drag-to-Rotate handlers
  const handlePointerDown = (e) => {
    if (isZoomed) return;
    setIsDragging(true);
    setIsAutoRotating(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragStartAngle(rotationAngle);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isZoomed) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    const newAngle = dragStartAngle + deltaX * 0.7;
    setRotationAngle(((newAngle % 360) + 360) % 360);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Compute SVG viewBox based on zoom state
  const currentViewBox = useMemo(() => {
    if (!isZoomed || !MUSCLE_FOCUS_CONFIG[zoomedMuscle]) {
      return "0 0 400 680"; // Full Body View
    }
    const cfg = MUSCLE_FOCUS_CONFIG[zoomedMuscle];
    return `${cfg.x} ${cfg.y} ${cfg.w} ${cfg.h}`;
  }, [isZoomed, zoomedMuscle]);

  // Click on a muscle
  const handleMuscleClick = (muscleId, subId = null) => {
    if (onZoomIntoMuscle) {
      onZoomIntoMuscle(muscleId);
    } else if (onSelectMuscle) {
      onSelectMuscle(muscleId);
    }
    if (subId && onSelectSubMuscle) {
      onSelectSubMuscle(subId);
    }
  };

  // Sub-muscle hover handler
  const handleSubHover = (subId) => {
    if (onHoverSubMuscle) onHoverSubMuscle(subId);
    if (!subId) {
      setHoverCard({ visible: false, subData: null });
      return;
    }
    const subObj = activeMuscleData.subMuscles?.find((s) => s.id === subId);
    if (subObj) {
      setHoverCard({ visible: true, subData: subObj });
    }
  };

  const isHighlighted = (id) => (selectedMuscle === id || hoveredMuscle === id || zoomedMuscle === id);
  const isSubHighlighted = (id) => (selectedSubMuscle === id || hoveredSubMuscle === id);

  // Helper for styling muscles (Sharp HD for active/zoomed, Pixel-Dimmed Ghost for background)
  const getMuscleElementProps = (muscleId, subId = null) => {
    const isTargeted = subId ? isSubHighlighted(subId) : isHighlighted(muscleId);
    const isThisMuscleZoomed = zoomedMuscle === muscleId;
    const palette = MUSCLE_PALETTES[muscleId] || MUSCLE_PALETTES.chest;

    // If zoomed and this is NOT the zoomed muscle -> Apply low-opacity, reduced pixel styling
    if (isZoomed && !isThisMuscleZoomed) {
      return {
        fill: '#e2e8f0',
        stroke: '#cbd5e1',
        strokeWidth: 0.8,
        opacity: 0.18,
        filter: 'url(#pixel-dim-filter)',
        className: 'transition-all duration-500 pointer-events-none',
      };
    }

    // If this is the active/highlighted muscle
    if (isTargeted) {
      return {
        fill: palette.fill,
        stroke: '#0284c7',
        strokeWidth: 2.2,
        filter: 'url(#med-glow)',
        opacity: 1,
        className: 'cursor-pointer transition-all duration-300',
        onClick: () => handleMuscleClick(muscleId, subId),
        onMouseEnter: () => {
          if (onHoverMuscle) onHoverMuscle(muscleId);
          if (subId) handleSubHover(subId);
        },
        onMouseLeave: () => {
          if (onHoverMuscle) onHoverMuscle(null);
          if (subId) handleSubHover(null);
        },
      };
    }

    // Default Sharp Colored state
    return {
      fill: palette.fill,
      stroke: palette.stroke,
      strokeWidth: 1.2,
      opacity: 0.92,
      className: 'cursor-pointer transition-all duration-300 hover:opacity-100',
      onClick: () => handleMuscleClick(muscleId, subId),
      onMouseEnter: () => {
        if (onHoverMuscle) onHoverMuscle(muscleId);
        if (subId) handleSubHover(subId);
      },
      onMouseLeave: () => {
        if (onHoverMuscle) onHoverMuscle(null);
        if (subId) handleSubHover(null);
      },
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] lg:h-[700px] rounded-3xl overflow-hidden border border-slate-200/80 select-none bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] flex flex-col justify-between"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Background ambient lighting (Cyan & Ice Blue, NO PINK) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================
          TOP 360° ROTATION & ZOOM CONTROL BAR (LIGHT & CLEAN)
      ======================================================== */}
      <div className="relative z-20 px-4 pt-3 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        
        {/* Left: Zoom Out Button or 360° Angle Presets */}
        <div className="flex items-center gap-2">
          {isZoomed ? (
            <button
              onClick={onZoomOut}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-xs font-mono text-cyan-800 font-bold transition-all shadow-sm hover:scale-105"
            >
              <ZoomOut className="w-3.5 h-3.5 text-cyan-600" />
              <span>← RESET ZOOM (FULL BODY)</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setRotationAngle(0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all font-bold ${
                  isFrontFacing && Math.abs(normalizedAngle) < 45
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                ANTERIOR (FRONT)
              </button>

              <button
                onClick={() => setRotationAngle(180)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all font-bold ${
                  !isFrontFacing && Math.abs(normalizedAngle - 180) < 45
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                POSTERIOR (BACK)
              </button>

              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isAutoRotating
                    ? 'bg-amber-50 text-amber-700 border border-amber-300 animate-pulse font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title="360° Auto-Orbit"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                <span>360° SPIN</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Rotation Angle Dial & Feature Toggles */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {!isZoomed && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px]">
              <Move className="w-3 h-3 text-cyan-600" />
              <span>DRAG TO ROTATE: </span>
              <strong className="text-slate-900 font-mono">{Math.round(normalizedAngle)}°</strong>
            </div>
          )}

          <button
            onClick={() => setShowLeaderLines(!showLeaderLines)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
              showLeaderLines ? 'bg-slate-900 text-white border-slate-800 font-bold' : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Compass className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">CALLOUTS</span>
          </button>

          <button
            onClick={() => setShowStriations(!showStriations)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
              showStriations ? 'bg-slate-900 text-white border-slate-800 font-bold' : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">FIBERS</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          FLOATING WORKOUT SPLIT HOVER CARD (CLEAN LIGHT THEME)
      ======================================================== */}
      {hoverCard.visible && hoverCard.subData && (
        <div className="absolute top-16 right-4 z-30 w-72 p-4 rounded-2xl glass-panel-glow border border-cyan-200 shadow-xl animate-fade-in pointer-events-auto backdrop-blur-xl">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-cyan-100 text-cyan-800 border border-cyan-200 font-bold">
              TARGET WORKOUT SPLIT
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {hoverCard.subData.scientificName}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wide">
            {hoverCard.subData.name}
          </h4>

          {hoverCard.subData.levelWorkouts?.[experienceLevel]?.[0] && (
            <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>PRIMARY EXERCISE:</span>
                <span className="text-emerald-600 font-bold uppercase">{experienceLevel}</span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">
                {hoverCard.subData.levelWorkouts[experienceLevel][0].name}
              </div>
              <div className="text-[10px] text-cyan-700 font-mono mt-0.5 font-bold">
                {hoverCard.subData.levelWorkouts[experienceLevel][0].sets} • {hoverCard.subData.levelWorkouts[experienceLevel][0].reps}
              </div>
            </div>
          )}

          <div className="mt-2 text-[10px] text-slate-500 font-mono text-center">
            Click to lock this sub-muscle & view full workout
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN ROTATABLE REALISTIC SINGLE-BODY 3D CANVAS
      ======================================================== */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center p-2 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
      >
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: !isZoomed ? `rotateY(${isFrontFacing ? normalizedAngle : normalizedAngle - 180}deg)` : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            viewBox={currentViewBox}
            className="w-full h-full max-h-[620px] drop-shadow-md transition-all duration-700 ease-out"
          >
            {/* SVG DEFINITIONS */}
            <defs>
              {/* Clean Glow Filter */}
              <filter id="med-glow" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComponentTransfer in="blur" result="glow1">
                  <feFuncA type="linear" slope="1.4" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Pixel-Dimmed Ghost Filter for remaining body */}
              <filter id="pixel-dim-filter" x="0%" y="0%" width="100%" height="100%">
                <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.2 0" />
                <feGaussianBlur stdDeviation="0.4" />
              </filter>

              {/* Color Gradients (STRICTLY NO PINK) */}
              <linearGradient id="grad-pecs" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <linearGradient id="grad-delts" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="grad-biceps" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <linearGradient id="grad-triceps" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
              <linearGradient id="grad-abs" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              <linearGradient id="grad-quads" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
              <linearGradient id="grad-lats" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
              <linearGradient id="grad-posterior" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>
              <linearGradient id="grad-calves" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>

            {/* ========================================================
                REALISTIC ANTERIOR (FRONT) BODY MODEL
            ======================================================== */}
            {isFrontFacing ? (
              <g className="transition-all duration-300">
                {/* Anatomical Head, Jaw & Neck */}
                <ellipse cx="200" cy="52" rx="22" ry="26" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" {...(isZoomed && zoomedMuscle !== 'chest' && zoomedMuscle !== 'shoulders' ? { filter: 'url(#pixel-dim-filter)', opacity: 0.15 } : {})} />
                <path d="M190 74 L188 100 Q200 106 212 100 L210 74 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'chest' && zoomedMuscle !== 'shoulders' ? { filter: 'url(#pixel-dim-filter)', opacity: 0.15 } : {})} />

                {/* Trapezius Slope */}
                <path d="M188 84 L146 112 L158 124 L192 100 Z" fill="#ea580c" opacity="0.8" stroke="#c2410c" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'shoulders' && zoomedMuscle !== 'chest' ? { filter: 'url(#pixel-dim-filter)', opacity: 0.15 } : {})} />
                <path d="M212 84 L254 112 L242 124 L208 100 Z" fill="#ea580c" opacity="0.8" stroke="#c2410c" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'shoulders' && zoomedMuscle !== 'chest' ? { filter: 'url(#pixel-dim-filter)', opacity: 0.15 } : {})} />

                {/* CHEST / PECTORALS (Realistic Fan Curves) */}
                <g>
                  {/* Left Pec Belly */}
                  <path d="M196 108 L142 114 Q124 138 136 172 Q168 184 196 170 Z" {...getMuscleElementProps('chest', isZoomed ? 'mid_chest' : null)} />
                  {/* Left Clavicular Upper Pec */}
                  <path d="M196 108 L146 114 Q138 130 154 140 Q178 136 196 130 Z" {...getMuscleElementProps('chest', isZoomed ? 'upper_chest' : null)} />
                  
                  {/* Right Pec Belly */}
                  <path d="M204 108 L258 114 Q276 138 264 172 Q232 184 204 170 Z" {...getMuscleElementProps('chest', isZoomed ? 'mid_chest' : null)} />
                  {/* Right Clavicular Upper Pec */}
                  <path d="M204 108 L254 114 Q262 130 246 140 Q222 136 204 130 Z" {...getMuscleElementProps('chest', isZoomed ? 'upper_chest' : null)} />
                  
                  {/* Sternal Midline */}
                  <line x1="200" y1="108" x2="200" y2="170" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" strokeDasharray="3,2" />

                  {/* Striations */}
                  {showStriations && (
                    <g stroke="#ffffff" strokeWidth="0.8" opacity="0.35" pointerEvents="none">
                      <line x1="152" y1="126" x2="188" y2="148" />
                      <line x1="148" y1="142" x2="186" y2="160" />
                      <line x1="248" y1="126" x2="212" y2="148" />
                      <line x1="252" y1="142" x2="214" y2="160" />
                    </g>
                  )}

                  {/* Sub-Muscle Labels in Zoom Mode */}
                  {isZoomed && zoomedMuscle === 'chest' && (
                    <g pointerEvents="none">
                      <text x="200" y="128" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="900" fontFamily="monospace">UPPER PECS (CLAVICULAR)</text>
                      <text x="200" y="156" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="900" fontFamily="monospace">MID PECS (STERNAL)</text>
                    </g>
                  )}
                </g>

                {/* DELTOIDS (3D Round Shoulder Caps) */}
                <g>
                  <path d="M140 110 Q106 120 102 156 Q115 186 134 174 Q144 144 140 110 Z" {...getMuscleElementProps('shoulders', isZoomed ? 'front_delt' : null)} />
                  <path d="M260 110 Q294 120 298 156 Q285 186 266 174 Q256 144 260 110 Z" {...getMuscleElementProps('shoulders', isZoomed ? 'side_delt' : null)} />
                </g>

                {/* BICEPS & FOREARMS (Sculpted Arms) */}
                <g>
                  <path d="M114 170 Q98 192 104 230 Q122 226 130 194 Q128 176 114 170 Z" {...getMuscleElementProps('biceps', isZoomed ? 'bicep_long_head' : null)} />
                  <path d="M286 170 Q302 192 296 230 Q278 226 270 194 Q272 176 286 170 Z" {...getMuscleElementProps('biceps', isZoomed ? 'bicep_short_head' : null)} />
                  <path d="M102 232 Q86 272 94 316 L114 314 Q122 272 116 232 Z" {...getMuscleElementProps('biceps', isZoomed ? 'forearms' : null)} />
                  <path d="M298 232 Q314 272 306 316 L286 314 Q278 272 284 232 Z" {...getMuscleElementProps('biceps', isZoomed ? 'forearms' : null)} />
                  {/* Hands */}
                  <path d="M92 318 L84 352 L110 352 L108 318 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed ? { opacity: 0.15 } : {})} />
                  <path d="M308 318 L316 352 L290 352 L292 318 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed ? { opacity: 0.15 } : {})} />
                </g>

                {/* ABS & OBLIQUES (Curved Anatomical 6-Pack) */}
                <g>
                  {/* Obliques */}
                  <path d="M138 188 Q126 232 156 272 L162 252 L152 188 Z" {...getMuscleElementProps('abs', isZoomed ? 'obliques' : null)} />
                  <path d="M262 188 Q274 232 244 272 L238 252 L248 188 Z" {...getMuscleElementProps('abs', isZoomed ? 'obliques' : null)} />
                  {/* 6-Pack Segments */}
                  <rect x="170" y="182" width="26" height="24" rx="4" {...getMuscleElementProps('abs', isZoomed ? 'upper_abs' : null)} />
                  <rect x="204" y="182" width="26" height="24" rx="4" {...getMuscleElementProps('abs', isZoomed ? 'upper_abs' : null)} />
                  <rect x="172" y="212" width="24" height="24" rx="4" {...getMuscleElementProps('abs', isZoomed ? 'upper_abs' : null)} />
                  <rect x="204" y="212" width="24" height="24" rx="4" {...getMuscleElementProps('abs', isZoomed ? 'upper_abs' : null)} />
                  <rect x="174" y="242" width="22" height="26" rx="4" {...getMuscleElementProps('abs', isZoomed ? 'lower_abs' : null)} />
                  <rect x="204" y="242" width="22" height="26" rx="4" {...getMuscleElementProps('abs', isZoomed ? 'lower_abs' : null)} />
                </g>

                {/* Pelvis */}
                <path d="M162 272 L200 304 L238 272 L230 308 L170 308 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'quads' && zoomedMuscle !== 'abs' ? { opacity: 0.15 } : {})} />

                {/* QUADS & THIGHS (Anatomical Curves & VMO Teardrop) */}
                <g>
                  {/* Left Outer Sweep (Vastus Lateralis) */}
                  <path d="M154 308 Q122 360 142 452 Q162 462 170 446 Q162 360 166 308 Z" {...getMuscleElementProps('quads', isZoomed ? 'vastus_lateralis' : null)} />
                  {/* Left Center (Rectus Femoris) */}
                  <path d="M166 308 Q162 366 170 432 Q182 436 186 426 Q188 366 182 308 Z" {...getMuscleElementProps('quads', isZoomed ? 'rectus_femoris' : null)} />
                  {/* Left VMO Teardrop */}
                  <ellipse cx="186" cy="442" rx="10" ry="14" {...getMuscleElementProps('quads', isZoomed ? 'vastus_medialis' : null)} />

                  {/* Right Outer Sweep */}
                  <path d="M246 308 Q278 360 258 452 Q238 462 230 446 Q238 360 234 308 Z" {...getMuscleElementProps('quads', isZoomed ? 'vastus_lateralis' : null)} />
                  {/* Right Center */}
                  <path d="M234 308 Q238 366 230 432 Q218 436 214 426 Q212 366 218 308 Z" {...getMuscleElementProps('quads', isZoomed ? 'rectus_femoris' : null)} />
                  {/* Right VMO Teardrop */}
                  <ellipse cx="214" cy="442" rx="10" ry="14" {...getMuscleElementProps('quads', isZoomed ? 'vastus_medialis' : null)} />

                  {/* Patella Kneecaps */}
                  <circle cx="174" cy="464" r="9" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.2" {...(isZoomed && zoomedMuscle !== 'quads' && zoomedMuscle !== 'calves' ? { opacity: 0.15 } : {})} />
                  <circle cx="226" cy="464" r="9" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.2" {...(isZoomed && zoomedMuscle !== 'quads' && zoomedMuscle !== 'calves' ? { opacity: 0.15 } : {})} />
                </g>

                {/* CALVES & SHINS */}
                <g>
                  <path d="M160 478 Q144 530 154 604 L180 604 Q188 530 182 478 Z" {...getMuscleElementProps('calves', isZoomed ? 'gastrocnemius' : null)} />
                  <path d="M240 478 Q256 530 246 604 L220 604 Q212 530 218 478 Z" {...getMuscleElementProps('calves', isZoomed ? 'gastrocnemius' : null)} />
                  {/* Feet */}
                  <path d="M154 608 L140 646 L186 646 L182 608 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'calves' ? { opacity: 0.15 } : {})} />
                  <path d="M246 608 L260 646 L214 646 L218 608 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'calves' ? { opacity: 0.15 } : {})} />
                </g>

                {/* Leader Lines (Overview Mode) */}
                {!isZoomed && showLeaderLines && (
                  <g className="pointer-events-none text-[9px] font-mono font-bold" opacity="0.95">
                    <g opacity={isHighlighted('chest') ? 1 : 0.6}>
                      <line x1="168" y1="138" x2="60" y2="125" stroke="#ea580c" strokeWidth="1" strokeDasharray="3,2" />
                      <circle cx="168" cy="138" r="3.5" fill="#ea580c" />
                      <rect x="0" y="114" width="60" height="20" rx="4" fill="#ffffff" stroke="#ea580c" strokeWidth="1" />
                      <text x="30" y="128" textAnchor="middle" fill="#c2410c">CHEST</text>
                    </g>
                    <g opacity={isHighlighted('shoulders') ? 1 : 0.6}>
                      <line x1="282" y1="145" x2="340" y2="130" stroke="#d97706" strokeWidth="1" strokeDasharray="3,2" />
                      <circle cx="282" cy="145" r="3.5" fill="#d97706" />
                      <rect x="340" y="120" width="55" height="20" rx="4" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                      <text x="367" y="134" textAnchor="middle" fill="#b45309">DELTS</text>
                    </g>
                    <g opacity={isHighlighted('abs') ? 1 : 0.6}>
                      <line x1="220" y1="220" x2="340" y2="220" stroke="#b91c1c" strokeWidth="1" strokeDasharray="3,2" />
                      <circle cx="220" cy="220" r="3.5" fill="#b91c1c" />
                      <rect x="340" y="210" width="55" height="20" rx="4" fill="#ffffff" stroke="#b91c1c" strokeWidth="1" />
                      <text x="367" y="224" textAnchor="middle" fill="#991b1b">ABS</text>
                    </g>
                    <g opacity={isHighlighted('quads') ? 1 : 0.6}>
                      <line x1="160" y1="380" x2="40" y2="380" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" />
                      <circle cx="160" cy="380" r="3.5" fill="#2563eb" />
                      <rect x="0" y="370" width="55" height="20" rx="4" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
                      <text x="27" y="384" textAnchor="middle" fill="#1d4ed8">QUADS</text>
                    </g>
                  </g>
                )}
              </g>
            ) : (
              /* ========================================================
                  REALISTIC POSTERIOR (BACK) BODY MODEL
              ======================================================== */
              <g className="transition-all duration-300">
                <ellipse cx="200" cy="52" rx="22" ry="26" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" {...(isZoomed && zoomedMuscle !== 'back' ? { filter: 'url(#pixel-dim-filter)', opacity: 0.15 } : {})} />
                <path d="M190 74 L188 100 Q200 106 212 100 L210 74 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'back' ? { filter: 'url(#pixel-dim-filter)', opacity: 0.15 } : {})} />

                {/* TRAPEZIUS & LATS */}
                <g>
                  {/* Trapezius Kite Diamond */}
                  <path d="M200 84 L255 118 L232 176 L200 192 L168 176 L145 118 Z" {...getMuscleElementProps('back', isZoomed ? 'upper_traps' : null)} />
                  {/* Lats Wings */}
                  <path d="M165 170 L122 156 Q126 232 168 272 L188 255 Z" {...getMuscleElementProps('back', isZoomed ? 'lats' : null)} />
                  <path d="M235 170 L278 156 Q274 232 232 272 L212 255 Z" {...getMuscleElementProps('back', isZoomed ? 'lats' : null)} />
                  {/* Spinal Column */}
                  <rect x="188" y="182" width="24" height="85" rx="4" fill="#312e81" stroke="#4338ca" strokeWidth="1" {...(isZoomed && zoomedMuscle !== 'back' ? { opacity: 0.15 } : {})} />
                </g>

                {/* REAR DELTS */}
                <g>
                  <path d="M144 114 Q110 126 108 156 Q124 180 136 168 Q146 140 144 114 Z" {...getMuscleElementProps('shoulders', isZoomed ? 'rear_delt' : null)} />
                  <path d="M256 114 Q290 126 292 156 Q276 180 264 168 Q254 140 256 114 Z" {...getMuscleElementProps('shoulders', isZoomed ? 'rear_delt' : null)} />
                </g>

                {/* TRICEPS */}
                <g>
                  <path d="M110 166 Q94 192 100 232 Q120 228 126 192 Q122 172 110 166 Z" {...getMuscleElementProps('triceps', isZoomed ? 'tricep_long_head' : null)} />
                  <path d="M290 166 Q306 192 300 232 Q280 228 274 192 Q278 172 290 166 Z" {...getMuscleElementProps('triceps', isZoomed ? 'tricep_lateral_head' : null)} />
                </g>

                {/* GLUTES & HAMSTRINGS */}
                <g>
                  <path d="M198 272 Q142 276 140 318 Q148 368 198 372 Z" {...getMuscleElementProps('glutes_hamstrings', isZoomed ? 'glute_max' : null)} />
                  <path d="M202 272 Q258 276 260 318 Q252 368 202 372 Z" {...getMuscleElementProps('glutes_hamstrings', isZoomed ? 'glute_max' : null)} />
                  <path d="M146 378 Q132 422 142 466 L186 466 Q194 422 190 378 Z" {...getMuscleElementProps('glutes_hamstrings', isZoomed ? 'hamstrings' : null)} />
                  <path d="M254 378 Q268 422 258 466 L214 466 Q206 422 210 378 Z" {...getMuscleElementProps('glutes_hamstrings', isZoomed ? 'hamstrings' : null)} />
                </g>

                {/* CALVES POSTERIOR */}
                <g>
                  <path d="M160 482 Q132 528 146 582 Q162 606 174 606 Q192 562 186 482 Z" {...getMuscleElementProps('calves', isZoomed ? 'gastrocnemius' : null)} />
                  <path d="M240 482 Q268 528 254 582 Q238 606 226 606 Q208 562 214 482 Z" {...getMuscleElementProps('calves', isZoomed ? 'gastrocnemius' : null)} />
                </g>

                {/* Leader Lines (Posterior) */}
                {!isZoomed && showLeaderLines && (
                  <g className="pointer-events-none text-[9px] font-mono font-bold" opacity="0.95">
                    <g opacity={isHighlighted('back') ? 1 : 0.6}>
                      <line x1="200" y1="125" x2="340" y2="95" stroke="#4338ca" strokeWidth="1" strokeDasharray="3,2" />
                      <circle cx="200" cy="125" r="3.5" fill="#4338ca" />
                      <rect x="340" y="85" width="55" height="20" rx="4" fill="#ffffff" stroke="#4338ca" strokeWidth="1" />
                      <text x="367" y="99" textAnchor="middle" fill="#312e81">TRAPS</text>
                    </g>
                    <g opacity={isHighlighted('glutes_hamstrings') ? 1 : 0.6}>
                      <line x1="170" y1="330" x2="40" y2="320" stroke="#1e40af" strokeWidth="1" strokeDasharray="3,2" />
                      <circle cx="170" cy="330" r="3.5" fill="#1e40af" />
                      <rect x="0" y="310" width="55" height="20" rx="4" fill="#ffffff" stroke="#1e40af" strokeWidth="1" />
                      <text x="27" y="324" textAnchor="middle" fill="#172554">GLUTES</text>
                    </g>
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* ========================================================
          BOTTOM ANATOMICAL STATUS & CUES
      ======================================================== */}
      <div className="relative z-20 px-4 py-2.5 bg-white/90 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
          <span className="text-slate-700">
            {isZoomed ? (
              <>FOCUSED TARGET: <strong className="text-slate-900 uppercase">{activeMuscleData.name}</strong> (HD SUB-MUSCLES ACTIVE)</>
            ) : (
              <>ANATOMICAL ZONE: <strong className="text-slate-900 uppercase">{activeMuscleData.name}</strong></>
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500">
          <Crosshair className="w-3.5 h-3.5 text-cyan-600" />
          <span className="hidden sm:inline">
            {isZoomed ? "CLICK / HOVER SUB-MUSCLE FOR WORKOUT SPLITS" : "CLICK ANY MUSCLE TO ZOOM & DIM BACKGROUND"}
          </span>
        </div>
      </div>
    </div>
  );
}
