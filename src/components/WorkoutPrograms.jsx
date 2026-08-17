import React, { useState } from 'react';
import { Trophy, Calendar, Zap, Flame, Sparkles, ChevronRight, CheckCircle2, Dumbbell } from 'lucide-react';

const LEVEL_PROGRAMS = {
  beginner: [
    {
      id: 'full_body_foundation',
      title: '3-Day Full Body Foundation',
      focus: 'Safety, Muscle Balance & Movement Fundamentals',
      tag: 'BEGINNER • 3 DAYS/WEEK',
      duration: '45-60 min / session',
      description: 'Ideal for newcomers to build balanced motor patterns, tendon strength, and mind-muscle connection with zero burnout.',
      targetMuscles: ['Chest', 'Back & Lats', 'Quads', 'Glutes & Hams', 'Core'],
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    },
    {
      id: 'machine_hypertrophy_starter',
      title: 'Machine-Guided Hypertrophy Starter',
      focus: 'Joint-Friendly Hypertrophy & Safe Overload',
      tag: 'BEGINNER • 3 DAYS/WEEK',
      duration: '40-50 min / session',
      description: 'Uses guided machines and cable paths to protect joints while teaching proper muscle contraction mechanics.',
      targetMuscles: ['Chest Press', 'Lat Pulldown', 'Leg Extension', 'Seated Row', 'Calves'],
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    },
  ],
  intermediate: [
    {
      id: 'upper_lower_split',
      title: '4-Day Upper / Lower Overload',
      focus: 'Progressive Overload & Optimal Recovery',
      tag: 'INTERMEDIATE • 4 DAYS/WEEK',
      duration: '60 min / session',
      description: 'The golden standard split for natural muscle growth, allowing each muscle group to be stimulated twice every 7 days.',
      targetMuscles: ['Chest', 'Back & Lats', 'Shoulders', 'Quads', 'Hamstrings', 'Arms'],
      accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
    {
      id: 'ppl_classic',
      title: 'Push / Pull / Legs (PPL Classic)',
      focus: 'Muscle Hypertrophy & Density',
      tag: 'INTERMEDIATE • 5-6 DAYS/WEEK',
      duration: '65 min / session',
      description: 'Organizes exercises by synergistic movement patterns to maximize training volume and target fatigue.',
      targetMuscles: ['Chest / Delts / Triceps', 'Back / Biceps', 'Quads / Hamstrings / Calves'],
      accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
  ],
  advanced: [
    {
      id: 'ppl_arnold_hybrid',
      title: 'PPL + Arnold Hybrid Split',
      focus: 'Maximum Volume & Upper Body Specialization',
      tag: 'HIGH / ADVANCED • 6 DAYS/WEEK',
      duration: '75 min / session',
      description: 'Combines compound Push/Pull/Legs days with specialized antagonist superset arm and chest/back hypertrophy days.',
      targetMuscles: ['Chest & Back', 'Shoulders & Arms', 'Heavy Lower Body', 'Full Posterior Chain'],
      accent: 'border-red-500/40 text-red-400 bg-red-500/10',
    },
    {
      id: 'heavy_powerbuilding',
      title: 'Heavy Powerbuilding Split',
      focus: 'Max Mechanical Tension & Peak Strength',
      tag: 'HIGH / ADVANCED • 5 DAYS/WEEK',
      duration: '75-90 min / session',
      description: 'Wave loading compound lifts (Squat, Bench, Deadlift, OHP) paired with high-volume isolation drop sets.',
      targetMuscles: ['Max Bench (Pecs)', 'Max Squat (Quads)', 'Max Deadlift (Back/Hams)', 'Shoulder Power'],
      accent: 'border-red-500/40 text-red-400 bg-red-500/10',
    },
  ],
};

export default function WorkoutPrograms({ onSelectSplit, experienceLevel = 'intermediate' }) {
  const [activeTabLevel, setActiveTabLevel] = useState(experienceLevel);
  const currentPrograms = LEVEL_PROGRAMS[activeTabLevel] || LEVEL_PROGRAMS.intermediate;

  return (
    <section id="programs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 font-bold shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-cyan-400" />
          <span>SCIENTIFIC TRAINING SPLITS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
          STRUCTURED <span className="text-gradient-red">WORKOUT PLANS</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-2">
          Pick your preferred hypertrophy split and load all target exercises instantly.
        </p>

        {/* Level Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveTabLevel('beginner')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
              activeTabLevel === 'beginner'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>BEGINNER</span>
          </button>
          <button
            onClick={() => setActiveTabLevel('intermediate')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
              activeTabLevel === 'intermediate'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>INTERMEDIATE</span>
          </button>
          <button
            onClick={() => setActiveTabLevel('advanced')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
              activeTabLevel === 'advanced'
                ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>ADVANCED</span>
          </button>
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPrograms.map((prog) => (
          <div
            key={prog.id}
            className="p-6 rounded-3xl bg-[#0c0e18]/90 border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase ${prog.accent}`}>
                  {prog.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">{prog.duration}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {prog.title}
              </h3>

              <p className="text-xs font-mono text-cyan-400/90 font-semibold">{prog.focus}</p>

              <p className="text-xs text-slate-400 leading-relaxed">{prog.description}</p>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block mb-2">
                  TARGET MUSCLE EMPHASIS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prog.targetMuscles.map((tm, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 border border-slate-800"
                    >
                      {tm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectSplit(prog.id)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-mono text-xs font-bold hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>LOAD THIS SPLIT INTO SCANNER</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
