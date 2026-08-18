import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkoutRoutineQueue from './components/WorkoutRoutineQueue';
import WorkoutPrograms from './components/WorkoutPrograms';
import Footer from './components/Footer';
import { MUSCLE_GROUPS, EXPERIENCE_LEVELS } from './data/muscleData';

export default function App() {
  const [experienceLevel, setExperienceLevel] = useState('intermediate'); // 'beginner' | 'intermediate' | 'advanced'

  const [routine, setRoutine] = useState([
    MUSCLE_GROUPS.chest.levelWorkouts.intermediate[0],
    MUSCLE_GROUPS.shoulders.levelWorkouts.intermediate[0],
    MUSCLE_GROUPS.biceps.levelWorkouts.intermediate[0],
  ]);

  const handleAddToRoutine = (exercise) => {
    if (!routine.some((item) => item.name === exercise.name)) {
      setRoutine((prev) => [...prev, exercise]);
    }
  };

  const handleRemoveExercise = (name) => {
    setRoutine((prev) => prev.filter((item) => item.name !== name));
  };

  const handleClearRoutine = () => {
    setRoutine([]);
  };

  const getMuscleWorkouts = (muscleKey, level = experienceLevel) => {
    const muscle = MUSCLE_GROUPS[muscleKey];
    if (!muscle) return [];
    const direct = muscle.levelWorkouts?.[level] || muscle.levelWorkouts?.intermediate || [];
    const subWorkouts = muscle.subMuscles?.flatMap((s) => s.levelWorkouts?.[level] || s.levelWorkouts?.intermediate || []) || [];
    return [...direct, ...subWorkouts].filter(Boolean);
  };

  const handleChangeLevel = (newLevel) => {
    setExperienceLevel(newLevel);
    const chest = getMuscleWorkouts('chest', newLevel);
    const shoulders = getMuscleWorkouts('shoulders', newLevel);
    const biceps = getMuscleWorkouts('biceps', newLevel);
    setRoutine([chest[0], shoulders[0], biceps[0]].filter(Boolean));
  };

  const handleLoadPresetSplit = (type) => {
    if (type === 'push') {
      const chest = getMuscleWorkouts('chest');
      const shoulders = getMuscleWorkouts('shoulders');
      const triceps = getMuscleWorkouts('triceps');
      setRoutine([
        chest[0] || MUSCLE_GROUPS.chest.levelWorkouts.intermediate[0],
        chest[1] || chest[0],
        shoulders[0] || MUSCLE_GROUPS.shoulders.levelWorkouts.intermediate[0],
        triceps[0] || MUSCLE_GROUPS.triceps.levelWorkouts.intermediate[0],
      ].filter(Boolean));
    } else if (type === 'pull') {
      const back = getMuscleWorkouts('back');
      const biceps = getMuscleWorkouts('biceps');
      setRoutine([
        back[0] || MUSCLE_GROUPS.back.levelWorkouts.intermediate[0],
        back[1] || back[0],
        biceps[0] || MUSCLE_GROUPS.biceps.levelWorkouts.intermediate[0],
        biceps[1] || biceps[0],
      ].filter(Boolean));
    } else if (type === 'legs') {
      const quads = getMuscleWorkouts('quads');
      const glutes = getMuscleWorkouts('glutes_hamstrings');
      const calves = getMuscleWorkouts('calves');
      setRoutine([
        quads[0] || MUSCLE_GROUPS.quads.levelWorkouts.intermediate[0],
        glutes[0] || MUSCLE_GROUPS.glutes_hamstrings.levelWorkouts.intermediate[0],
        calves[0] || MUSCLE_GROUPS.calves.levelWorkouts.intermediate[0],
      ].filter(Boolean));
    }
  };

  const handleSelectSplit = (splitId) => {
    if (splitId.includes('fullbody') || splitId.includes('push') || splitId.includes('ppl')) {
      handleLoadPresetSplit('push');
    } else if (splitId.includes('upper') || splitId.includes('pull') || splitId.includes('arnold')) {
      handleLoadPresetSplit('pull');
    } else {
      handleLoadPresetSplit('legs');
    }
    const heroEl = document.getElementById('hero-3d');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRoutine = () => {
    const el = document.getElementById('routine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        routineCount={routine.length}
        onOpenRoutine={handleScrollToRoutine}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Interactive Holographic Anatomy Scanner + Video Demos */}
        <Hero
          onAddToRoutine={handleAddToRoutine}
          addedExercises={routine}
          experienceLevel={experienceLevel}
          onChangeExperienceLevel={handleChangeLevel}
        />

        {/* Live Routine Tracker & Set Log */}
        <WorkoutRoutineQueue
          routine={routine}
          onRemoveExercise={handleRemoveExercise}
          onClearRoutine={handleClearRoutine}
          onLoadPresetSplit={handleLoadPresetSplit}
          experienceLevel={experienceLevel}
        />

        {/* Hypertrophy Splits & Scientific Training Plans */}
        <WorkoutPrograms
          onSelectSplit={handleSelectSplit}
          experienceLevel={experienceLevel}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
