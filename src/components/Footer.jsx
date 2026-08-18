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
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-gray-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-wider font-display text-gray-900">
              SS <span className="text-red-600 font-bold">TRAINING</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            The next-generation 3D interactive human anatomy and biomechanical performance reference. Master your exercise form, isolate target sub-muscles, and build science-backed hypertrophy splits.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 transition-colors shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 transition-colors shadow-sm">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 transition-colors shadow-sm">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3 font-mono text-xs font-bold">
          <h4 className="text-gray-900 tracking-wider uppercase text-sm">
            EXPLORATION
          </h4>
          <ul className="space-y-2 text-gray-500">
            <li><a href="#hero-3d" className="hover:text-red-600 transition-colors">3D Anatomy Explorer</a></li>
            <li><a href="#programs" className="hover:text-red-600 transition-colors">Hypertrophy Splits</a></li>
            <li><a href="#routine" className="hover:text-red-600 transition-colors">Active Workout Log</a></li>
          </ul>
        </div>

        {/* Biomechanics Knowledge */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="text-gray-900 font-bold tracking-wider uppercase text-sm">
            ANATOMICAL TARGETS
          </h4>
          <ul className="space-y-2 text-gray-500">
            <li>• Pectoralis Major (Clavicular, Sternal, Costal)</li>
            <li>• Deltoids (Anterior, Medial, Posterior)</li>
            <li>• Biceps Brachii & Triceps Brachii</li>
            <li>• Latissimus Dorsi & Trapezius</li>
            <li>• Quadriceps & Hamstrings Chain</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h4 className="text-gray-900 font-bold tracking-wider uppercase text-sm font-mono">
            BIOMECHANICS INTEL
          </h4>
          <p className="text-xs text-gray-500">
            Get weekly science-backed form breakdowns, exercise EMG studies, and workout splits.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 flex-1 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
            >
              {subscribed ? <Check className="w-3.5 h-3.5" /> : 'JOIN'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
        <div>
          © {new Date().getFullYear()} SS TRAINING & BIOMECHANICS ENGINE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700">Terms of Service</a>
          <a href="#" className="hover:text-gray-700">Biometrics Safety</a>
        </div>
      </div>
    </footer>
  );
}
