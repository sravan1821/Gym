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

  const handleChangeLevel = (newLevel) => {
    setExperienceLevel(newLevel);
    if (MUSCLE_GROUPS.chest.levelWorkouts[newLevel]) {
      setRoutine([
        MUSCLE_GROUPS.chest.levelWorkouts[newLevel][0],
        MUSCLE_GROUPS.shoulders.levelWorkouts[newLevel][0],
        MUSCLE_GROUPS.biceps.levelWorkouts[newLevel][0],
      ]);
    }
  };

  const handleLoadPresetSplit = (type) => {
    const workouts = (muscle) => MUSCLE_GROUPS[muscle]?.levelWorkouts[experienceLevel] || [];

    if (type === 'push') {
      setRoutine([
        workouts('chest')[0] || MUSCLE_GROUPS.chest.levelWorkouts.intermediate[0],
        workouts('chest')[1] || MUSCLE_GROUPS.chest.levelWorkouts.intermediate[1],
        workouts('shoulders')[0] || MUSCLE_GROUPS.shoulders.levelWorkouts.intermediate[0],
        workouts('triceps')[0] || MUSCLE_GROUPS.triceps.levelWorkouts.intermediate[0],
      ]);
    } else if (type === 'pull') {
      setRoutine([
        workouts('back')[0] || MUSCLE_GROUPS.back.levelWorkouts.intermediate[0],
        workouts('back')[1] || MUSCLE_GROUPS.back.levelWorkouts.intermediate[1],
        workouts('biceps')[0] || MUSCLE_GROUPS.biceps.levelWorkouts.intermediate[0],
      ]);
    } else if (type === 'legs') {
      setRoutine([
        workouts('quads')[0] || MUSCLE_GROUPS.quads.levelWorkouts.intermediate[0],
        workouts('glutes_hamstrings')[0] || MUSCLE_GROUPS.glutes_hamstrings.levelWorkouts.intermediate[0],
        workouts('calves')[0] || MUSCLE_GROUPS.calves.levelWorkouts.intermediate[0],
      ]);
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
