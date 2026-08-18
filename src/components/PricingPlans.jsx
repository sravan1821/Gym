import React, { useState } from 'react';
import { Check, Flame, Sparkles, Zap, Crown, Shield, Star, ArrowRight } from 'lucide-react';

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
    icon: Shield,
    accent: 'slate',
    gradient: 'from-red-50 to-red-100/50',
    ctaStyle: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm',
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
    icon: Zap,
    accent: 'red',
    gradient: 'from-red-500/10 to-red-600/5',
    ctaStyle: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:brightness-110 shadow-lg shadow-red-600/20',
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
    icon: Crown,
    accent: 'darkRed',
    gradient: 'from-red-50 to-red-100/50',
    ctaStyle: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm',
  },
];

const ACCENT_COLORS = {
  slate: {
    badge: 'bg-gray-100 text-gray-700 border-gray-200',
    check: 'text-red-600',
    price: 'text-gray-900',
    glow: 'rgba(0, 0, 0, 0.05)',
  },
  red: {
    badge: 'bg-red-50 text-red-600 border-red-200',
    check: 'text-red-600',
    price: 'text-red-600',
    glow: 'rgba(220, 38, 38, 0.15)',
  },
  darkRed: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    check: 'text-red-600',
    price: 'text-gray-900',
    glow: 'rgba(0, 0, 0, 0.05)',
  },
};

export default function PricingPlans() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Subtle Ambient background */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-mono mb-4 font-bold shadow-sm tracking-wider border border-red-100">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>ZERO INITIATION FEES • CANCEL ANYTIME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-gray-900 leading-[0.95]">
          MEMBERSHIP <span className="text-gradient-red">TIERS</span>
        </h2>
        <p className="text-sm text-gray-500 font-mono mt-3 max-w-lg mx-auto">
          Choose the tier that matches your commitment. Upgrade, downgrade, or cancel anytime — no hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-xs font-mono font-bold transition-colors ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
            MONTHLY
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-14 h-7 rounded-full bg-gray-200 transition-all shadow-inner"
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 shadow-md ${
              billingCycle === 'annual'
                ? 'left-[30px] bg-gradient-to-r from-red-600 to-red-500'
                : 'left-0.5 bg-white'
            }`} />
          </button>
          <span className={`text-xs font-mono font-bold transition-colors flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-400'}`}>
            ANNUAL
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
              SAVE 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {TIERS.map((tier, idx) => {
          const colors = ACCENT_COLORS[tier.accent];
          const isHovered = hoveredIdx === idx;
          const Icon = tier.icon;
          const displayPrice = billingCycle === 'annual'
            ? `$${Math.round(parseInt(tier.price.replace('$', '')) * 0.8)}`
            : tier.price;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative rounded-3xl transition-all duration-300 ${
                tier.popular
                  ? 'scale-[1.03] z-10'
                  : 'hover:scale-[1.02]'
              }`}
            >
              {/* Popular Card Border Accent */}
              {tier.popular && (
                <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-b from-red-500 to-red-600 opacity-90 shadow-xl shadow-red-500/15" />
              )}

              <div className={`relative rounded-3xl p-8 flex flex-col justify-between h-full bg-white ${
                tier.popular
                  ? 'border-0 shadow-2xl'
                  : 'border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl'
              }`}>
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-white fill-white" />
                    <span>MOST POPULAR</span>
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                )}

                <div>
                  {/* Tier Icon & Name */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center border border-red-100">
                      <Icon className="w-4.5 h-4.5 text-red-600" />
                    </div>
                    <span className="text-sm font-mono font-bold text-gray-600 tracking-wider">
                      {tier.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mt-2 mb-3">
                    <span className={`text-5xl sm:text-6xl font-black font-display ${colors.price}`}>
                      {displayPrice}
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-bold">
                      /{billingCycle === 'annual' ? 'mo (billed yearly)' : 'month'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    {tier.desc}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-6" />

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs text-gray-700 group/feat"
                      >
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                          <Check className="w-3 h-3 text-red-600" />
                        </div>
                        <span className="group-hover/feat:text-gray-900 transition-colors font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 group/btn ${tier.ctaStyle}`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
          <Shield className="w-4 h-4 text-red-500" />
          <span>Money-Back Guarantee</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
          <Zap className="w-4 h-4 text-red-500" />
          <span>Instant Activation</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
          <Star className="w-4 h-4 text-red-500" />
          <span>4.9/5 Member Rating</span>
        </div>
      </div>
    </section>
  );
}
