import React, { useState } from 'react';
import HolographicBodyScanner from './Canvas3D/HolographicBodyScanner';
import BodyCanvas from './Canvas3D/BodyCanvas';
import AnatomyDiagramMap from './Canvas3D/AnatomyDiagramMap';
import MuscleInfoCard from './MuscleInfoCard';
import { MUSCLE_GROUPS, EXPERIENCE_LEVELS, QUICK_FILTERS } from '../data/muscleData';
import {
  Sparkles,
  Zap,
  Flame,
  MousePointerClick,
  Users,
  ChevronRight,
  Layers,
  Box,
  Compass,
  Film,
  Scan,
} from 'lucide-react';

const LEVEL_ICONS = {
  beginner: Sparkles,
  intermediate: Zap,
  advanced: Flame,
};

const LEVEL_COLORS = {
  beginner: {
    bg: 'from-emerald-500 to-green-600',
    shadow: 'shadow-[0_4px_16px_rgba(16,185,129,0.3)]',
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
  },
  intermediate: {
    bg: 'from-amber-500 to-amber-600',
    shadow: 'shadow-[0_4px_16px_rgba(245,158,11,0.3)]',
    dot: 'bg-amber-400',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
  },
  advanced: {
    bg: 'from-red-500 to-red-600',
    shadow: 'shadow-[0_4px_16px_rgba(239,68,68,0.3)]',
    dot: 'bg-red-400',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
};

export default function Hero({
  onAddToRoutine,
  addedExercises = [],
  experienceLevel = 'intermediate',
  onChangeExperienceLevel,
}) {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedSubMuscle, setSelectedSubMuscle] = useState(null);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [hoveredSubMuscle, setHoveredSubMuscle] = useState(null);
  const [viewMode, setViewMode] = useState('hologram'); // 'hologram' | '3d' | '2d'
  const [zoomedMuscle, setZoomedMuscle] = useState(null);
  const [isStudioExpanded, setIsStudioExpanded] = useState(false);

  const handleSelectMuscle = (muscleId) => {
    setSelectedMuscle(muscleId);
    setZoomedMuscle(muscleId);
    const muscle = MUSCLE_GROUPS[muscleId];
    if (muscle?.subMuscles?.length > 0) {
      setSelectedSubMuscle(muscle.subMuscles[0].id);
    } else {
      setSelectedSubMuscle(null);
    }
  };

  const handleSelectSubMuscle = (subId) => {
    setSelectedSubMuscle(subId);
  };

  return (
    <section id="hero-3d" className="relative pt-24 lg:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 shadow-lg backdrop-blur-md font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>3D HOLOGRAPHIC ANATOMY & REAL WORKOUT VIDEOS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-[0.95] mb-3">
          HOLOGRAPHIC <span className="text-gradient-cyan drop-shadow-lg">ANATOMY SCANNER</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Tap any muscle or sub-muscle to isolate target muscle heads and instantly stream real HD exercise workout videos and biomechanics form cues.
        </p>
      </div>

      {/* Experience Level Selector */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="text-center mb-2.5">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 font-semibold">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            SELECT YOUR EXPERIENCE LEVEL
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#0d0f1a]/80 border border-slate-800 shadow-xl backdrop-blur-md">
          {Object.values(EXPERIENCE_LEVELS).map((lvl) => {
            const isSelected = experienceLevel === lvl.id;
            const colors = LEVEL_COLORS[lvl.id];
            const Icon = LEVEL_ICONS[lvl.id];

            return (
              <button
                key={lvl.id}
                onClick={() => onChangeExperienceLevel(lvl.id)}
                className={`relative py-3 px-2 rounded-xl text-center transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${colors.bg} text-slate-950 font-bold ${colors.shadow} scale-[1.02]`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono uppercase tracking-wider">{lvl.name}</span>
                </div>
                <span className={`text-[10px] block opacity-80 ${isSelected ? 'text-slate-950 font-semibold' : 'text-slate-500'}`}>
                  {lvl.recommendedSets}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Muscle Pills Row */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
          {QUICK_FILTERS.map((q) => {
            const isSelected = selectedMuscle === q.id;
            return (
              <button
                key={q.id}
                onClick={() => handleSelectMuscle(q.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all font-bold flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{q.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switcher Toolbar */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-4 px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <MousePointerClick className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Click any body part or sub-muscle to stream real workout demonstration videos</span>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('hologram')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'hologram'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>HOLOGRAPHIC SCANNER</span>
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewMode === '3d'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D ORBIT VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewMode === '2d'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2D VECTOR MAP</span>
          </button>
        </div>
      </div>

      {/* Main Dual Grid: Holographic Scanner + Real Workout Video Card */}
      <div className={`grid grid-cols-1 ${isStudioExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start transition-all duration-500`}>
        {/* Left / Full Col: Holographic Bio-Scanner / 3D Canvas */}
        <div className={isStudioExpanded ? 'lg:col-span-1' : 'lg:col-span-7'}>
          {viewMode === 'hologram' ? (
            <HolographicBodyScanner
              selectedMuscle={selectedMuscle}
              selectedSubMuscle={selectedSubMuscle}
              hoveredMuscle={hoveredMuscle}
              hoveredSubMuscle={hoveredSubMuscle}
              onSelectMuscle={handleSelectMuscle}
              onSelectSubMuscle={handleSelectSubMuscle}
              onHoverMuscle={setHoveredMuscle}
              onHoverSubMuscle={setHoveredSubMuscle}
              isStudioExpanded={isStudioExpanded}
              onToggleStudioExpand={() => setIsStudioExpanded((prev) => !prev)}
            />
          ) : viewMode === '3d' ? (
            <BodyCanvas
              selectedMuscle={selectedMuscle}
              selectedSubMuscle={selectedSubMuscle}
              hoveredMuscle={hoveredMuscle}
              hoveredSubMuscle={hoveredSubMuscle}
              onSelectMuscle={handleSelectMuscle}
              onSelectSubMuscle={handleSelectSubMuscle}
              onHoverMuscle={setHoveredMuscle}
              onHoverSubMuscle={setHoveredSubMuscle}
              showPins={true}
            />
          ) : (
            <AnatomyDiagramMap
              selectedMuscle={selectedMuscle}
              hoveredMuscle={hoveredMuscle}
              onSelectMuscle={handleSelectMuscle}
              onHoverMuscle={setHoveredMuscle}
              zoomedMuscle={zoomedMuscle}
              onZoomIntoMuscle={handleSelectMuscle}
              onZoomOut={() => setZoomedMuscle(null)}
              selectedSubMuscle={selectedSubMuscle}
              onSelectSubMuscle={handleSelectSubMuscle}
              experienceLevel={experienceLevel}
            />
          )}
        </div>

        {/* Right Col: Real Workout Video Player, Exercises & Biomechanics */}
        <div className={isStudioExpanded ? 'lg:col-span-1 mt-2' : 'lg:col-span-5'}>
          <MuscleInfoCard
            selectedMuscleId={selectedMuscle}
            selectedSubMuscleId={selectedSubMuscle}
            onSelectMuscle={handleSelectMuscle}
            onSelectSubMuscle={handleSelectSubMuscle}
            onAddToRoutine={onAddToRoutine}
            addedExercises={addedExercises}
            experienceLevel={experienceLevel}
            onChangeExperienceLevel={onChangeExperienceLevel}
          />
        </div>
      </div>
    </section>
  );
}
