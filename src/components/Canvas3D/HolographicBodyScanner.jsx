import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  Activity,
  Scan,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Target,
  RefreshCw,
  Eye,
  RotateCw,
  Crosshair,
  Flame,
  Zap,
  Play,
  Check,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { MUSCLE_GROUPS } from '../../data/muscleData';

/**
 * Ultra-HD Holographic Bio-Scanner & Professional Biomechanics Designer Studio
 * Features significantly expanded viewport scale, separate high-definition FRONT & BACK
 * anatomical models, interactive precision reticles, animated laser sweep scan,
 * SVG leader-line telemetry callouts, and real-time workout sync.
 */
export default function HolographicBodyScanner({
  selectedMuscle = null,
  selectedSubMuscle = null,
  hoveredMuscle = null,
  hoveredSubMuscle = null,
  onSelectMuscle,
  onSelectSubMuscle,
  onHoverMuscle,
  onHoverSubMuscle,
  isStudioExpanded = false,
  onToggleStudioExpand,
}) {
  const [viewOrientation, setViewOrientation] = useState('front'); // 'front' | 'back'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomFocus, setZoomFocus] = useState('center'); // 'center' | 'torso' | 'arms' | 'core' | 'legs'
  const [visualLayer, setVisualLayer] = useState('hologram'); // 'hologram' | 'xray' | 'heatmap'

  // Front Anatomical Hit Zones (mapped precisely to /anatomy_hologram.png 459x612)
  const FRONT_HIT_ZONES = useMemo(
    () => [
      // Chest Sub-Muscles
      {
        id: 'upper_chest',
        parentId: 'chest',
        name: 'Upper Chest (Clavicular Head)',
        region: 'torso',
        fiber: '30° Oblique Cranial',
        emg: '92%',
        action: 'Shoulder Flexion & Incline Pressing',
        style: { top: '21.2%', left: '40.3%', width: '19.4%', height: '5.2%' },
      },
      {
        id: 'mid_chest',
        parentId: 'chest',
        name: 'Mid Chest (Sternal Head)',
        region: 'torso',
        fiber: 'Transverse Horizontal',
        emg: '96%',
        action: 'Horizontal Adduction & Flat Pressing',
        style: { top: '26.5%', left: '39.2%', width: '21.6%', height: '5.8%' },
      },
      {
        id: 'lower_chest',
        parentId: 'chest',
        name: 'Lower Chest (Costal Head)',
        region: 'torso',
        fiber: 'Inferior Oblique',
        emg: '89%',
        action: 'Decline Pressing & Cable Crossovers',
        style: { top: '32.3%', left: '40.3%', width: '19.4%', height: '4.5%' },
      },

      // Front & Side Deltoids (Shoulders)
      {
        id: 'front_delt',
        parentId: 'shoulders',
        name: 'Left Front Deltoid (Anterior Head)',
        region: 'torso',
        fiber: 'Anterior Vertical',
        emg: '90%',
        action: 'Overhead Pressing & Front Raises',
        style: { top: '21.2%', left: '31%', width: '9%', height: '7.5%' },
      },
      {
        id: 'front_delt',
        parentId: 'shoulders',
        name: 'Right Front Deltoid (Anterior Head)',
        region: 'torso',
        fiber: 'Anterior Vertical',
        emg: '90%',
        action: 'Overhead Pressing & Front Raises',
        style: { top: '21.2%', left: '60%', width: '9%', height: '7.5%' },
      },
      {
        id: 'side_delt',
        parentId: 'shoulders',
        name: 'Left Lateral Deltoid (Side Cap)',
        region: 'torso',
        fiber: 'Multipennate Lateral',
        emg: '95%',
        action: 'Shoulder Abduction (Lateral Raises)',
        style: { top: '22.2%', left: '26.5%', width: '6%', height: '7.5%' },
      },
      {
        id: 'side_delt',
        parentId: 'shoulders',
        name: 'Right Lateral Deltoid (Side Cap)',
        region: 'torso',
        fiber: 'Multipennate Lateral',
        emg: '95%',
        action: 'Shoulder Abduction (Lateral Raises)',
        style: { top: '22.2%', left: '67.5%', width: '6%', height: '7.5%' },
      },

      // Biceps & Forearms
      {
        id: 'long_head',
        parentId: 'biceps',
        name: 'Left Biceps (Long & Short Heads)',
        region: 'arms',
        fiber: 'Parallel Longitudinal',
        emg: '94%',
        action: 'Elbow Flexion & Forearm Supination',
        style: { top: '29.4%', left: '27%', width: '8%', height: '10%' },
      },
      {
        id: 'long_head',
        parentId: 'biceps',
        name: 'Right Biceps (Long & Short Heads)',
        region: 'arms',
        fiber: 'Parallel Longitudinal',
        emg: '94%',
        action: 'Elbow Flexion & Forearm Supination',
        style: { top: '29.4%', left: '65%', width: '8%', height: '10%' },
      },
      {
        id: 'brachialis',
        parentId: 'biceps',
        name: 'Left Forearm (Brachioradialis)',
        region: 'arms',
        fiber: 'Unipennate Longitudinal',
        emg: '88%',
        action: 'Hammer Curls & Grip Flexion',
        style: { top: '39.5%', left: '21%', width: '8.5%', height: '12%' },
      },
      {
        id: 'brachialis',
        parentId: 'biceps',
        name: 'Right Forearm (Brachioradialis)',
        region: 'arms',
        fiber: 'Unipennate Longitudinal',
        emg: '88%',
        action: 'Hammer Curls & Grip Flexion',
        style: { top: '39.5%', left: '70.5%', width: '8.5%', height: '12%' },
      },

      // Abs & Core
      {
        id: 'upper_abs',
        parentId: 'abs',
        name: 'Upper Rectus Abdominis (6-Pack)',
        region: 'core',
        fiber: 'Vertical Segmented',
        emg: '93%',
        action: 'Spinal Flexion & Trunk Stability',
        style: { top: '36.8%', left: '42.5%', width: '15%', height: '6.5%' },
      },
      {
        id: 'lower_abs',
        parentId: 'abs',
        name: 'Lower Core & Pelvis',
        region: 'core',
        fiber: 'Vertical / Transverse',
        emg: '91%',
        action: 'Posterior Pelvic Tilt & Leg Raises',
        style: { top: '43.8%', left: '42.5%', width: '15%', height: '7%' },
      },

      // Quads
      {
        id: 'rectus_femoris',
        parentId: 'quads',
        name: 'Left Quadriceps (Center & Outer)',
        region: 'legs',
        fiber: 'Bipennate Longitudinal',
        emg: '96%',
        action: 'Knee Extension & Hip Flexion',
        style: { top: '52%', left: '37%', width: '11.5%', height: '16%' },
      },
      {
        id: 'rectus_femoris',
        parentId: 'quads',
        name: 'Right Quadriceps (Center & Outer)',
        region: 'legs',
        fiber: 'Bipennate Longitudinal',
        emg: '96%',
        action: 'Knee Extension & Hip Flexion',
        style: { top: '52%', left: '51.5%', width: '11.5%', height: '16%' },
      },
      {
        id: 'vastus_medialis',
        parentId: 'quads',
        name: 'Left Teardrop VMO',
        region: 'legs',
        fiber: 'Oblique Distal',
        emg: '94%',
        action: 'Terminal Knee Extension & Patellar Tracking',
        style: { top: '67%', left: '40.5%', width: '6.5%', height: '5.5%' },
      },
      {
        id: 'vastus_medialis',
        parentId: 'quads',
        name: 'Right Teardrop VMO',
        region: 'legs',
        fiber: 'Oblique Distal',
        emg: '94%',
        action: 'Terminal Knee Extension & Patellar Tracking',
        style: { top: '67%', left: '53%', width: '6.5%', height: '5.5%' },
      },

      // Anterior Calves
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Left Shin & Anterior Tibialis',
        region: 'legs',
        fiber: 'Pennate Vertical',
        emg: '87%',
        action: 'Plantarflexion & Ankle Stabilization',
        style: { top: '73.5%', left: '38%', width: '9%', height: '15.5%' },
      },
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Right Shin & Anterior Tibialis',
        region: 'legs',
        fiber: 'Pennate Vertical',
        emg: '87%',
        action: 'Plantarflexion & Ankle Stabilization',
        style: { top: '73.5%', left: '53%', width: '9%', height: '15.5%' },
      },
    ],
    []
  );

  // Back (Posterior) Anatomical Hit Zones (mapped precisely to /anatomy_hologram_back.png 1024x1024)
  const BACK_HIT_ZONES = useMemo(
    () => [
      // Upper Back / Trapezius & Neck
      {
        id: 'upper_back_traps',
        parentId: 'back',
        name: 'Upper Trapezius & Neck',
        region: 'torso',
        fiber: 'Convergent Superior',
        emg: '95%',
        action: 'Scapular Elevation & Neck Extension',
        style: { top: '14%', left: '40%', width: '20%', height: '9%' },
      },
      // Rear Deltoids (Posterior Delts)
      {
        id: 'rear_delt',
        parentId: 'shoulders',
        name: 'Left Rear Deltoid (Posterior Head)',
        region: 'torso',
        fiber: 'Posterior Horizontal',
        emg: '92%',
        action: 'Horizontal Abduction & Face Pulls',
        style: { top: '18.5%', left: '33%', width: '8.5%', height: '8%' },
      },
      {
        id: 'rear_delt',
        parentId: 'shoulders',
        name: 'Right Rear Deltoid (Posterior Head)',
        region: 'torso',
        fiber: 'Posterior Horizontal',
        emg: '92%',
        action: 'Horizontal Abduction & Face Pulls',
        style: { top: '18.5%', left: '58.5%', width: '8.5%', height: '8%' },
      },
      // Lats / Wings
      {
        id: 'lats',
        parentId: 'back',
        name: 'Latissimus Dorsi (Lats / Wings)',
        region: 'torso',
        fiber: 'Fan-shaped Oblique',
        emg: '97%',
        action: 'Shoulder Adduction & Vertical Pull-downs',
        style: { top: '24%', left: '37%', width: '26%', height: '13%' },
      },
      // Triceps (Horseshoe & Long Head)
      {
        id: 'lateral_head',
        parentId: 'triceps',
        name: 'Left Triceps (Lateral & Long Heads)',
        region: 'arms',
        fiber: 'Pennate Posterior',
        emg: '93%',
        action: 'Elbow Extension & Cable Push-downs',
        style: { top: '26%', left: '28.5%', width: '8%', height: '11%' },
      },
      {
        id: 'lateral_head',
        parentId: 'triceps',
        name: 'Right Triceps (Lateral & Long Heads)',
        region: 'arms',
        fiber: 'Pennate Posterior',
        emg: '93%',
        action: 'Elbow Extension & Cable Push-downs',
        style: { top: '26%', left: '63.5%', width: '8%', height: '11%' },
      },
      // Lower Back & Spine
      {
        id: 'lower_back',
        parentId: 'back',
        name: 'Lower Back (Erector Spinae)',
        region: 'core',
        fiber: 'Longitudinal Columnar',
        emg: '94%',
        action: 'Spinal Extension & Hip Hinge Stabilization',
        style: { top: '37%', left: '43%', width: '14%', height: '8%' },
      },
      // Glutes & Hips
      {
        id: 'glutes',
        parentId: 'glutes_hamstrings',
        name: 'Gluteus Maximus (Left & Right)',
        region: 'legs',
        fiber: 'Pennate Diagonal',
        emg: '98%',
        action: 'Hip Extension & Powerful Thrusting',
        style: { top: '44%', left: '38.5%', width: '23%', height: '11%' },
      },
      // Hamstrings
      {
        id: 'hamstrings',
        parentId: 'glutes_hamstrings',
        name: 'Left Hamstrings (Biceps Femoris)',
        region: 'legs',
        fiber: 'Unipennate Longitudinal',
        emg: '95%',
        action: 'Knee Flexion & Hip Extension',
        style: { top: '55%', left: '38%', width: '10%', height: '16%' },
      },
      {
        id: 'hamstrings',
        parentId: 'glutes_hamstrings',
        name: 'Right Hamstrings (Biceps Femoris)',
        region: 'legs',
        fiber: 'Unipennate Longitudinal',
        emg: '95%',
        action: 'Knee Flexion & Hip Extension',
        style: { top: '55%', left: '52%', width: '10%', height: '16%' },
      },
      // Calves / Gastrocnemius (Posterior Diamond)
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Left Calf (Gastrocnemius & Soleus)',
        region: 'legs',
        fiber: 'Multipennate Diamond',
        emg: '96%',
        action: 'Plantarflexion & Explosive Jumps',
        style: { top: '72%', left: '38%', width: '9%', height: '16%' },
      },
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Right Calf (Gastrocnemius & Soleus)',
        region: 'legs',
        fiber: 'Multipennate Diamond',
        emg: '96%',
        action: 'Plantarflexion & Explosive Jumps',
        style: { top: '72%', left: '53%', width: '9%', height: '16%' },
      },
    ],
    []
  );

  const currentHitZones = viewOrientation === 'front' ? FRONT_HIT_ZONES : BACK_HIT_ZONES;

  // Active Selected Zone Object for High-Tech Designer Telemetry & HUD Pinning
  const activeZone = useMemo(() => {
    if (!selectedMuscle) return null;
    return (
      currentHitZones.find(
        (z) => z.parentId === selectedMuscle && (selectedSubMuscle ? z.id === selectedSubMuscle : true)
      ) || currentHitZones.find((z) => z.parentId === selectedMuscle) || null
    );
  }, [currentHitZones, selectedMuscle, selectedSubMuscle]);

  // Active Muscle Group Data
  const currentMuscleData = selectedMuscle ? (MUSCLE_GROUPS[selectedMuscle] || null) : null;

  // Auto-focus camera on muscle click
  const handleZoneClick = (zone) => {
    onSelectMuscle(zone.parentId);
    if (onSelectSubMuscle) {
      onSelectSubMuscle(zone.id);
    }

    // Smart region framing based on muscle area
    if (zone.region === 'torso') {
      setZoomFocus('torso');
      setZoomLevel(1.28);
    } else if (zone.region === 'arms') {
      setZoomFocus('arms');
      setZoomLevel(1.3);
    } else if (zone.region === 'core') {
      setZoomFocus('core');
      setZoomLevel(1.35);
    } else if (zone.region === 'legs') {
      setZoomFocus('legs');
      setZoomLevel(1.28);
    }
  };

  const handleZoneHover = (zone) => {
    if (onHoverMuscle) onHoverMuscle(zone.parentId);
    if (onHoverSubMuscle) onHoverSubMuscle(zone.id);
  };

  const handleZoneLeave = () => {
    if (onHoverMuscle) onHoverMuscle(null);
    if (onHoverSubMuscle) onHoverSubMuscle(null);
  };

  // Compute transform translation string for smooth camera panning
  const getCameraTransform = () => {
    let translateY = '0%';
    let translateX = '0%';

    if (zoomFocus === 'torso') {
      translateY = '12%';
    } else if (zoomFocus === 'arms') {
      translateY = '8%';
    } else if (zoomFocus === 'core') {
      translateY = '-4%';
    } else if (zoomFocus === 'legs') {
      translateY = '-18%';
    }

    return `scale(${zoomLevel}) translate(${translateX}, ${translateY})`;
  };

  return (
    <div className="relative w-full h-[720px] sm:h-[800px] lg:h-[860px] xl:h-[900px] rounded-3xl overflow-hidden glass-panel-glow border border-slate-700/80 shadow-2xl group select-none bg-[#03050f] flex flex-col justify-between p-4 sm:p-5 transition-all duration-500">
      {/* High-Tech Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1228]/90 via-[#040714]/60 to-[#020308] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-cyan-500/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyberpunk Grid Subtle Line Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,242,254,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,254,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ========================================================
          1. TOP DESIGNER HUD BAR: BIOMETRIC TELEMETRY & VIEW MODES
      ======================================================== */}
      <div className="relative z-30 flex items-center justify-between w-full gap-2 flex-wrap pb-2 border-b border-slate-800/80">
        {/* Live Scanner Telemetry Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#070b18]/90 backdrop-blur-md border border-cyan-500/30 text-xs font-mono shadow-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
          <span className="text-white font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span>3D PRO DESIGNER</span>
            <span className="text-cyan-400 font-extrabold">• SCANNER STUDIO</span>
          </span>
          <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
            AUTO-SYNC 4K
          </span>
        </div>

        {/* Visual Layer Mode Switches (Hologram / X-Ray / EMG Heatmap) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#070b18]/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono shadow-md">
          <button
            onClick={() => setVisualLayer('hologram')}
            title="Standard 3D Holographic Translucent Anatomy"
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              visualLayer === 'hologram'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">HOLOGRAM</span>
          </button>
          <button
            onClick={() => setVisualLayer('xray')}
            title="X-Ray Neural Channel & Skeletal Contrast Mode"
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              visualLayer === 'xray'
                ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">X-RAY</span>
          </button>
          <button
            onClick={() => setVisualLayer('heatmap')}
            title="Thermal EMG Muscle Hypertrophy Heatmap"
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              visualLayer === 'heatmap'
                ? 'bg-gradient-to-r from-red-500 to-amber-500 text-slate-950 shadow-[0_0_12px_rgba(255,42,95,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span className="hidden sm:inline">HEATMAP</span>
          </button>
        </div>

        {/* FRONT vs BACK Anatomical View Switches & Studio Expand */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#070b18]/90 backdrop-blur-md border border-slate-700/80 text-xs font-mono shadow-md">
            <button
              onClick={() => {
                setViewOrientation('front');
                if (selectedMuscle === 'back') {
                  onSelectMuscle('chest');
                  if (onSelectSubMuscle) onSelectSubMuscle('upper_chest');
                }
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-all uppercase flex items-center gap-1.5 ${
                viewOrientation === 'front'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>FRONT BODY</span>
            </button>
            <button
              onClick={() => {
                setViewOrientation('back');
                if (selectedMuscle === 'chest' || selectedMuscle === 'abs') {
                  onSelectMuscle('back');
                  if (onSelectSubMuscle) onSelectSubMuscle('lats');
                }
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-all uppercase flex items-center gap-1.5 ${
                viewOrientation === 'back'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>BACK (POSTERIOR)</span>
            </button>
          </div>

          {/* Full Studio Expand Toggle */}
          {onToggleStudioExpand && (
            <button
              onClick={onToggleStudioExpand}
              title={isStudioExpanded ? 'Exit Fullscreen Studio' : 'Expand Pro Studio View'}
              className="p-2 rounded-xl bg-[#070b18]/90 border border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shadow-md"
            >
              {isStudioExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          2. CENTRAL ULTRA-LARGE 3D ANATOMY VIEWPORT & DESIGNER HUD
      ======================================================== */}
      <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden w-full">
        {/* Ambient Radial Spotlight Focused on Active Muscle Coordinates */}
        {activeZone && (
          <div
            className="absolute z-10 pointer-events-none transition-all duration-700 rounded-full blur-3xl opacity-60"
            style={{
              top: activeZone.style.top,
              left: activeZone.style.left,
              width: '240px',
              height: '240px',
              transform: 'translate(-50%, -50%)',
              background:
                visualLayer === 'heatmap'
                  ? 'radial-gradient(circle, rgba(255,42,95,0.4) 0%, rgba(245,158,11,0.15) 50%, transparent 80%)'
                  : visualLayer === 'xray'
                  ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(0,242,254,0.15) 50%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(0,242,254,0.4) 0%, rgba(56,189,248,0.15) 50%, transparent 80%)',
            }}
          />
        )}

        {/* Scaled High-Definition Anatomical Figure Wrapper (Exact aspect ratio to prevent letterboxing) */}
        <div
          className={`relative h-full max-h-[760px] sm:max-h-[820px] ${
            viewOrientation === 'front' ? 'aspect-[459/612]' : 'aspect-square'
          } transition-transform duration-700 ease-out flex items-center justify-center`}
          style={{
            transform: getCameraTransform(),
          }}
        >
          {/* Exact Anatomical Image: Front or Back with Layer Mode Filters */}
          <img
            key={`${viewOrientation}-${visualLayer}`}
            src={viewOrientation === 'front' ? '/anatomy_hologram.png' : '/anatomy_hologram_back.png'}
            alt={`3D Holographic Translucent Anatomy Model (${viewOrientation} view)`}
            className={`w-full h-full object-contain select-none pointer-events-none animate-fadeIn transition-all duration-500 ${
              visualLayer === 'xray'
                ? 'filter-xray-mode'
                : visualLayer === 'heatmap'
                ? 'filter-heatmap-mode'
                : 'filter-hologram-mode'
            }`}
          />

          {/* Pulsating Cardiac Heart Glow Beacon (Front view only) */}
          {viewOrientation === 'front' && (
            <div
              className="absolute z-20 pointer-events-none"
              style={{ top: '26.1%', left: '49.9%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-tr from-red-600 to-rose-400 shadow-[0_0_16px_#ff0033]" />
              </div>
            </div>
          )}

          {/* Interactive Clickable & Hoverable Sub-Muscle Target Zones */}
          {currentHitZones.map((zone, idx) => {
            const isParentSelected = selectedMuscle === zone.parentId;
            const isSubSelected = selectedSubMuscle === zone.id;
            const isTargetActive = isSubSelected && isParentSelected;
            const isHovered = hoveredMuscle === zone.parentId || hoveredSubMuscle === zone.id;

            return (
              <button
                key={idx}
                onClick={() => handleZoneClick(zone)}
                onMouseEnter={() => handleZoneHover(zone)}
                onMouseLeave={handleZoneLeave}
                style={zone.style}
                className={`absolute rounded-2xl transition-all duration-300 z-20 cursor-pointer group flex items-center justify-center ${
                  isTargetActive
                    ? 'bg-red-500/30 border-2 border-red-400 shadow-[0_0_24px_rgba(255,42,95,0.85)] scale-105'
                    : isParentSelected
                    ? 'bg-cyan-500/25 border border-cyan-400 shadow-[0_0_16px_rgba(0,242,254,0.65)]'
                    : isHovered
                    ? 'bg-cyan-500/20 border border-cyan-300/80 shadow-[0_0_12px_rgba(0,242,254,0.5)]'
                    : 'bg-transparent hover:bg-cyan-500/15 border border-transparent hover:border-cyan-400/40'
                }`}
                title={`Target ${zone.name} — Click to stream real video & biomechanics`}
              >
                {/* PRO DESIGNER HUD: High-Tech Reticle & Laser Sweep on Active Selected Zone */}
                {isTargetActive && (
                  <>
                    {/* Animated High-Tech Precision Target Bracket Corners */}
                    <div className="absolute -inset-1.5 pointer-events-none animate-bracket-pulse">
                      {/* Top-Left Bracket */}
                      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-300 rounded-tl-sm shadow-[0_0_8px_#00f2fe]" />
                      {/* Top-Right Bracket */}
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-300 rounded-tr-sm shadow-[0_0_8px_#00f2fe]" />
                      {/* Bottom-Left Bracket */}
                      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-300 rounded-bl-sm shadow-[0_0_8px_#00f2fe]" />
                      {/* Bottom-Right Bracket */}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-300 rounded-br-sm shadow-[0_0_8px_#00f2fe]" />
                    </div>

                    {/* Laser Scanning Sweep Line */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#00f2fe] animate-laser-sweep" />
                    </div>

                    {/* Central Rotating Concentric Hologram Target Ring */}
                    <div className="absolute pointer-events-none flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full border border-dashed border-cyan-400/70 animate-spin-slow" />
                      <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ff0033]" />
                    </div>
                  </>
                )}

                {/* Floating Ping Beacon Indicator on active target only */}
                {isTargetActive && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3 pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_#ff0033]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================
            3. FLOATING DESIGNER TELEMETRY LEADER CALLOUT BADGE
        ======================================================== */}
        {activeZone && (
          <div className="absolute bottom-4 left-4 z-30 max-w-[310px] hidden sm:block animate-fadeIn pointer-events-auto">
            <div className="p-3.5 rounded-2xl bg-[#060a18]/95 backdrop-blur-xl border border-cyan-500/40 shadow-[0_12px_36px_rgba(0,0,0,0.8)] text-slate-200">
              {/* Header Ticker */}
              <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-extrabold flex items-center gap-1.5 tracking-wider">
                  <Target className="w-3 h-3 text-cyan-400" />
                  <span>TARGET LOCK // #{activeZone.id.toUpperCase()}</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  EMG {activeZone.emg || '94%'}
                </span>
              </div>

              {/* Muscle Title & Anatomy */}
              <div className="mb-2">
                <div className="text-sm font-bold text-white tracking-tight leading-snug">
                  {activeZone.name}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {currentMuscleData?.name || 'Muscle Group'} • <span className="text-cyan-300 font-semibold">{activeZone.fiber || 'Longitudinal'}</span>
                </div>
              </div>

              {/* Biomechanical Action Cue */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-2.5 text-[11px] text-slate-300">
                <span className="text-slate-400 block text-[9px] font-mono font-bold uppercase tracking-wider mb-0.5">
                  PRIMARY ACTION
                </span>
                <span>{activeZone.action || 'Compound resistance movement & hypertrophy loading'}</span>
              </div>

              {/* Quick Action Info */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Play className="w-2.5 h-2.5 fill-cyan-400" />
                  <span>STREAMING REAL 4K HD VIDEO</span>
                </span>
                <span className="text-slate-400 font-bold">AUTO-SYNCED</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          4. BOTTOM DESIGNER CONTROL DOCK: REGION FOCUS & ZOOM HUD
      ======================================================== */}
      <div className="relative z-30 flex items-center justify-between w-full gap-2 pt-3 border-t border-slate-800/80 flex-wrap">
        {/* Interaction Prompt & Live Muscle Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          {currentMuscleData ? (
            <>
              <span className="hidden sm:inline">
                TARGET LOCKED IN PRO DESIGNER • <span className="text-cyan-400 font-bold">{currentMuscleData.name.toUpperCase()}</span>
              </span>
              <span className="sm:hidden text-cyan-400 font-bold">
                {currentMuscleData.name.toUpperCase()} ACTIVE
              </span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">
                3D BODY READY • CLICK ANY MUSCLE ON THE ANATOMY TO INITIALIZE TARGET SCAN & VIDEOS
              </span>
              <span className="sm:hidden text-slate-300 font-bold">
                TAP ANY MUSCLE TO SCAN
              </span>
            </>
          )}
        </div>

        {/* Camera Focus Region Presets */}
        <div className="flex items-center gap-1 bg-[#070b18]/90 border border-slate-700/80 rounded-xl p-1 text-[11px] font-mono shadow-md">
          {[
            { id: 'center', label: 'FULL BODY', zoom: 1 },
            { id: 'torso', label: 'TORSO', zoom: 1.35 },
            { id: 'arms', label: 'ARMS', zoom: 1.42 },
            { id: 'core', label: 'CORE', zoom: 1.45 },
            { id: 'legs', label: 'LEGS', zoom: 1.36 },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => {
                setZoomFocus(view.id);
                setZoomLevel(view.zoom);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold uppercase transition-all ${
                zoomFocus === view.id
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {view.label}
            </button>
          ))}

          {/* Stepper Zoom Buttons */}
          <div className="flex items-center gap-0.5 border-l border-slate-800 pl-1 ml-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="px-1 text-[10px] text-slate-400 font-bold min-w-[34px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, +(z + 0.15).toFixed(2)))}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setZoomLevel(1);
                setZoomFocus('center');
              }}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset Zoom & Camera View"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
