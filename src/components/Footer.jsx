import React, { useState } from 'react';
import { Flame, MapPin, Clock, Phone, Mail, Instagram, Youtube, Twitter, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#080910] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#090b10] rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-wider font-display text-white">
              3D <span className="text-cyan-400 font-bold">ANATOMY</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The next-generation 3D interactive human anatomy and biomechanical performance reference. Master your exercise form, isolate target sub-muscles, and build science-backed hypertrophy splits.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 transition-colors shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 transition-colors shadow-sm">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 transition-colors shadow-sm">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3 font-mono text-xs font-bold">
          <h4 className="text-white tracking-wider uppercase text-sm">
            EXPLORATION
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#hero-3d" className="hover:text-cyan-400 transition-colors">3D Anatomy Explorer</a></li>
            <li><a href="#programs" className="hover:text-cyan-400 transition-colors">Hypertrophy Splits</a></li>
            <li><a href="#routine" className="hover:text-cyan-400 transition-colors">Active Workout Log</a></li>
            <li><a href="#hero-3d" className="hover:text-cyan-400 transition-colors">Chest Deep Dive (MuscleWiki Reference)</a></li>
          </ul>
        </div>

        {/* Biomechanics Knowledge */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-white font-bold tracking-wider uppercase text-sm">
            ANATOMICAL TARGETS
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>• Pectoralis Major (Clavicular, Sternal, Costal)</li>
            <li>• Deltoids (Anterior, Medial, Posterior)</li>
            <li>• Biceps Brachii & Triceps Brachii</li>
            <li>• Latissimus Dorsi & Trapezius</li>
            <li>• Quadriceps & Hamstrings Chain</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h4 className="text-white font-bold tracking-wider uppercase text-sm font-mono">
            BIOMECHANICS INTEL
          </h4>
          <p className="text-xs text-slate-400">
            Get weekly science-backed form breakdowns, exercise EMG studies, and workout splits.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 flex-1 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
            >
              {subscribed ? <Check className="w-3.5 h-3.5" /> : 'JOIN'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} 3D ANATOMY & BIOMECHANICS ENGINE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Biometrics Safety</a>
        </div>
      </div>
    </footer>
  );
}
