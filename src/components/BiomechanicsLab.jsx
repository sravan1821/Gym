import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  Layers,
  ChevronRight,
  Clock,
  AlertTriangle,
} from 'lucide-react';

/**
 * Biomechanics & Anatomy Lab
 * Displays Origin, Insertion, Joint Actions, Antagonists,
 * Target Mobility Stretches, and Injury Prevention Guidelines.
 */
export default function BiomechanicsLab({
  muscleData,
  activeSubMuscle,
}) {
  const [activeTab, setActiveTab] = useState('anatomy'); // 'anatomy' | 'stretches' | 'safety'

  if (!muscleData) return null;
  const bio = muscleData.biomechanics || {};

  return (
    <div className="space-y-4">
      {/* Sub-nav Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-mono border border-gray-200">
        <button
          onClick={() => setActiveTab('anatomy')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'anatomy'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>ANATOMY & ACTIONS</span>
        </button>
        <button
          onClick={() => setActiveTab('stretches')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'stretches'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>MOBILITY & STRETCHES</span>
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'safety'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>INJURY PREVENTION</span>
        </button>
      </div>

      {/* Tab Content 1: Anatomy & Actions */}
      {activeTab === 'anatomy' && (
        <div className="space-y-3.5 animate-fadeIn">
          {/* Origin & Insertion Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs font-mono text-red-600 font-bold mb-1.5 uppercase">
                <Target className="w-3.5 h-3.5" />
                <span>ANATOMICAL ORIGIN</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                {bio.origin || 'Sternum, Clavicle, Costal Cartilages (Ribs 1-6)'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs font-mono text-red-600 font-bold mb-1.5 uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>ANATOMICAL INSERTION</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                {bio.insertion || 'Lateral lip of bicipital groove of humerus'}
              </p>
            </div>
          </div>

          {/* Innervation & Antagonists */}
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[11px] font-mono text-gray-500 uppercase font-bold w-28 shrink-0">
                INNERVATION:
              </span>
              <span className="text-xs text-gray-900 font-mono font-bold">{bio.innervation || 'C5 - T1 Nerves'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[11px] font-mono text-gray-500 uppercase font-bold w-28 shrink-0">
                ANTAGONISTS:
              </span>
              <span className="text-xs text-red-600 font-medium">
                {bio.antagonists || 'Rear Deltoids, Rhomboids, Mid Trapezius'}
              </span>
            </div>
          </div>

          {/* Primary Biomechanical Joint Actions */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <h4 className="text-xs font-mono text-gray-500 uppercase font-bold mb-2.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-600" />
              <span>PRIMARY BIOMECHANICAL JOINT ACTIONS</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(bio.jointActions || [
                'Horizontal Adduction (bringing arms across chest)',
                'Shoulder Flexion (raising arm upward)',
                'Internal Rotation of the Humerus',
              ]).map((action, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-start gap-2 text-xs text-gray-800"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Mobility & Stretches */}
      {activeTab === 'stretches' && (
        <div className="space-y-3 animate-fadeIn">
          <p className="text-xs text-gray-500 font-mono">
            Perform these mobility protocols before workouts for dynamic activation and post-workout to restore fascia length:
          </p>

          {(bio.stretches || [
            {
              name: 'Doorway 90/90 Pec Stretch',
              duration: '30 - 45s per side',
              steps: 'Forearm on doorframe at 90°, step forward gently until feeling deep stretch across pectoral wall.',
            },
            {
              name: 'Behind-the-Back Clasp & Lift',
              duration: '30s hold',
              steps: 'Clasp hands behind back, squeeze shoulder blades, gently lift arms away from lower back.',
            },
          ]).map((stretch, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-mono font-bold">
                    {idx + 1}
                  </span>
                  <span>{stretch.name}</span>
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-[11px] font-mono text-red-600 border border-red-100 font-bold">
                  <Clock className="w-3 h-3" />
                  <span>{stretch.duration}</span>
                </span>
              </div>
              <p className="text-xs text-gray-600 pl-6 leading-relaxed">{stretch.steps}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Injury Prevention */}
      {activeTab === 'safety' && (
        <div className="space-y-3.5 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center gap-2 mb-2 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>CRITICAL JOINT SAFETY & FORM RULES</span>
            </div>
            <p className="text-xs text-red-800 leading-relaxed font-mono">
              {bio.injuryTips ||
                'Retract and depress scapulae during pressing movements. Flare elbows no more than 45-60° from torso to protect the rotator cuff and prevent AC joint impingement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <span className="font-mono font-bold text-red-600 block mb-1">OPTIMAL ELBOW ANGLE</span>
              <p className="text-gray-700 leading-relaxed">
                Maintain a 45° to 60° angle relative to your ribcage (arrowhead shape) rather than a flat 90° T-bone flare.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <span className="font-mono font-bold text-red-600 block mb-1">SCAPULAR RETRACTION</span>
              <p className="text-gray-700 leading-relaxed">
                Pinch your shoulder blades "down and into your back pockets" before unracking any weight to create a solid pressing shelf.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
