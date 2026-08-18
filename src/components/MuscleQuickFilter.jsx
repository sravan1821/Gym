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
        <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          QUICK TARGET MUSCLE SELECTOR
        </span>
        <span className="text-[11px] font-mono text-red-600 font-bold">9 ZONES ACTIVE</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {QUICK_FILTERS.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Activity;
          const isSelected = selectedMuscle === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectMuscle(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 whitespace-nowrap border flex-shrink-0 font-bold ${
                isSelected
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white border-red-600 shadow-md shadow-red-600/20 scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 shadow-xs'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-red-600'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
