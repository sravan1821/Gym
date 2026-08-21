import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Layers,
  Activity,
  Plus,
  Check,
  Eye,
  Film,
  Video,
  ChevronRight,
  Target,
  Clock,
  Zap,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Category Fallback Videos for 100% Reliable Streaming
 */
export const CATEGORY_FALLBACKS = {
  chest: {
    youtubeId: 'rT7DgCr-3pg',
    title: 'Barbell Flat Bench Press',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4',
  },
  shoulders: {
    youtubeId: '2yjwXTZQDDI',
    title: 'Standing Overhead Barbell Press (OHP)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4',
  },
  biceps: {
    youtubeId: 'kwG2ipFRgfo',
    title: 'Close-Grip EZ Bar Biceps Curl',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4',
  },
  triceps: {
    youtubeId: '2-LAMcpzODU',
    title: 'Straight-Bar Cable Triceps Pushdown',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4',
  },
  back: {
    youtubeId: 'vT2GjY_Umpw',
    title: 'Barbell Bent-Over Row',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-on-lat-pulldown-machine-40928-large.mp4',
  },
  abs: {
    youtubeId: 'hdng3Nm1x_E',
    title: 'Hanging Leg Raises for Core',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-hanging-leg-raises-for-abs-40932-large.mp4',
  },
  quads: {
    youtubeId: 'bEv6CCg2BC8',
    title: 'Barbell High-Bar Back Squat',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4',
  },
  glutes_hamstrings: {
    youtubeId: 'jEy_czb3RKA',
    title: 'Romanian Deadlift (RDL)',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4',
  },
  calves: {
    youtubeId: '-M4-G8p8fmc',
    title: 'Standing Barbell Calf Raise',
    fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4',
  },
};

/**
 * 100% Comprehensive Exercise Video Database (Every exercise in muscleData.js is mapped)
 */
