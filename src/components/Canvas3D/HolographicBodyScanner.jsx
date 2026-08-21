import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  MoveHorizontal,
  Compass,
} from 'lucide-react';
import { MUSCLE_GROUPS } from '../../data/muscleData';

/**
 * Transparent Image Processor Cache
 * Removes black background from the 3D anatomical images on the fly,
 * ensuring 100% transparent alpha so ONLY the human body figure rotates in 3D,
 * leaving the background studio fixed and constant!
 */
const transparentImageCache = {};

function processTransparentImage(src, callback) {
  if (transparentImageCache[src]) {
    callback(transparentImageCache[src]);
    return;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 1024;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const maxVal = Math.max(r, g, b);

        if (maxVal <= 8) {
          // Solid black background -> 100% transparent
          data[i + 3] = 0;
        } else if (maxVal <= 35) {
          // Feathered edge for smooth antialiasing
          data[i + 3] = Math.round(((maxVal - 8) / 27) * data[i + 3]);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const resultUrl = canvas.toDataURL('image/png');
      transparentImageCache[src] = resultUrl;
      callback(resultUrl);
    } catch (e) {
      console.warn('Canvas image processing fallback:', e);
      callback(src);
    }
  };
  img.onerror = () => callback(src);
  img.src = src;
}

/**
 * Ultra-HD Holographic Bio-Scanner & Professional Biomechanics Designer Studio
 * - Preserves the exact 3D anatomical medical model
 * - Completely removes the rotating black background (100% transparent body isolation)
 * - Professional 360-degree continuous turntable rotation, angle slider, and snap presets
 * - Constant, stationary studio background and ambient lighting
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
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360 continuous degrees
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [rotateSpeed, setRotateSpeed] = useState(1.2); // Degrees per frame
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  const [zoomLevel, setZoomLevel] = useState(1.18);
  const [zoomFocus, setZoomFocus] = useState('center'); // 'center' | 'torso' | 'arms' | 'core' | 'legs'
  const [visualLayer, setVisualLayer] = useState('hologram'); // 'hologram' | 'xray' | 'heatmap'

  const [frontImageSrc, setFrontImageSrc] = useState('/anatomy_hologram.png');
  const [backImageSrc, setBackImageSrc] = useState('/anatomy_hologram_back.png');

  // Load transparent versions of the exact 3D anatomical models
  useEffect(() => {
    processTransparentImage('/anatomy_hologram.png', (url) => setFrontImageSrc(url));
    processTransparentImage('/anatomy_hologram_back.png', (url) => setBackImageSrc(url));
  }, []);

  // Auto-snap rotation to Back (180°) or Front (0°) when a muscle is selected
  useEffect(() => {
    if (!selectedMuscle) return;
    const posteriorMuscles = ['back', 'glutes_hamstrings', 'calves', 'triceps'];
    if (posteriorMuscles.includes(selectedMuscle)) {
      setRotationAngle(180);
    } else {
      setRotationAngle(0);
    }
  }, [selectedMuscle]);

  // 360° Continuous Turntable Auto-Spin Loop
  useEffect(() => {
    if (!isAutoRotating) return;

    let animFrameId;
    const spinLoop = () => {
      setRotationAngle((prev) => (prev + rotateSpeed + 360) % 360);
      animFrameId = requestAnimationFrame(spinLoop);
    };

    animFrameId = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(animFrameId);
  }, [isAutoRotating, rotateSpeed]);

  // Normalized continuous angle in [0, 360)
  const normalizedAngle = ((rotationAngle % 360) + 360) % 360;

  // Derive hemisphere: Front (270° to 90°) vs Back (90° to 270°)
  const activeHemisphere = normalizedAngle >= 90 && normalizedAngle <= 270 ? 'back' : 'front';

  // Pointer drag to rotate 360°
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragStartAngle(rotationAngle);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - dragStartX;
      const newAngle = (dragStartAngle + deltaX * 0.75 + 36000) % 360;
      setRotationAngle(newAngle);
    };

    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, dragStartX, dragStartAngle]);

  // Snap to preset angles (0° Front, 90° Right, 180° Back, 270° Left)
  const handleSnapAngle = (angle) => {
    setRotationAngle(angle);
    setIsAutoRotating(false);
  };

  // Zoom Steppers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.18, 2.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.18, 0.85));
  const handleResetCamera = () => {
    setZoomLevel(1.18);
    setZoomFocus('center');
    handleSnapAngle(0);
  };

  // Front Anatomical Hit Zones
  const FRONT_HIT_ZONES = useMemo(
    () => [
      // Chest
      {
        id: 'upper_chest',
        parentId: 'chest',
        name: 'Upper Chest (Clavicular Head)',
        region: 'torso',
        fiber: '30° Oblique Cranial',
        emg: '92%',
        action: 'Shoulder Flexion & Incline Pressing',
        style: { top: '21.5%', left: '42%', width: '16%', height: '5%' },
      },
      {
        id: 'mid_chest',
        parentId: 'chest',
        name: 'Mid Chest (Sternal Head)',
        region: 'torso',
        fiber: 'Transverse Horizontal',
        emg: '96%',
        action: 'Horizontal Adduction & Flat Pressing',
        style: { top: '26.5%', left: '41%', width: '18%', height: '5.5%' },
      },
      {
        id: 'lower_chest',
        parentId: 'chest',
        name: 'Lower Chest (Costal Head)',
        region: 'torso',
        fiber: 'Inferior Oblique',
        emg: '89%',
        action: 'Decline Pressing & Cable Crossovers',
        style: { top: '32%', left: '42%', width: '16%', height: '4.5%' },
      },

      // Front & Side Delts
      {
        id: 'front_delt',
        parentId: 'shoulders',
        name: 'Left Front Deltoid (Anterior Head)',
        region: 'torso',
        fiber: 'Anterior Vertical',
        emg: '90%',
        action: 'Overhead Pressing & Front Raises',
        style: { top: '20%', left: '36%', width: '6.5%', height: '7%' },
      },
      {
        id: 'front_delt',
        parentId: 'shoulders',
        name: 'Right Front Deltoid (Anterior Head)',
        region: 'torso',
        fiber: 'Anterior Vertical',
        emg: '90%',
        action: 'Overhead Pressing & Front Raises',
        style: { top: '20%', left: '57.5%', width: '6.5%', height: '7%' },
      },
      {
        id: 'side_delt',
        parentId: 'shoulders',
        name: 'Left Lateral Deltoid (Side Cap)',
        region: 'torso',
        fiber: 'Multipennate Lateral',
        emg: '95%',
        action: 'Shoulder Abduction (Lateral Raises)',
        style: { top: '22%', left: '33.5%', width: '5%', height: '7%' },
      },
      {
        id: 'side_delt',
        parentId: 'shoulders',
        name: 'Right Lateral Deltoid (Side Cap)',
        region: 'torso',
        fiber: 'Multipennate Lateral',
        emg: '95%',
        action: 'Shoulder Abduction (Lateral Raises)',
        style: { top: '22%', left: '61.5%', width: '5%', height: '7%' },
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
        style: { top: '27%', left: '33.5%', width: '6%', height: '9%' },
      },
      {
        id: 'long_head',
        parentId: 'biceps',
        name: 'Right Biceps (Long & Short Heads)',
        region: 'arms',
        fiber: 'Parallel Longitudinal',
        emg: '94%',
        action: 'Elbow Flexion & Forearm Supination',
        style: { top: '27%', left: '60.5%', width: '6%', height: '9%' },
      },
      {
        id: 'brachialis',
        parentId: 'biceps',
        name: 'Left Forearm (Brachioradialis)',
        region: 'arms',
        fiber: 'Unipennate Longitudinal',
        emg: '88%',
        action: 'Hammer Curls & Grip Flexion',
        style: { top: '37%', left: '31%', width: '5.5%', height: '11%' },
      },
      {
        id: 'brachialis',
        parentId: 'biceps',
        name: 'Right Forearm (Brachioradialis)',
        region: 'arms',
        fiber: 'Unipennate Longitudinal',
        emg: '88%',
        action: 'Hammer Curls & Grip Flexion',
        style: { top: '37%', left: '63.5%', width: '5.5%', height: '11%' },
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
        style: { top: '36%', left: '44%', width: '12%', height: '6.5%' },
      },
      {
        id: 'lower_abs',
        parentId: 'abs',
        name: 'Lower Core & Pelvis',
        region: 'core',
        fiber: 'Vertical / Transverse',
        emg: '91%',
        action: 'Posteric Pelvic Tilt & Leg Raises',
        style: { top: '42.5%', left: '44%', width: '12%', height: '6.5%' },
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
        style: { top: '49%', left: '41%', width: '7.5%', height: '14%' },
      },
      {
        id: 'rectus_femoris',
        parentId: 'quads',
        name: 'Right Quadriceps (Center & Outer)',
        region: 'legs',
        fiber: 'Bipennate Longitudinal',
        emg: '96%',
        action: 'Knee Extension & Hip Flexion',
        style: { top: '49%', left: '51.5%', width: '7.5%', height: '14%' },
      },
      {
        id: 'vastus_medialis',
        parentId: 'quads',
        name: 'Left Teardrop VMO',
        region: 'legs',
        fiber: 'Oblique Distal',
        emg: '94%',
        action: 'Terminal Knee Extension & Patellar Tracking',
        style: { top: '63%', left: '43%', width: '5%', height: '5.5%' },
      },
      {
        id: 'vastus_medialis',
        parentId: 'quads',
        name: 'Right Teardrop VMO',
        region: 'legs',
        fiber: 'Oblique Distal',
        emg: '94%',
        action: 'Terminal Knee Extension & Patellar Tracking',
        style: { top: '63%', left: '52%', width: '5%', height: '5.5%' },
      },

      // Calves
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Left Shin & Anterior Tibialis',
        region: 'legs',
        fiber: 'Pennate Vertical',
        emg: '87%',
        action: 'Plantarflexion & Ankle Stabilization',
        style: { top: '70%', left: '41.5%', width: '7%', height: '15%' },
      },
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Right Shin & Anterior Tibialis',
        region: 'legs',
        fiber: 'Pennate Vertical',
        emg: '87%',
        action: 'Plantarflexion & Ankle Stabilization',
        style: { top: '70%', left: '51.5%', width: '7%', height: '15%' },
      },
    ],
    []
  );

  // Back (Posterior) Anatomical Hit Zones
  const BACK_HIT_ZONES = useMemo(
    () => [
      {
        id: 'upper_back_traps',
        parentId: 'back',
        name: 'Upper Trapezius & Neck',
        region: 'torso',
        fiber: 'Convergent Superior',
        emg: '95%',
        action: 'Scapular Elevation & Neck Extension',
        style: { top: '12%', left: '43%', width: '14%', height: '9%' },
      },
      {
        id: 'rear_delt',
        parentId: 'shoulders',
        name: 'Left Rear Deltoid (Posterior Head)',
        region: 'torso',
        fiber: 'Posterior Horizontal',
        emg: '92%',
        action: 'Horizontal Abduction & Face Pulls',
        style: { top: '18%', left: '35.5%', width: '6.5%', height: '7%' },
      },
      {
        id: 'rear_delt',
        parentId: 'shoulders',
        name: 'Right Rear Deltoid (Posterior Head)',
        region: 'torso',
        fiber: 'Posterior Horizontal',
        emg: '92%',
        action: 'Horizontal Abduction & Face Pulls',
        style: { top: '18%', left: '58%', width: '6.5%', height: '7%' },
      },
      {
        id: 'lats',
        parentId: 'back',
        name: 'Latissimus Dorsi (Lats / Wings)',
        region: 'torso',
        fiber: 'Fan-shaped Oblique',
        emg: '97%',
        action: 'Shoulder Adduction & Vertical Pull-downs',
        style: { top: '23%', left: '40%', width: '20%', height: '13%' },
      },
      {
        id: 'lateral_head',
        parentId: 'triceps',
        name: 'Left Triceps (Lateral & Long Heads)',
        region: 'arms',
        fiber: 'Pennate Posterior',
        emg: '93%',
        action: 'Elbow Extension & Cable Push-downs',
        style: { top: '24%', left: '34%', width: '6%', height: '12%' },
      },
      {
        id: 'lateral_head',
        parentId: 'triceps',
        name: 'Right Triceps (Lateral & Long Heads)',
        region: 'arms',
        fiber: 'Pennate Posterior',
        emg: '93%',
        action: 'Elbow Extension & Cable Push-downs',
        style: { top: '24%', left: '60%', width: '6%', height: '12%' },
      },
      {
        id: 'lower_back',
        parentId: 'back',
        name: 'Lower Back (Erector Spinae)',
        region: 'core',
        fiber: 'Longitudinal Columnar',
        emg: '94%',
        action: 'Spinal Extension & Hip Hinge Stabilization',
        style: { top: '35%', left: '44%', width: '12%', height: '7.5%' },
      },
      {
        id: 'glutes',
        parentId: 'glutes_hamstrings',
        name: 'Gluteus Maximus (Left & Right)',
        region: 'legs',
        fiber: 'Pennate Diagonal',
        emg: '98%',
        action: 'Hip Extension & Powerful Thrusting',
        style: { top: '43%', left: '41%', width: '18%', height: '10.5%' },
      },
      {
        id: 'hamstrings',
        parentId: 'glutes_hamstrings',
        name: 'Left Hamstrings (Biceps Femoris)',
        region: 'legs',
        fiber: 'Unipennate Longitudinal',
        emg: '95%',
        action: 'Knee Flexion & Hip Extension',
        style: { top: '54%', left: '41%', width: '7.5%', height: '14%' },
      },
      {
        id: 'hamstrings',
        parentId: 'glutes_hamstrings',
        name: 'Right Hamstrings (Biceps Femoris)',
        region: 'legs',
        fiber: 'Unipennate Longitudinal',
        emg: '95%',
        action: 'Knee Flexion & Hip Extension',
        style: { top: '54%', left: '51.5%', width: '7.5%', height: '14%' },
      },
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Left Calf (Gastrocnemius & Soleus)',
        region: 'legs',
        fiber: 'Multipennate Diamond',
        emg: '96%',
        action: 'Plantarflexion & Explosive Jumps',
        style: { top: '70%', left: '41.5%', width: '7%', height: '15%' },
      },
      {
        id: 'gastrocnemius',
        parentId: 'calves',
        name: 'Right Calf (Gastrocnemius & Soleus)',
        region: 'legs',
        fiber: 'Multipennate Diamond',
        emg: '96%',
        action: 'Plantarflexion & Explosive Jumps',
        style: { top: '70%', left: '51.5%', width: '7%', height: '15%' },
      },
    ],
    []
  );

  const currentHitZones = activeHemisphere === 'front' ? FRONT_HIT_ZONES : BACK_HIT_ZONES;

  // Active Selected Zone
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

    if (zone.region === 'torso') {
      setZoomFocus('torso');
      setZoomLevel(1.32);
    } else if (zone.region === 'arms') {
      setZoomFocus('arms');
      setZoomLevel(1.35);
    } else if (zone.region === 'core') {
      setZoomFocus('core');
      setZoomLevel(1.4);
    } else if (zone.region === 'legs') {
      setZoomFocus('legs');
      setZoomLevel(1.32);
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

  // Smooth camera translation & enhanced large scale
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

    const effectiveScale = (zoomLevel * 1.25).toFixed(2);
    return `scale(${effectiveScale}) translate(${translateX}, ${translateY})`;
  };

  // Calculate 3D perspective rotation style for ONLY the human body figure
  const getFigure3DRotation = () => {
    let effectiveY = 0;
    if (activeHemisphere === 'front') {
      effectiveY = normalizedAngle > 180 ? normalizedAngle - 360 : normalizedAngle;
    } else {
      effectiveY = normalizedAngle - 180;
    }
    return `perspective(1200px) rotateY(${effectiveY}deg)`;
  };

  return (
    <div className="relative w-full h-[780px] sm:h-[860px] lg:h-[920px] xl:h-[960px] rounded-3xl overflow-hidden glass-panel-glow shadow-2xl group select-none bg-[#15110e] border border-[#382e27] flex flex-col justify-between p-4 sm:p-5 transition-all duration-500">
      {/* ========================================================
          CONSTANT STATIONARY BACKGROUND (Never Rotates)
      ======================================================== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#221a15]/95 via-[#17120f]/90 to-[#0e0b09] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-amber-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyberpunk Grid Warm Line Overlay (Stationary) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ========================================================
          1. TOP DESIGNER HUD BAR: BIOMETRIC TELEMETRY & VIEW MODES
      ======================================================== */}
      <div className="relative z-30 flex items-center justify-between w-full gap-2 flex-wrap pb-2 border-b border-[#382e27]/80">
        {/* Live Scanner Telemetry Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#201915]/95 border border-[#44372f] text-xs font-mono shadow-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-[#f5f0e6] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span>3D PRO ANATOMY</span>
            <span className="text-red-500 font-extrabold">• 360° STUDIO</span>
          </span>
          <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded-md bg-red-950/60 text-red-400 border border-red-800/40 font-bold">
            {Math.round(normalizedAngle)}°
          </span>
        </div>

        {/* Visual Layer Mode Switches (Hologram / X-Ray / EMG Heatmap) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#201915]/95 border border-[#44372f] text-[11px] font-mono shadow-md">
          <button
            onClick={() => setVisualLayer('hologram')}
            title="Standard 3D Holographic Translucent Anatomy"
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              visualLayer === 'hologram'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                : 'text-[#a89b8d] hover:text-[#f5f0e6] hover:bg-[#2d231e]'
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
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'text-[#a89b8d] hover:text-[#f5f0e6] hover:bg-[#2d231e]'
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
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-[#a89b8d] hover:text-[#f5f0e6] hover:bg-[#2d231e]'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">HEATMAP</span>
          </button>
        </div>

        {/* View Controls & 360° ROTATE Mode Selector */}
        <div className="flex items-center gap-2">
          {/* Front / Back / 360° ROTATE Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#201915]/95 border border-[#44372f] text-[11px] font-mono shadow-md">
            {/* Front Button */}
            <button
              onClick={() => handleSnapAngle(0)}
              className={`px-3 py-1 rounded-lg font-bold transition-all uppercase flex items-center gap-1.5 ${
                Math.abs(normalizedAngle) < 15 || Math.abs(normalizedAngle - 360) < 15
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                  : 'text-[#a89b8d] hover:text-[#f5f0e6] hover:bg-[#2d231e]'
              }`}
            >
              <span>FRONT</span>
            </button>

            {/* 360° AUTO-SPIN BUTTON */}
            <button
              onClick={() => setIsAutoRotating((prev) => !prev)}
              title="Toggle 360° Continuous Turntable Rotation & Drag Mode"
              className={`px-3 py-1 rounded-lg font-extrabold transition-all uppercase flex items-center gap-1.5 ${
                isAutoRotating
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-[0_0_16px_rgba(220,38,38,0.6)] scale-102'
                  : 'text-[#f5f0e6] hover:bg-[#2d231e] bg-red-950/40 border border-red-800/40'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : 'text-red-400'}`} />
              <span>360° ROTATE</span>
              {isAutoRotating && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5" />
              )}
            </button>

            {/* Back Button */}
            <button
              onClick={() => handleSnapAngle(180)}
              className={`px-3 py-1 rounded-lg font-bold transition-all uppercase flex items-center gap-1.5 ${
                Math.abs(normalizedAngle - 180) < 20
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                  : 'text-[#a89b8d] hover:text-[#f5f0e6] hover:bg-[#2d231e]'
              }`}
            >
              <span>BACK (180°)</span>
            </button>
          </div>

          {/* Full Studio Expand Toggle */}
          {onToggleStudioExpand && (
            <button
              onClick={onToggleStudioExpand}
              title={isStudioExpanded ? 'Exit Fullscreen Studio' : 'Expand Pro Studio View'}
              className="p-2 rounded-xl bg-[#201915]/95 border border-[#44372f] text-[#a89b8d] hover:text-[#f5f0e6] hover:bg-[#2d231e] transition-colors shadow-md"
            >
              {isStudioExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          2. CENTRAL 3D INTERACTIVE ANATOMY VIEWPORT WITH 360° TURNTABLE
      ======================================================== */}
      <div
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        className="relative flex-1 flex items-center justify-center my-1 overflow-hidden w-full cursor-ew-resize"
        title="Click and drag horizontally to rotate 360° in 3D"
      >
        {/* Drag Interaction Guidance Tag (Stationary) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-85 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#201915]/90 border border-[#44372f] text-[10px] font-mono text-[#dcd1c3] shadow-md backdrop-blur-sm">
            <MoveHorizontal className="w-3 h-3 text-red-500 animate-pulse" />
            <span>
              DRAG HORIZONTALLY TO ROTATE 360° // ANGLE:{' '}
              <strong className="text-red-400 font-bold">{Math.round(normalizedAngle)}°</strong>
            </span>
          </div>
        </div>

        {/* Floating Right-Side Camera Zoom & Framing Toolbar (Stationary) */}
        <div className="absolute right-3 top-12 z-20 flex flex-col gap-1.5 p-1 rounded-2xl bg-[#201915]/90 border border-[#44372f] shadow-xl backdrop-blur-sm">
          <button
            onClick={handleZoomIn}
            title="Zoom In Camera"
            className="p-2 rounded-xl hover:bg-[#2d231e] text-[#dcd1c3] hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out Camera"
            className="p-2 rounded-xl hover:bg-[#2d231e] text-[#dcd1c3] hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetCamera}
            title="Reset Camera Framing"
            className="p-2 rounded-xl hover:bg-[#2d231e] text-[#dcd1c3] hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="w-full h-px bg-[#382e27] my-0.5" />

          {/* Body Region Focus Preset Buttons */}
          <button
            onClick={() => {
              setZoomFocus('center');
              setZoomLevel(1.18);
            }}
            title="Full Body View"
            className={`p-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
              zoomFocus === 'center'
                ? 'bg-red-600 text-white'
                : 'text-[#a89b8d] hover:text-white hover:bg-[#2d231e]'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => {
              setZoomFocus('torso');
              setZoomLevel(1.32);
            }}
            title="Focus Torso & Chest"
            className={`p-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
              zoomFocus === 'torso'
                ? 'bg-red-600 text-white'
                : 'text-[#a89b8d] hover:text-white hover:bg-[#2d231e]'
            }`}
          >
            TORSO
          </button>
          <button
            onClick={() => {
              setZoomFocus('arms');
              setZoomLevel(1.35);
            }}
            title="Focus Arms"
            className={`p-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
              zoomFocus === 'arms'
                ? 'bg-red-600 text-white'
                : 'text-[#a89b8d] hover:text-white hover:bg-[#2d231e]'
            }`}
          >
            ARMS
          </button>
          <button
            onClick={() => {
              setZoomFocus('core');
              setZoomLevel(1.4);
            }}
            title="Focus Core & Abs"
            className={`p-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
              zoomFocus === 'core'
                ? 'bg-red-600 text-white'
                : 'text-[#a89b8d] hover:text-white hover:bg-[#2d231e]'
            }`}
          >
            CORE
          </button>
          <button
            onClick={() => {
              setZoomFocus('legs');
              setZoomLevel(1.32);
            }}
            title="Focus Legs & Quads"
            className={`p-1.5 rounded-lg text-[9px] font-mono font-bold transition-all ${
              zoomFocus === 'legs'
                ? 'bg-red-600 text-white'
                : 'text-[#a89b8d] hover:text-white hover:bg-[#2d231e]'
            }`}
          >
            LEGS
          </button>
        </div>

        {/* Ambient Radial Spotlight Focused on Active Muscle (Stationary) */}
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
                  ? 'radial-gradient(circle, rgba(239,68,68,0.45) 0%, rgba(245,158,11,0.2) 50%, transparent 80%)'
                  : visualLayer === 'xray'
                  ? 'radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(220,38,38,0.2) 50%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(220,38,38,0.45) 0%, rgba(220,38,38,0.15) 50%, transparent 80%)',
            }}
          />
        )}

        {/* 3D Stationary Turntable Floor Platform (Concentric Neon Rings + Compass Degree Needle) */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center justify-center"
          style={{ width: '380px', height: '120px' }}
        >
          <div
            className="relative w-full h-full rounded-full border-2 border-red-500/40 shadow-[0_0_30px_rgba(220,38,38,0.25)] flex items-center justify-center"
            style={{
              transform: 'rotateX(76deg)',
              background:
                'radial-gradient(ellipse at center, rgba(220,38,38,0.18) 0%, rgba(20,15,12,0.6) 70%, transparent 100%)',
            }}
          >
            {/* Inner Concentric Rings */}
            <div className="w-[82%] h-[82%] rounded-full border border-dashed border-red-400/30 animate-spin-slow" />
            <div className="w-[55%] h-[55%] rounded-full border border-red-500/20" />
            <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_12px_#ff0033]" />

            {/* Rotating Angle Compass Pointer (Tracks angle smoothly without rotating the floor background) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
              style={{ transform: `rotate(${normalizedAngle}deg)` }}
            >
              <div className="w-full h-0.5 bg-gradient-to-r from-red-500 via-transparent to-red-500 opacity-70" />
              <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_#ff0033]" />
            </div>
          </div>
        </div>

        {/* Scaled High-Definition Anatomical Figure Wrapper with 3D Transform */}
        <div
          className="relative h-full max-h-[860px] sm:max-h-[940px] lg:max-h-[980px] aspect-square transition-transform duration-700 ease-out flex items-center justify-center z-15"
          style={{
            transform: getCameraTransform(),
          }}
        >
          {/* 3D Turntable Container that rotates ONLY the human body figure */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: getFigure3DRotation(),
            }}
          >
            {/* Exact 3D Anatomical Image (Transparent Alpha - Zero Black Background Rotation) */}
            <img
              key={`${activeHemisphere}-${visualLayer}`}
              src={activeHemisphere === 'front' ? frontImageSrc : backImageSrc}
              alt={`3D Holographic Translucent Anatomy Model (${activeHemisphere} view)`}
              className={`w-full h-full object-contain select-none pointer-events-none sharp-hologram animate-fadeIn transition-all duration-300 ${
                visualLayer === 'xray'
                  ? 'filter-xray-mode'
                  : visualLayer === 'heatmap'
                  ? 'filter-heatmap-mode'
                  : 'filter-hologram-mode'
              }`}
              style={{
                background: 'transparent',
              }}
            />

            {/* Pulsating Cardiac Heart Glow Beacon (Front view only, when angle is near front) */}
            {activeHemisphere === 'front' && Math.abs(normalizedAngle > 180 ? normalizedAngle - 360 : normalizedAngle) < 60 && (
              <div
                className="absolute z-20 pointer-events-none"
                style={{ top: '28%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-tr from-red-600 to-rose-400 shadow-[0_0_16px_#ff0033]" />
                </div>
              </div>
            )}

            {/* Interactive Clickable & Hoverable Sub-Muscle Target Zones (Rotating with the body) */}
            {currentHitZones.map((zone, idx) => {
              const isParentSelected = selectedMuscle === zone.parentId;
              const isSubSelected = selectedSubMuscle === zone.id;
              const isTargetActive = isSubSelected && isParentSelected;
              const isHovered = hoveredMuscle === zone.parentId || hoveredSubMuscle === zone.id;

              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoneClick(zone);
                  }}
                  onMouseEnter={() => handleZoneHover(zone)}
                  onMouseLeave={handleZoneLeave}
                  style={zone.style}
                  className={`absolute rounded-2xl transition-all duration-300 z-20 cursor-pointer group flex items-center justify-center ${
                    isTargetActive
                      ? 'bg-red-500/35 border-2 border-red-400 shadow-[0_0_24px_rgba(255,42,95,0.85)] scale-105'
                      : isParentSelected
                      ? 'bg-red-600/30 border border-red-500 shadow-[0_0_16px_rgba(220,38,38,0.65)]'
                      : isHovered
                      ? 'bg-red-600/25 shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                      : 'bg-transparent hover:bg-red-600/20 border border-transparent'
                  }`}
                  title={`Target ${zone.name} — Click to stream real video & biomechanics`}
                >
                  {/* Precision Target Bracket Corners & Laser on Active Target */}
                  {isTargetActive && (
                    <>
                      <div className="absolute -inset-1.5 pointer-events-none animate-bracket-pulse">
                        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500 rounded-tl-sm shadow-[0_0_8px_#dc2626]" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500 rounded-tr-sm shadow-[0_0_8px_#dc2626]" />
                        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500 rounded-bl-sm shadow-[0_0_8px_#dc2626]" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500 rounded-br-sm shadow-[0_0_8px_#dc2626]" />
                      </div>

                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_#dc2626] animate-laser-sweep" />
                      </div>

                      <div className="absolute pointer-events-none flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full border border-dashed border-red-500/50 animate-spin-slow" />
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ff0033]" />
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating High-Tech Active Muscle Target Lock Card (Stationary) */}
        {activeZone && (
          <div className="absolute left-4 bottom-4 z-20 pointer-events-auto max-w-[280px] p-3.5 rounded-2xl bg-[#201915]/95 border border-red-500/50 shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-[#382e27] pb-1">
              <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-red-500 animate-spin-slow" />
                <span>TARGET LOCK // #{activeZone.id}</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                EMG {activeZone.emg}
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-white leading-tight">
              {activeZone.name}
            </h4>
            <p className="text-[11px] text-[#dcd1c3] mt-1 leading-snug">
              {activeZone.action}
            </p>
          </div>
        )}
      </div>

      {/* ========================================================
          3. BOTTOM 360° ANGLE CONTROL DOCK & PRESET SNAPS
      ======================================================== */}
      <div className="relative z-30 pt-3 border-t border-[#382e27]/80 flex flex-col gap-2.5">
        {/* Angle Slider Dial & Quick Preset Angle Buttons */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Preset Angle Snap Buttons */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <button
              onClick={() => handleSnapAngle(0)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                Math.abs(normalizedAngle) < 15 || Math.abs(normalizedAngle - 360) < 15
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-[#201915] text-[#a89b8d] hover:text-white border border-[#44372f]'
              }`}
            >
              0° FRONT
            </button>
            <button
              onClick={() => handleSnapAngle(90)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                Math.abs(normalizedAngle - 90) < 15
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-[#201915] text-[#a89b8d] hover:text-white border border-[#44372f]'
              }`}
            >
              90° RIGHT
            </button>
            <button
              onClick={() => handleSnapAngle(180)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                Math.abs(normalizedAngle - 180) < 15
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-[#201915] text-[#a89b8d] hover:text-white border border-[#44372f]'
              }`}
            >
              180° BACK
            </button>
            <button
              onClick={() => handleSnapAngle(270)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                Math.abs(normalizedAngle - 270) < 15
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-[#201915] text-[#a89b8d] hover:text-white border border-[#44372f]'
              }`}
            >
              270° LEFT
            </button>
          </div>

          {/* Auto-Spin Speed & Reverse Controls */}
          <div className="flex items-center gap-1.5 ml-auto text-xs font-mono">
            <button
              onClick={() => setRotateSpeed((prev) => (prev > 0 ? -1.2 : 1.2))}
              title="Reverse Rotation Direction"
              className={`px-2 py-1 rounded-lg border border-[#44372f] transition-colors ${
                rotateSpeed < 0 ? 'bg-red-600 text-white' : 'bg-[#201915] text-[#a89b8d] hover:text-white'
              }`}
            >
              ↺ REVERSE
            </button>
            <button
              onClick={() => setRotateSpeed((prev) => (Math.abs(prev) === 1.2 ? (prev > 0 ? 2.4 : -2.4) : (prev > 0 ? 1.2 : -1.2)))}
              title="Toggle Rotation Speed (1x / 2x)"
              className={`px-2 py-1 rounded-lg border border-[#44372f] font-bold ${
                Math.abs(rotateSpeed) === 2.4 ? 'bg-red-600 text-white' : 'bg-[#201915] text-[#a89b8d] hover:text-white'
              }`}
            >
              {Math.abs(rotateSpeed) === 2.4 ? '2X SPEED' : '1X SPEED'}
            </button>
          </div>
        </div>

        {/* Continuous 0°–360° Turntable Angle Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#a89b8d] font-bold w-14 shrink-0 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-red-500" />
            <span>{Math.round(normalizedAngle)}°</span>
          </span>

          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={Math.round(normalizedAngle)}
            onChange={(e) => handleSnapAngle(Number(e.target.value))}
            className="w-full h-2 bg-[#2d231e] rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all"
            title="Scrub to rotate the 3D anatomical model in 360 degrees"
          />

          <span className="text-[10px] font-mono text-stone-500 shrink-0 font-bold">
            360° TURNTABLE
          </span>
        </div>
      </div>
    </div>
  );
}
