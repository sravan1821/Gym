import React from 'react';
import { Check, Flame, Shield, Sparkles, Zap, ChevronRight } from 'lucide-react';

const TIERS = [
  {
    name: 'STANDARD ACCESS',
    price: '$49',
    billing: '/month',
    desc: 'Full floor access to standard heavy weight zones and cardio biomechanics suites.',
    features: [
      'Full Gym Floor & Dumbbell Area (Up to 150 lbs)',
      'Basic 3D Muscle Anatomy App Access',
      'Locker Room & Infrared Sauna Access',
      '1 Free Biometrics Body Scan per month',
    ],
    popular: false,
    cta: 'Select Standard',
  },
  {
    name: 'TITAN PRO',
    price: '$89',
    billing: '/month',
    desc: 'Our most popular tier. Unlimited 3D biomechanics feedback, hypertrophy classes, and cold plunge.',
    features: [
      'Unlimited 24/7 Access to All Titan Facilities',
      'Full 3D Real-time Biomechanics & Routine Builder',
      'Access to Cold Plunge, Sauna & Hyperbaric Recovery',
      'All Group Powerlifting & HIIT Masterclasses',
      '2 Guest Passes per month',
      'Titan Labs Nutrition & Macro Tracker',
    ],
    popular: true,
    cta: 'Start 7-Day Free Trial',
  },
  {
    name: 'ELITE VIP ALL-ACCESS',
    price: '$149',
    billing: '/month',
    desc: 'For elite athletes seeking 1-on-1 coaching, bespoke periodization, and private recovery suites.',
    features: [
      'Everything in Titan Pro',
      '2 Monthly 1-on-1 Sessions with Elite Master Coach',
      'Custom Biomechanical EMG Muscle Analysis',
      'Unlimited Cryotherapy & Compression Recovery',
      'Private VIP Locker with Laundry Service',
      'Complimentary Titan Pre-Workout & Whey Bar',
    ],
    popular: false,
    cta: 'Claim VIP Pass',
  },
];

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono mb-3 font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>ZERO INITIATION FEES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-slate-900">
          MEMBERSHIP <span className="text-gradient-red">TIERS</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-mono mt-2">
          Choose the tier that matches your commitment. Cancel or upgrade anytime with zero hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {TIERS.map((tier, idx) => (
          <div
            key={idx}
            className={`glass-panel rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 bg-white/95 ${
              tier.popular
                ? 'border-cyan-500 shadow-xl scale-105 z-10'
                : 'border-slate-200 hover:border-cyan-300'
            }`}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                <Flame className="w-3 h-3 text-white fill-white" />
                <span>MOST POPULAR CHOICE</span>
              </div>
            )}

            <div>
              <div className="text-sm font-mono font-bold text-slate-500 tracking-wider">
                {tier.name}
              </div>

              <div className="flex items-baseline gap-1 mt-3 mb-2">
                <span className="text-4xl sm:text-5xl font-black font-display text-slate-900">
                  {tier.price}
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  {tier.billing}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {tier.desc}
              </p>

              {/* Features list */}
              <div className="space-y-2.5 mb-8 border-t border-slate-200 pt-6">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-mono">
                    <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                tier.popular
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              <span>{tier.cta}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
