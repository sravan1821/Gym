import React from 'react';
import { QUICK_FILTERS } from '../data/muscleData';
import { 
  Shield, 
  Flame, 
  Zap, 
  Activity, 
  Crosshair, 
  Layers, 
  Target, 
  Sparkles, 
  Gauge 
} from 'lucide-react';

const ICON_MAP = {
  Shield,
  Flame,
  Zap,
  Activity,
  Crosshair,
  Layers,
  Target,
  Sparkles,
  Gauge
};

export default function MuscleQuickFilter({ selectedMuscle, onSelectMuscle }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
          QUICK TARGET MUSCLE SELECTOR
        </span>
        <span className="text-[11px] font-mono text-cyan-700 font-bold">9 ZONES ACTIVE</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {QUICK_FILTERS.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Activity;
          const isSelected = selectedMuscle === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectMuscle(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 whitespace-nowrap border flex-shrink-0 font-bold ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-600 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-400 hover:text-cyan-800 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-cyan-600'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
