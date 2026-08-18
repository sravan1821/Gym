import React, { useState } from 'react';
import HolographicBodyScanner from './Canvas3D/HolographicBodyScanner';
import MuscleInfoCard from './MuscleInfoCard';
import { MUSCLE_GROUPS, EXPERIENCE_LEVELS, QUICK_FILTERS } from '../data/muscleData';
import {
  Sparkles,
  Zap,
  Flame,
  MousePointerClick,
  Users,
  ChevronRight,
} from 'lucide-react';

const LEVEL_ICONS = {
  beginner: Sparkles,
  intermediate: Zap,
  advanced: Flame,
};

const LEVEL_COLORS = {
  beginner: {
    bg: 'from-red-500 to-red-400',
    shadow: 'shadow-[0_4px_16px_rgba(220,38,38,0.25)]',
    dot: 'bg-red-400',
    border: 'border-red-500/30',
    text: 'text-red-500',
  },
  intermediate: {
    bg: 'from-red-600 to-red-500',
    shadow: 'shadow-[0_4px_16px_rgba(220,38,38,0.3)]',
    dot: 'bg-red-500',
    border: 'border-red-600/30',
    text: 'text-red-600',
  },
  advanced: {
    bg: 'from-red-700 to-red-600',
    shadow: 'shadow-[0_4px_16px_rgba(185,28,28,0.3)]',
    dot: 'bg-red-700',
    border: 'border-red-700/30',
    text: 'text-red-700',
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
  const [isStudioExpanded, setIsStudioExpanded] = useState(false);

  const handleSelectMuscle = (muscleId) => {
    setSelectedMuscle(muscleId);
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
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-mono mb-4 font-bold tracking-wider border border-red-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span>4K MEDICAL 3D BIOMECHANICS & NEURAL EMG LAB</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-gray-900 uppercase leading-[0.92] mb-4">
          HOLOGRAPHIC <span className="text-gradient-cyan drop-shadow-none">ANATOMY SCANNER</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Isolate target muscle heads on the 3D hologram to stream real 4K HD exercise demonstrations, biomechanical activation profiles, and tempo metronome cues.
        </p>
      </div>

      {/* Experience Level Selector */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="text-center mb-2.5">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2 font-bold">
            <Users className="w-3.5 h-3.5 text-red-500" />
            SELECT TARGET EXPERIENCE LEVEL
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100">
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
                    ? `bg-gradient-to-r ${colors.bg} text-white font-extrabold ${colors.shadow} scale-[1.02]`
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono uppercase tracking-wider">{lvl.name}</span>
                </div>
                <span className={`text-[10px] block opacity-90 ${isSelected ? 'text-white/90 font-bold' : 'text-gray-400'}`}>
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
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all font-bold flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_16px_rgba(220,38,38,0.25)] scale-105'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                <span>{q.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instruction hint */}
      <div className="flex items-center justify-center max-w-7xl mx-auto mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <MousePointerClick className="w-4 h-4 text-red-500 animate-bounce" />
          <span>Click any body part or sub-muscle to stream real workout demonstration videos</span>
        </div>
      </div>

      {/* Main Dual Grid: Holographic Scanner + Real Workout Video Card */}
      <div className={`grid grid-cols-1 ${isStudioExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start transition-all duration-500`}>
        {/* Left / Full Col: Holographic Bio-Scanner */}
        <div className={isStudioExpanded ? 'lg:col-span-1' : 'lg:col-span-7'}>
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
