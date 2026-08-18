import React from 'react';
import { RotateCw, RefreshCw, Layers, Compass, MapPin, Sparkles } from 'lucide-react';

export default function ControlsOverlay({
  autoRotate,
  onToggleAutoRotate,
  isWireframe,
  onToggleWireframe,
  showPins = true,
  onTogglePins,
  onSetCameraView,
  onResetView,
  activeView,
}) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3.5 sm:p-4 z-10 select-none">
      {/* Top Bar Status & Perspective Controls */}
      <div className="flex items-center justify-between w-full gap-2 flex-wrap">
        {/* Live HUD Scanner Badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-[#080912]/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
          </span>
          <span className="text-slate-300 font-semibold">
            3D ANATOMY <span className="text-red-400 font-bold">SCANNER</span>
          </span>
        </div>

        {/* View Perspective Quick Switches */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-[#080912]/85 backdrop-blur-md border border-slate-700/80 shadow-lg text-[11px] font-mono">
          {['front', 'back', 'upper', 'lower'].map((view) => (
            <button
              key={view}
              onClick={() => onSetCameraView(view)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all uppercase ${
                activeView === view
                  ? 'bg-red-500 text-slate-950 shadow-[0_0_10px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="flex items-center justify-between w-full gap-2">
        {/* Interaction Hint */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-[#080912]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 shadow-md">
          <Compass className="w-3.5 h-3.5 text-red-400 animate-spin-slow" />
          <span>DRAG 360° TO ROTATE • SCROLL TO ZOOM • CLICK TO TARGET</span>
        </div>

        {/* Feature Toggles */}
        <div className="pointer-events-auto flex items-center gap-1.5 ml-auto">
          {/* Wireframe / X-ray Mode */}
          <button
            onClick={onToggleWireframe}
            title="Toggle Wireframe / X-Ray Mode"
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isWireframe
                ? 'bg-red-500/30 border-red-400 text-red-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                : 'bg-[#080912]/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* 3D Pins Toggle */}
          {onTogglePins && (
            <button
              onClick={onTogglePins}
              title="Toggle 3D Muscle Pins"
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                showPins
                  ? 'bg-red-500/30 border-red-400 text-red-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'bg-[#080912]/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </button>
          )}

          {/* Auto Rotate Toggle */}
          <button
            onClick={onToggleAutoRotate}
            title={autoRotate ? 'Pause Auto-Rotation' : 'Enable Auto-Rotation'}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              autoRotate
                ? 'bg-red-500/30 border-red-400 text-red-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                : 'bg-[#080912]/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow text-red-400' : ''}`} />
          </button>

          {/* Reset Camera */}
          <button
            onClick={onResetView}
            title="Reset Camera Position"
            className="p-2 rounded-xl bg-[#080912]/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
