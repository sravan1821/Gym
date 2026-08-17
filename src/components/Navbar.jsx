import React, { useState } from 'react';
import { Flame, Menu, X, Dumbbell, Activity, Sparkles, Box } from 'lucide-react';

export default function Navbar({ routineCount = 0, onOpenRoutine }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#080a12]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#090b10] rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider font-display text-white">
                3D <span className="text-cyan-400 font-bold">ANATOMY</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 -mt-1 font-bold">
                EXERCISE & BIOMECHANICS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider font-bold">
            <a href="#hero-3d" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              3D ANATOMY SCANNER
            </a>
            <a href="#programs" className="text-slate-400 hover:text-white transition-colors">
              TRAINING SPLITS
            </a>
            <a href="#routine" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>WORKOUT ROUTINE</span>
              {routineCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                  {routineCount}
                </span>
              )}
            </a>
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenRoutine}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:brightness-110 text-xs font-mono transition-all shadow-lg font-bold"
            >
              <Activity className="w-3.5 h-3.5 text-slate-950" />
              <span>LIVE WORKOUT LOG</span>
              {routineCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {routineCount > 0 && (
              <button
                onClick={onOpenRoutine}
                className="p-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono flex items-center gap-1 font-bold"
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>{routineCount}</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 bg-[#0c0e18]/95 px-4 pt-3 pb-6 space-y-3 font-mono text-sm font-bold">
          <a
            href="#hero-3d"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
          >
            ⚡ 3D ANATOMY SCANNER
          </a>
          <a
            href="#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-850"
          >
            TRAINING SPLITS
          </a>
          <a
            href="#routine"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-850 flex items-center justify-between"
          >
            <span>ACTIVE ROUTINE</span>
            {routineCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-xs">
                {routineCount}
              </span>
            )}
          </a>
        </div>
      )}
    </nav>
  );
}