export const EXERCISE_VIDEO_MAP = {
  // CHEST EXERCISES
  'Incline Dumbbell Press (30°)': { youtubeId: 'VmB1G1K7v94', title: 'Incline Dumbbell Bench Press (30°)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Incline Barbell Bench Press': { youtubeId: 'SrqOu55lrYU', title: 'Incline Barbell Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Incline Machine Chest Press': { youtubeId: 'SrqOu55lrYU', title: 'Incline Machine Chest Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Incline Push-Ups (Hands on Bench)': { youtubeId: 'SKPab2YC8BE', title: 'Incline Push-Ups', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Incline Push-Up (Hands Elevated)': { youtubeId: 'SKPab2YC8BE', title: 'Incline Push-Up (Hands Elevated)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Decline Feet-Elevated Push-Ups': { youtubeId: 'SKPab2YC8BE', title: 'Decline Feet-Elevated Push-Ups', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Reverse-Grip Barbell Bench Press': { youtubeId: 'rT7DgCr-3pg', title: 'Reverse-Grip Barbell Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Landmine Incline Chest Press': { youtubeId: 'SrqOu55lrYU', title: 'Landmine Incline Chest Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-incline-bench-press-40919-large.mp4' },
  'Barbell Flat Bench Press': { youtubeId: 'rT7DgCr-3pg', title: 'Barbell Flat Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Flat Dumbbell Press': { youtubeId: 'VmB1G1K7v94', title: 'Flat Dumbbell Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Seated Machine Chest Press': { youtubeId: 'VmB1G1K7v94', title: 'Seated Machine Chest Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Standard Floor Push-Ups': { youtubeId: 'IODxDxX7oi4', title: 'Standard Floor Push-Ups', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Standing Cable Crossover (Mid-Chest)': { youtubeId: 'Iwe6AmxVf7o', title: 'Standing Cable Crossover (Mid-Chest)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Standing Cable Crossover (Mid-Chest Flye)': { youtubeId: 'Iwe6AmxVf7o', title: 'Standing Cable Crossover (Mid-Chest Flye)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Pec Deck Flye Machine': { youtubeId: 'Iwe6AmxVf7o', title: 'Pec Deck Flye Machine', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Heavy Bench Press (Pause & Wave Loading)': { youtubeId: 'rT7DgCr-3pg', title: 'Heavy Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Dumbbell Squeeze Press (Hex Press)': { youtubeId: 'VmB1G1K7v94', title: 'Dumbbell Squeeze Press (Hex Press)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Decline Dumbbell Press (Light)': { youtubeId: 'LfyQBUKR8SE', title: 'Decline Dumbbell Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Decline Dumbbell Press': { youtubeId: 'LfyQBUKR8SE', title: 'Decline Dumbbell Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Decline Barbell Bench Press': { youtubeId: 'LfyQBUKR8SE', title: 'Decline Barbell Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'High-to-Low Cable Flye': { youtubeId: 'Iwe6AmxVf7o', title: 'High-to-Low Cable Flye', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'High-to-Low Cable Flye (Decline Angle)': { youtubeId: 'Iwe6AmxVf7o', title: 'High-to-Low Cable Flye', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Low-to-High Cable Flye': { youtubeId: 'Iwe6AmxVf7o', title: 'Low-to-High Cable Flye', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Parallel Bar Bodyweight Dips (Chest Lean)': { youtubeId: '2z8JmcrW-As', title: 'Parallel Bar Dips', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-dips-exercise-on-parallel-bars-42858-large.mp4' },
  'Weighted Chest Dips': { youtubeId: '2z8JmcrW-As', title: 'Weighted Chest Dips', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-dips-exercise-on-parallel-bars-42858-large.mp4' },
  'Weighted Chest Dips (Heavy Overload)': { youtubeId: '2z8JmcrW-As', title: 'Weighted Chest Dips (Heavy Overload)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-dips-exercise-on-parallel-bars-42858-large.mp4' },
  'Dumbbell Pullover (Decline Bench)': { youtubeId: 'rT7DgCr-3pg', title: 'Dumbbell Pullover', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },

  // SHOULDERS
  'Standing Overhead Barbell Press (OHP)': { youtubeId: '2yjwXTZQDDI', title: 'Standing Overhead Barbell Press (OHP)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Seated Dumbbell Shoulder Press': { youtubeId: 'qEwKCR5JCog', title: 'Seated Dumbbell Shoulder Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Dumbbell Seated Shoulder Press': { youtubeId: 'qEwKCR5JCog', title: 'Dumbbell Seated Shoulder Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Dumbbell Front Raise': { youtubeId: '-t7fuZ0KhDA', title: 'Dumbbell Front Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Arnold Press': { youtubeId: '6Z15_WdXmVw', title: 'Arnold Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Arnold Dumbbell Press': { youtubeId: '6Z15_WdXmVw', title: 'Arnold Dumbbell Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Push Press (Heavy Overhead)': { youtubeId: 'iaBVSJm78ko', title: 'Push Press (Heavy Overhead)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Standing Dumbbell Lateral Raise': { youtubeId: '3VcKaXpzqRo', title: 'Standing Dumbbell Lateral Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-lateral-raises-with-dumbbells-40924-large.mp4' },
  'Dumbbell Lateral Raises (Strict Pinky-High)': { youtubeId: '3VcKaXpzqRo', title: 'Dumbbell Lateral Raises', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-lateral-raises-with-dumbbells-40924-large.mp4' },
  'Machine Lateral Raise': { youtubeId: '3VcKaXpzqRo', title: 'Machine Lateral Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-lateral-raises-with-dumbbells-40924-large.mp4' },
  'Cable Cross-Body Y-Raise': { youtubeId: 'PPrzBWZDOhA', title: 'Cable Cross-Body Y-Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Cable Lean-Away Lateral Raise': { youtubeId: 'PPrzBWZDOhA', title: 'Cable Lean-Away Lateral Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Bent-Over Rear Delt Flyes': { youtubeId: 'rep-qVOkqgk', title: 'Bent-Over Rear Delt Flyes', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4' },
  'Face Pulls with External Rotation': { youtubeId: 'rep-qVOkqgk', title: 'Face Pulls with External Rotation', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4' },
  'Cable Rope Face Pulls + External Rotation': { youtubeId: 'rep-qVOkqgk', title: 'Cable Rope Face Pulls', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4' },
  'Reverse Pec Deck Flye': { youtubeId: '6kALZikXxLc', title: 'Reverse Pec Deck Flye', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4' },
  'Machine Reverse Pec Deck Flye': { youtubeId: '6kALZikXxLc', title: 'Machine Reverse Pec Deck Flye', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4' },
  'Incline Chest-Supported Rear Delt Flye': { youtubeId: 'rep-qVOkqgk', title: 'Incline Chest-Supported Rear Delt Flye', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-rear-delt-flyes-40925-large.mp4' },
  'Cable Cross-Body Rear Delt Flyes (No Handles)': { youtubeId: 'rep-qVOkqgk', title: 'Cable Cross-Body Rear Delt Flyes', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },

  // BICEPS & FOREARMS
  'Close-Grip EZ Bar Curl': { youtubeId: 'kwG2ipFRgfo', title: 'Close-Grip EZ Bar Curl', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Incline Dumbbell Curl': { youtubeId: 'soxrZlIl35U', title: 'Incline Dumbbell Curl', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Standing Barbell Curl': { youtubeId: 'ykJmrZ5v0Oo', title: 'Standing Barbell Curl', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Standing Dumbbell Curl (Supinated)': { youtubeId: 'ykJmrZ5v0Oo', title: 'Standing Dumbbell Curl (Supinated)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Dumbbell Hammer Curls': { youtubeId: 'zC3nLlEvin4', title: 'Dumbbell Hammer Curls', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Preacher Curl (EZ Bar)': { youtubeId: 'fIWP-FRFNU0', title: 'Preacher Curl (EZ Bar)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Preacher Curl (Wide Grip)': { youtubeId: 'fIWP-FRFNU0', title: 'Preacher Curl (Wide Grip)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'Drag Curl (Barbell / Smith)': { youtubeId: 'kwG2ipFRgfo', title: 'Drag Curl (Barbell / Smith)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },
  'High Cable Bicep Curl (Hercules Curl)': { youtubeId: 'ykJmrZ5v0Oo', title: 'High Cable Bicep Curl', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-his-biceps-with-dumbbells-40927-large.mp4' },

  // TRICEPS
  'Overhead Cable Tricep Extension': { youtubeId: 'vB5OHsJ3EME', title: 'Overhead Cable Tricep Extension', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Cable Overhead Tricep Extension (Low Pulley)': { youtubeId: 'vB5OHsJ3EME', title: 'Cable Overhead Tricep Extension', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Straight-Bar Cable Pushdown': { youtubeId: '2-LAMcpzODU', title: 'Straight-Bar Cable Pushdown', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Rope Cable Pushdown': { youtubeId: 'vB5OHsJ3EME', title: 'Rope Cable Pushdown', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Rope Tricep Cable Pushdown': { youtubeId: 'vB5OHsJ3EME', title: 'Rope Tricep Cable Pushdown', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Skull Crushers (Lying EZ Bar Extension)': { youtubeId: 'l3rHYPtMUo8', title: 'Skull Crushers', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Incline EZ-Bar Skullcrushers': { youtubeId: 'l3rHYPtMUo8', title: 'Incline EZ-Bar Skullcrushers', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },
  'Close-Grip Bench Press': { youtubeId: 'nEF0bv2FW94', title: 'Close-Grip Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Close-Grip Barbell Bench Press': { youtubeId: 'nEF0bv2FW94', title: 'Close-Grip Barbell Bench Press', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-on-a-bench-40920-large.mp4' },
  'Overhead Dumbbell Tricep Extension': { youtubeId: 'vB5OHsJ3EME', title: 'Overhead Dumbbell Tricep Extension', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-triceps-exercises-with-cable-machine-42862-large.mp4' },

  // BACK & LATS (Verified Embeds)
  'Lat Pulldown (Wide Pronated Grip)': { youtubeId: 'CAwf7n6Luuc', title: 'Lat Pulldown (Wide Pronated Grip)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-on-lat-pulldown-machine-40928-large.mp4' },
  'Wide-Grip Lat Pulldown': { youtubeId: 'CAwf7n6Luuc', title: 'Wide-Grip Lat Pulldown', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-on-lat-pulldown-machine-40928-large.mp4' },
  'Barbell Bent-Over Row (45° Torso)': { youtubeId: 'vT2GjY_Umpw', title: 'Barbell Bent-Over Row', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4' },
  'Overhand Barbell Bent-Over Row': { youtubeId: 'vT2GjY_Umpw', title: 'Overhand Barbell Bent-Over Row', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4' },
  'Pull-Ups (Wide Overhand Grip)': { youtubeId: 'eGo4IYlbE5g', title: 'Pull-Ups (Wide Overhand Grip)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4' },
  'Pull-Ups (Bodyweight)': { youtubeId: 'eGo4IYlbE5g', title: 'Pull-Ups (Bodyweight)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4' },
  'Seated Cable Row (V-Bar Close Grip)': { youtubeId: 'xQNrFHEMhI4', title: 'Seated Cable Row', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-cable-machine-42861-large.mp4' },
  'Single-Arm Dumbbell Row': { youtubeId: 'j3Igk5nyZE4', title: 'Single-Arm Dumbbell Row', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bent-over-barbell-rows-40929-large.mp4' },
  'Barbell Shrugs (Trapezius)': { youtubeId: 'cJRVVxmytaM', title: 'Barbell Shrugs (Trapezius)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-overhead-press-with-barbell-40922-large.mp4' },
  'Conventional Deadlift': { youtubeId: 'op9kVnSso6Q', title: 'Conventional Deadlift', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },
  'Heavy Barbell Deadlift (Conventional)': { youtubeId: 'op9kVnSso6Q', title: 'Heavy Barbell Deadlift', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },

  // ABS & CORE
  'Hanging Leg Raises': { youtubeId: 'hdng3Nm1x_E', title: 'Hanging Leg Raises', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-hanging-leg-raises-for-abs-40932-large.mp4' },
  'Floor Plank Hold': { youtubeId: 'pSHjTRCQxIw', title: 'Floor Plank Hold', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-hanging-leg-raises-for-abs-40932-large.mp4' },
  'Kneeling Cable Crunch': { youtubeId: 'hdng3Nm1x_E', title: 'Kneeling Cable Crunch', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-hanging-leg-raises-for-abs-40932-large.mp4' },
  'Standing Ab Wheel Rollouts': { youtubeId: 'hdng3Nm1x_E', title: 'Standing Ab Wheel Rollouts', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-hanging-leg-raises-for-abs-40932-large.mp4' },

  // QUADS
  'Barbell Back Squats (High Bar)': { youtubeId: 'bEv6CCg2BC8', title: 'Barbell Back Squats (High Bar)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },
  'Barbell High-Bar Back Squat': { youtubeId: 'bEv6CCg2BC8', title: 'Barbell High-Bar Back Squat', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },
  'Barbell Front Squat (Deep ATG)': { youtubeId: 'bEv6CCg2BC8', title: 'Barbell Front Squat (Deep ATG)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },
  'Goblet Squat (Dumbbell)': { youtubeId: 'MeIiIdhvXT4', title: 'Goblet Squat (Dumbbell)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },
  'Leg Press (45° Incline)': { youtubeId: 'IZxyjW7MPJQ', title: 'Leg Press (45° Incline)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },
  'Bulgarian Split Squat': { youtubeId: '2C-uNgKwPLE', title: 'Bulgarian Split Squat', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },
  'Leg Extensions (VMO Isolation)': { youtubeId: 'IZxyjW7MPJQ', title: 'Leg Extensions (VMO Isolation)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-with-barbell-40930-large.mp4' },

  // GLUTES & HAMSTRINGS
  'Romanian Deadlift (RDL)': { youtubeId: 'jEy_czb3RKA', title: 'Romanian Deadlift (RDL)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },
  'Dumbbell Romanian Deadlift (RDL)': { youtubeId: 'jEy_czb3RKA', title: 'Dumbbell Romanian Deadlift (RDL)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },
  'Barbell Hip Thrust': { youtubeId: 'SEdqd1n0cvg', title: 'Barbell Hip Thrust', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },
  'Heavy Barbell Hip Thrust (3s Pause)': { youtubeId: 'SEdqd1n0cvg', title: 'Heavy Barbell Hip Thrust', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },
  'Lying Leg Curls (Hamstrings)': { youtubeId: '1Tq3QdYUuHs', title: 'Lying Leg Curls', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },
  'Glute-Ham Raise (GHR)': { youtubeId: '1Tq3QdYUuHs', title: 'Glute-Ham Raise (GHR)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-deadlifts-with-barbell-40931-large.mp4' },

  // CALVES
  'Standing Barbell Calf Raises': { youtubeId: '-M4-G8p8fmc', title: 'Standing Barbell Calf Raises', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
  'Standing Barbell Calf Raise': { youtubeId: '-M4-G8p8fmc', title: 'Standing Barbell Calf Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
  'Standing Machine Calf Raise': { youtubeId: '-M4-G8p8fmc', title: 'Standing Machine Calf Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
  'Single-Leg Dumbbell Calf Raise (3s Pause)': { youtubeId: '-M4-G8p8fmc', title: 'Single-Leg Dumbbell Calf Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
  'Seated Calf Raises (Soleus Focus)': { youtubeId: 'JbyjNymZOt0', title: 'Seated Calf Raises (Soleus Focus)', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
  'Seated Dumbbell Calf Raise': { youtubeId: 'JbyjNymZOt0', title: 'Seated Dumbbell Calf Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
  'Heavy Seated Machine Calf Raise (3s Pause)': { youtubeId: 'JbyjNymZOt0', title: 'Heavy Seated Machine Calf Raise', fallbackMp4: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-calves-on-a-step-40933-large.mp4' },
};

/**
 * Intelligent Multi-Tier Video Resolver
 * Guarantees a high-quality video is ALWAYS returned for any exercise, muscle, or sub-muscle.
 */
export function resolveExerciseVideo(exerciseName, parentMuscleId, subMuscleId) {
  if (exerciseName && EXERCISE_VIDEO_MAP[exerciseName]) {
    return EXERCISE_VIDEO_MAP[exerciseName];
  }

  // Tier 2: Keyword-based resolution
  if (exerciseName) {
    const nameLower = exerciseName.toLowerCase();
    for (const [key, value] of Object.entries(EXERCISE_VIDEO_MAP)) {
      const keyLower = key.toLowerCase();
      if (nameLower.includes(keyLower) || keyLower.includes(nameLower)) {
        return value;
      }
    }
  }

  // Tier 3: Parent muscle fallback
  if (parentMuscleId && CATEGORY_FALLBACKS[parentMuscleId]) {
    return CATEGORY_FALLBACKS[parentMuscleId];
  }

  // Tier 4: Global default
  return CATEGORY_FALLBACKS.chest;
}

export default function RealWorkoutVideoPlayer({
  subMuscle,
  parentMuscle,
  experienceLevel = 'intermediate',
  onAddToRoutine,
  addedExercises = [],
  onOpenFullModal,
}) {
  const exercises =
    subMuscle?.levelWorkouts?.[experienceLevel] ||
    subMuscle?.levelWorkouts?.intermediate ||
    parentMuscle?.levelWorkouts?.[experienceLevel] ||
    parentMuscle?.levelWorkouts?.intermediate ||
    [];

  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [playerMode, setPlayerMode] = useState('video'); // 'video' | 'biomechanics' | 'tempo'
  const [videoSourceType, setVideoSourceType] = useState('youtube'); // 'youtube' | 'mp4'
  const [repCadencePhase, setRepCadencePhase] = useState('eccentric'); // 'eccentric' | 'pause' | 'concentric' | 'squeeze'
  const [tempoSeconds, setTempoSeconds] = useState(0);

  // Reset selected exercise when subMuscle changes
  useEffect(() => {
    setSelectedExerciseIndex(0);
  }, [subMuscle?.id, parentMuscle?.id]);

  const activeExercise = exercises[selectedExerciseIndex] || exercises[0] || {
    name: 'Incline Dumbbell Press (30°)',
    target: 'Upper Pec Shelf',
    sets: '3 Sets',
    reps: '10 - 12 Reps',
    rest: '90s',
    tempo: '3-0-1-0',
    equipment: 'dumbbell',
  };

  // Resolve video with 100% guarantee
  const videoMeta = resolveExerciseVideo(
    activeExercise.name,
    parentMuscle?.id,
    subMuscle?.id
  );

  // Live Rep Cadence Tracker Loop (3-0-1-0 Tempo Cycle)
  useEffect(() => {
    let timer;
    if (playerMode === 'tempo') {
      timer = setInterval(() => {
        setTempoSeconds((prev) => {
          const next = (prev + 1) % 5;
          if (next <= 2) setRepCadencePhase('eccentric'); // 0-2s (3s Lower)
          else if (next === 3) setRepCadencePhase('concentric'); // 1s Press
          else setRepCadencePhase('squeeze'); // 1s Squeeze
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playerMode]);

  const isAdded = addedExercises.some((e) => e.name === activeExercise.name);

  const handleAdd = () => {
    onAddToRoutine({
      ...activeExercise,
      muscleName: subMuscle ? `${parentMuscle?.name} (${subMuscle.name})` : parentMuscle?.name,
    });
    confetti({
      particleCount: 35,
      spread: 60,
      colors: ['#dc2626', '#ef4444', '#f87171', '#b91c1c'],
    });
  };

  return (
    <div className="space-y-4">
      {/* Exercise Selector Pills */}
      {exercises.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {exercises.map((ex, idx) => {
            const isSel = selectedExerciseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedExerciseIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all font-bold flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md shadow-red-600/20 scale-102 font-extrabold'
                    : 'bg-gray-50 border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50'
                }`}
              >
                <Play className={`w-3 h-3 ${isSel ? 'fill-white' : 'fill-red-600 text-red-600'}`} />
                <span>{ex.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Video Demonstration Frame */}
      <div className="relative rounded-3xl bg-black border border-gray-800 overflow-hidden shadow-xl">
        {/* Top Video Overlay HUD */}
        <div className="p-3.5 flex items-center justify-between z-30 bg-gray-900/90 border-b border-gray-800 text-white flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-red-500" />
              <span>REAL 4K HD DEMO</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-500/20 text-red-400 uppercase font-bold border border-red-500/30">
              {subMuscle?.name || parentMuscle?.name || 'Target'}
            </span>
          </div>

          {/* Mode Switcher: Real Video vs Biomechanical Data vs Tempo */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setPlayerMode('video')}
              className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                playerMode === 'video'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>REAL VIDEO</span>
            </button>
            <button
              onClick={() => setPlayerMode('biomechanics')}
              className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                playerMode === 'biomechanics'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>ACTIVATION</span>
            </button>
            <button
              onClick={() => setPlayerMode('tempo')}
              className={`px-2 py-0.5 rounded-md font-bold uppercase transition-all flex items-center gap-1 ${
                playerMode === 'tempo'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>TEMPO</span>
            </button>
          </div>
        </div>

        {/* Video Player & Real HD Stream Container */}
        <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center bg-black overflow-hidden">
          {/* Real Video Stream Embed (HD YouTube Embed with auto-loop, 1080p, and fallback MP4) */}
          {playerMode === 'video' && (
            <div className="relative w-full h-full">
              {videoSourceType === 'youtube' ? (
                <iframe
                  key={videoMeta.youtubeId}
                  src={`https://www.youtube.com/embed/${videoMeta.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${videoMeta.youtubeId}&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=1`}
                  title={`${activeExercise.name} Real HD Demonstration`}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={videoMeta.fallbackMp4}
                  src={videoMeta.fallbackMp4}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Biomechanics Activation View */}
          {playerMode === 'biomechanics' && (
            <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-black text-gray-200">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <div className="text-xs font-mono font-bold text-red-500 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>EMG MUSCLE ACTIVATION PROFILE</span>
                </div>
                <span className="text-xs font-mono font-bold text-red-400 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                  PEAK 94%
                </span>
              </div>

              {/* Primary & Secondary Muscle Load Bars */}
              <div className="space-y-3 my-auto">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-bold">{activeExercise.target || subMuscle?.name || 'Primary Muscle'}</span>
                    <span className="text-red-500 font-bold">92% Primary Load</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-400">Stabilizer & Synergist Assistance</span>
                    <span className="text-red-400 font-bold">65% Secondary</span>
                  </div>
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-700 to-red-600 rounded-full w-[65%]" />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-800/80 border border-gray-700 text-xs text-gray-300 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-red-500 shrink-0" />
                <span>
                  <strong>Hypertrophy Tension Cue:</strong> {activeExercise.whyItWorks || 'Maintain continuous mechanical tension at the deep stretch position.'}
                </span>
              </div>
            </div>
          )}

          {/* Tempo Cadence Coach View */}
          {playerMode === 'tempo' && (
            <div className="w-full h-full p-5 flex flex-col justify-between items-center text-center bg-gradient-to-b from-gray-900 to-black text-gray-200">
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
                HYPERTROPHY CADENCE METRONOME • 3-0-1-0 TEMPO
              </span>

              <div className="my-auto space-y-2">
                <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight uppercase">
                  {repCadencePhase === 'eccentric' ? (
                    <span className="text-red-500 animate-pulse">LOWER (3s DESCENT)</span>
                  ) : repCadencePhase === 'concentric' ? (
                    <span className="text-white">EXPLOSIVE DRIVE (1s)</span>
                  ) : (
                    <span className="text-red-400">PEAK CONTRACTION</span>
                  )}
                </div>
                <p className="text-xs font-mono text-gray-400">
                  Target: {activeExercise.sets} • {activeExercise.reps} • {activeExercise.rest} Rest
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>Optimal eccentric control maximizes sarcomere muscle damage and fiber growth.</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="p-3.5 bg-gray-900 border-t border-gray-800 space-y-2.5">
          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVideoSourceType((prev) => (prev === 'youtube' ? 'mp4' : 'youtube'))}
                className="px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 font-bold flex items-center gap-1.5 border border-gray-700 hover:text-white transition-colors"
                title="Toggle between YouTube 4K stream and Direct HD MP4 video feed"
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>{videoSourceType === 'youtube' ? '1080p HD YOUTUBE' : 'DIRECT HD STREAM'}</span>
              </button>
              <div className="text-[11px] text-gray-400 font-mono">
                {activeExercise.sets} • {activeExercise.reps}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => onOpenFullModal && onOpenFullModal(activeExercise)}
                className="py-2 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold transition-colors flex items-center gap-1.5 border border-gray-700"
              >
                <Eye className="w-3.5 h-3.5 text-red-500" />
                <span>FULL GUIDE</span>
              </button>

              <button
                onClick={handleAdd}
                className={`py-2 px-3.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  isAdded
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md shadow-red-600/20 hover:brightness-110 font-bold'
                }`}
              >
                {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{isAdded ? 'ADDED' : 'ADD TO ROUTINE'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Key Form Checkpoints */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-gray-500 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>PRO VIDEO FORM EXECUTION CHECKPOINTS</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-mono text-[10px] text-red-600 block font-bold">0:00 • SETUP</span>
            <p className="text-gray-700 mt-0.5 leading-snug">
              {activeExercise.cues?.setup || 'Retract scapulae, plant feet firmly, grip weight tightly.'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-mono text-[10px] text-red-600 block font-bold">0:02 • DESCENT</span>
            <p className="text-gray-700 mt-0.5 leading-snug">
              {activeExercise.cues?.execution || 'Lower with 3-second control to deep stretch line.'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-mono text-[10px] text-red-600 block font-bold">0:04 • SQUEEZE</span>
            <p className="text-gray-700 mt-0.5 leading-snug">
              {activeExercise.cues?.focus || 'Drive upward with power and squeeze target sub-muscle at peak.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
