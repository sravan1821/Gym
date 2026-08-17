import React, { useState, useMemo } from 'react';
import {
  MUSCLE_GROUPS,
  EXPERIENCE_LEVELS,
  EQUIPMENT_TYPES,
} from '../data/muscleData';
import {
  CheckCircle2,
  Plus,
  Timer,
  Zap,
  X,
  TrendingUp,
  Sparkles,
  Flame,
  Target,
  Layers,
  ChevronRight,
  Info,
  Dumbbell,
  Activity,
  Filter,
  Eye,
  Check,
  Video,
  Play,
  Film,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BiomechanicsLab from './BiomechanicsLab';
import ExerciseDetailModal from './ExerciseDetailModal';
import RealWorkoutVideoPlayer from './RealWorkoutVideoPlayer';

// Clean Badges
const LEVEL_BADGE = {
  beginner: { color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400', label: 'BEGINNER' },
  intermediate: { color: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400', label: 'INTERMEDIATE' },
  advanced: { color: 'bg-red-500/15 text-red-400 border-red-500/30', dot: 'bg-red-400', label: 'ADVANCED' },
};

export default function MuscleInfoCard({
  selectedMuscleId = null,
  selectedSubMuscleId = null,
  onSelectMuscle,
  onSelectSubMuscle,
  onClose,
  onAddToRoutine,
  addedExercises = [],
  experienceLevel = 'intermediate',
  onChangeExperienceLevel,
}) {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'exercises' | 'biomechanics'
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [activeModalExercise, setActiveModalExercise] = useState(null);
  const [notification, setNotification] = useState('');

  const muscle = selectedMuscleId ? (MUSCLE_GROUPS[selectedMuscleId] || MUSCLE_GROUPS.chest) : null;
  const subMuscles = muscle?.subMuscles || [];

  // Active sub-muscle object
  const activeSubMuscle =
    subMuscles.find((s) => s.id === selectedSubMuscleId) || subMuscles[0] || null;

  // Retrieve raw exercise list for experience level
  const rawExerciseList = useMemo(() => {
    if (!muscle) return [];
    if (activeSubMuscle?.levelWorkouts?.[experienceLevel]) {
      return activeSubMuscle.levelWorkouts[experienceLevel];
    }
    if (muscle.levelWorkouts?.[experienceLevel]) {
      return muscle.levelWorkouts[experienceLevel];
    }
    return muscle.levelWorkouts?.intermediate || [];
  }, [activeSubMuscle, muscle, experienceLevel]);

  // Filter by equipment
  const filteredExercises = useMemo(() => {
    if (selectedEquipment === 'all') return rawExerciseList;
    return rawExerciseList.filter(
      (ex) => (ex.equipment || 'dumbbell').toLowerCase() === selectedEquipment.toLowerCase()
    );
  }, [rawExerciseList, selectedEquipment]);

  const levelBadge = LEVEL_BADGE[experienceLevel] || LEVEL_BADGE.intermediate;

  const handleAdd = (exercise) => {
    onAddToRoutine({
      ...exercise,
      muscleName: activeSubMuscle ? `${muscle.name} (${activeSubMuscle.name})` : (muscle?.name || 'Workout'),
    });
    setNotification(`✓ Added "${exercise.name}" to your routine!`);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#ff2a5f', '#10b981', '#f59e0b'],
    });

    setTimeout(() => setNotification(''), 2500);
  };

  const handleSubMuscleClick = (subId) => {
    if (onSelectSubMuscle) onSelectSubMuscle(subId);
    setActiveTab('video'); // Instantly switch to the real workout video on sub-muscle click!
  };

  // Standby View when No Muscle is Selected Yet
  if (!selectedMuscleId || !muscle) {
    return (
      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-500 flex flex-col justify-between h-[720px] sm:h-[800px] lg:h-[860px] xl:h-[900px] bg-[#0c0e18]/95 text-slate-200">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase border font-bold ${levelBadge.color} flex items-center gap-1.5`}>
                <span className={`w-1.5 h-1.5 rounded-full ${levelBadge.dot}`} />
                {levelBadge.label}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>3D BIOMECHANICS LAB</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">
              STANDBY • READY
            </span>
          </div>
        </div>

        {/* Central Standby Hero Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-2 py-4">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_24px_rgba(0,242,254,0.2)]">
              <Target className="w-8 h-8 text-cyan-400 animate-pulse-slow" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 font-display">
            SELECT A MUSCLE TO EXPLORE
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
            Click on any muscle on the 3D anatomical body or choose a target group below to isolate muscle heads, inspect fiber angles, and stream real HD workout demonstration videos.
          </p>

          {/* Quick Muscle Selector Grid */}
          <div className="w-full max-w-md space-y-2 text-left mb-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block text-center">
              OR DIRECTLY CHOOSE A MUSCLE GROUP:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(MUSCLE_GROUPS).map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSelectMuscle && onSelectMuscle(m.id)}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-white transition-all text-left group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                      {m.simpleName || m.name}
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-400 mt-1">
                    {m.subMuscles?.length || 1} Heads
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="border-t border-slate-800 pt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Film className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-1" />
            <span>HD Real Videos</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Activity className="w-3.5 h-3.5 text-red-400 mx-auto mb-1" />
            <span>EMG Activation</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Dumbbell className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
            <span>Hypertrophy Cues</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-500 flex flex-col h-[720px] sm:h-[800px] lg:h-[860px] xl:h-[900px] bg-[#0c0e18]/95 text-slate-200">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="border-b border-slate-800 pb-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase border font-bold ${levelBadge.color} flex items-center gap-1.5`}>
                <span className={`w-1.5 h-1.5 rounded-full ${levelBadge.dot}`} />
                {levelBadge.label}
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-bold">
                {muscle.burnRate}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">
                {muscle.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 flex-wrap">
              <span>{muscle.simpleName || muscle.name}</span>
              {activeSubMuscle && (
                <>
                  <ChevronRight className="w-4 h-4 text-cyan-400 inline" />
                  <span className="text-cyan-400">{activeSubMuscle.name}</span>
                </>
              )}
            </h2>

            {activeSubMuscle?.scientificName && (
              <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                Anatomy: <em className="text-slate-200 not-italic font-bold">{activeSubMuscle.scientificName}</em>
              </span>
            )}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sub-Muscle Head Selector Pills */}
        {subMuscles.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold uppercase">
              <span className="flex items-center gap-1 text-cyan-400">
                <Target className="w-3 h-3" />
                <span>SELECT SUB-MUSCLE (PLAYS VIDEO)</span>
              </span>
              <span className="text-slate-400">{subMuscles.length} HEADS</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {subMuscles.map((sub) => {
                const isSelected = (activeSubMuscle?.id || subMuscles[0].id) === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubMuscleClick(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-bold flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md scale-102 font-extrabold'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Play className={`w-2.5 h-2.5 ${isSelected ? 'fill-slate-950' : 'fill-cyan-400 text-cyan-400'}`} />
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Switcher: Real Video Demo vs All Exercises vs Biomechanics */}
        <div className="flex items-center gap-1.5 mt-3.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'video'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>REAL VIDEO</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'exercises'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>ALL EXERCISES ({filteredExercises.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('biomechanics')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'biomechanics'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>BIOMECHANICS</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto pt-3 space-y-4 pr-1">
        {/* TAB 1: REAL WORKOUT VIDEO DEMONSTRATION PLAYER */}
        {activeTab === 'video' && (
          <RealWorkoutVideoPlayer
            subMuscle={activeSubMuscle}
            parentMuscle={muscle}
            experienceLevel={experienceLevel}
            onAddToRoutine={handleAdd}
            addedExercises={addedExercises}
            onOpenFullModal={(ex) => setActiveModalExercise(ex)}
          />
        )}

        {/* TAB 2: EXERCISES DIRECTORY WITH EQUIPMENT FILTERS */}
        {activeTab === 'exercises' && (
          <>
            {/* Equipment Filter Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 font-bold uppercase">
                <Filter className="w-3 h-3 text-cyan-400" />
                <span>FILTER BY EQUIPMENT</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {EQUIPMENT_TYPES.map((eq) => {
                  const isSelected = selectedEquipment === eq.id;
                  return (
                    <button
                      key={eq.id}
                      onClick={() => setSelectedEquipment(eq.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-slate-200 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span>{eq.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notification Banner */}
            {notification && (
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold animate-fadeIn flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {/* Exercise Cards List */}
            <div className="space-y-3">
              {filteredExercises.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 space-y-2">
                  <Dumbbell className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
                  <p className="text-xs font-mono">
                    No exercises found for equipment "{selectedEquipment}".
                  </p>
                  <button
                    onClick={() => setSelectedEquipment('all')}
                    className="px-3 py-1 text-xs font-mono bg-cyan-500 text-slate-950 font-bold rounded-lg"
                  >
                    Show All Equipment
                  </button>
                </div>
              ) : (
                filteredExercises.map((exercise, idx) => {
                  const isAdded = addedExercises.some((e) => e.name === exercise.name);
                  const activation = exercise.activation || { primary: 90 };

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3 group"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-cyan-400 border border-slate-700 uppercase">
                              {exercise.equipment || 'Dumbbell'}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              Target: <strong className="text-slate-200">{exercise.target}</strong>
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {exercise.name}
                          </h3>
                        </div>

                        {/* Activation Pill */}
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono text-slate-500 block">ACTIVATION</span>
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {activation.primary}%
                          </span>
                        </div>
                      </div>

                      {/* Reps & Sets Guide */}
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                        <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                          <span className="text-slate-400 block text-[9px]">SETS</span>
                          <span className="font-bold text-slate-200">{exercise.sets}</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                          <span className="text-slate-400 block text-[9px]">REPS</span>
                          <span className="font-bold text-cyan-400">{exercise.reps}</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                          <span className="text-slate-400 block text-[9px]">REST</span>
                          <span className="font-bold text-amber-400">{exercise.rest}</span>
                        </div>
                      </div>

                      {/* Quick Cue */}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {exercise.simpleGuide}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setActiveModalExercise(exercise)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>FULL FORM & TIMER</span>
                        </button>

                        <button
                          onClick={() => handleAdd(exercise)}
                          className={`py-2 px-3.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isAdded
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-cyan-500 text-slate-950 hover:brightness-110 shadow-md'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'ADDED' : 'ADD'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* TAB 3: BIOMECHANICS LAB */}
        {activeTab === 'biomechanics' && (
          <BiomechanicsLab muscleData={muscle} activeSubMuscle={activeSubMuscle} />
        )}
      </div>

      {/* Exercise Detail & Form Trainer Modal */}
      {activeModalExercise && (
        <ExerciseDetailModal
          exercise={activeModalExercise}
          muscleName={muscle.name}
          onClose={() => setActiveModalExercise(null)}
          onAddToRoutine={handleAdd}
          isAdded={addedExercises.some((e) => e.name === activeModalExercise.name)}
        />
      )}
    </div>
  );
}
