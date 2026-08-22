import React, { useState } from 'react';
import { Flame, Menu, X, Dumbbell, Activity, Bot } from 'lucide-react';

export default function Navbar({ routineCount = 0, onOpenRoutine }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#fbf7ee]/95 backdrop-blur-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border-b border-[#e7e5e4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-600 group-hover:animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider font-display text-gray-900">
                SS <span className="text-red-600 font-bold">TRAINING</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-gray-400 -mt-1 font-bold">
                EXERCISE & BIOMECHANICS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider font-bold">
            <a href="#hero-3d" className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              3D ANATOMY SCANNER
            </a>
            <a href="#diet-processor" className="text-stone-800 hover:text-red-600 transition-colors flex items-center gap-1">
              <span>DIET & WORKOUT SPLIT</span>
            </a>
            <a href="#routine" className="text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5">
              <span>ACTIVE ROUTINE LOG</span>
              {routineCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                  {routineCount}
                </span>
              )}
            </a>
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-health-chatbot'))}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 text-xs font-mono transition-all shadow-md font-bold"
            >
              <Bot className="w-3.5 h-3.5 text-red-500" />
              <span>HEALTH AI CHAT</span>
            </button>
            <button
              onClick={onOpenRoutine}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white hover:brightness-110 text-xs font-mono transition-all shadow-lg font-bold"
            >
              <Activity className="w-3.5 h-3.5 text-white" />
              <span>LIVE WORKOUT LOG</span>
              {routineCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {routineCount > 0 && (
              <button
                onClick={onOpenRoutine}
                className="p-2 rounded-xl bg-red-600 text-white text-xs font-mono flex items-center gap-1 font-bold"
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>{routineCount}</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-3 font-mono text-sm font-bold shadow-lg">
          <a
            href="#hero-3d"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-red-600 bg-red-50"
          >
            ⚡ 3D ANATOMY SCANNER
          </a>
          <a
            href="#diet-processor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            🥗 TRAINER & DIET PROCESSOR
          </a>
          <a
            href="#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            TRAINING SPLITS
          </a>
          <a
            href="#routine"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-between"
          >
            <span>ACTIVE ROUTINE</span>
            {routineCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-xs">
                {routineCount}
              </span>
            )}
          </a>
        </div>
      )}
    </nav>
  );
}
