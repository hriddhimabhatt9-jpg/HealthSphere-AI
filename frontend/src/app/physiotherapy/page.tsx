// ============================================================================
// HealthSphere AI — Physiotherapy Module
// Exercise tracking, pain monitoring, and recovery progress
// ============================================================================

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronLeft, Activity, TrendingUp, Clock, Flame,
  CheckCircle, Play, ChevronRight, Calendar, BarChart3,
  Zap, Target, Heart, Dumbbell, ArrowRight,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ── Mock Data ───────────────────────────────────────────────────────────────

const weeklyProgress = [
  { day: 'Mon', completed: 3, total: 4, painLevel: 3 },
  { day: 'Tue', completed: 4, total: 4, painLevel: 2 },
  { day: 'Wed', completed: 2, total: 4, painLevel: 4 },
  { day: 'Thu', completed: 4, total: 4, painLevel: 2 },
  { day: 'Fri', completed: 3, total: 4, painLevel: 3 },
  { day: 'Sat', completed: 0, total: 0, painLevel: 0 },
  { day: 'Sun', completed: 0, total: 0, painLevel: 0 },
];

const exercises = [
  { id: '1', name: 'Shoulder Flexion', category: 'MOBILITY', difficulty: 'Beginner', targetArea: 'Shoulders', duration: '5 min', reps: '3 × 12', icon: '🤸', color: 'var(--primary)', completed: true },
  { id: '2', name: 'Quad Stretch', category: 'STRETCHING', difficulty: 'Beginner', targetArea: 'Quadriceps', duration: '3 min', reps: '3 × 30s', icon: '🧘', color: 'var(--secondary)', completed: true },
  { id: '3', name: 'Wall Push-ups', category: 'STRENGTHENING', difficulty: 'Intermediate', targetArea: 'Upper Body', duration: '8 min', reps: '3 × 15', icon: '💪', color: 'var(--tertiary)', completed: false },
  { id: '4', name: 'Single Leg Balance', category: 'BALANCE', difficulty: 'Intermediate', targetArea: 'Core & Legs', duration: '5 min', reps: '3 × 30s', icon: '🦶', color: '#7c3aed', completed: false },
];

const recentSessions = [
  { date: 'Oct 21', exercises: 4, duration: '32 min', painBefore: 4, painAfter: 2, improvement: '+8%' },
  { date: 'Oct 20', exercises: 3, duration: '25 min', painBefore: 5, painAfter: 3, improvement: '+5%' },
  { date: 'Oct 19', exercises: 4, duration: '30 min', painBefore: 3, painAfter: 1, improvement: '+12%' },
];

export default function PhysiotherapyPage() {
  const [selectedPainLevel, setSelectedPainLevel] = useState(3);
  const totalCompleted = exercises.filter((e) => e.completed).length;
  const totalExercises = exercises.length;
  const completionPct = Math.round((totalCompleted / totalExercises) * 100);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 glass-card-strong px-6 h-16 flex items-center gap-4 border-b border-[var(--outline-variant)]/10">
        <Link href="/patient" className="p-2 rounded-xl hover:bg-[var(--surface-container)] transition-colors" aria-label="Back to dashboard">
          <ChevronLeft size={20} />
        </Link>
        <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center">
          <Activity size={22} className="text-[var(--secondary)]" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-base font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Physiotherapy Tracker</h1>
          <p className="text-xs text-[var(--on-surface-variant)]">Recovery & Exercise Monitoring</p>
        </div>
      </header>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div className="space-y-8" initial="hidden" animate="visible" variants={stagger}>

          {/* ── Progress Overview ─────────────────────────────────── */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { label: "Today's Progress", value: `${completionPct}%`, icon: Target, color: 'var(--primary)', desc: `${totalCompleted}/${totalExercises} exercises` },
              { label: 'Recovery Score', value: '78', icon: TrendingUp, color: 'var(--secondary)', desc: '+12% this week' },
              { label: 'Session Time', value: '21m', icon: Clock, color: 'var(--tertiary)', desc: 'Active today' },
              { label: 'Streak', value: '5 Days', icon: Flame, color: '#f59e0b', desc: 'Keep it up! 🔥' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--surface-container-lowest)] rounded-2xl p-5 shadow-sm card-interactive">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon size={18} style={{ color: stat.color }} aria-hidden="true" />
                </div>
                <p className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">{stat.value}</p>
                <p className="text-xs text-[var(--on-surface-variant)]">{stat.label}</p>
                <p className="text-[10px] text-[var(--secondary)] font-medium mt-1">{stat.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Weekly Chart ──────────────────────────────────────── */}
          <motion.div variants={fadeInUp}>
            <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Weekly Mobility Progress</h3>
                <span className="text-xs text-[var(--on-surface-variant)]">This Week</span>
              </div>
              <div className="flex items-end gap-3 h-32">
                {weeklyProgress.map((day, i) => {
                  const pct = day.total > 0 ? (day.completed / day.total) * 100 : 0;
                  const isToday = i === new Date().getDay() - 1;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        className={`w-full rounded-t-lg ${isToday ? 'bg-[var(--primary)]' : pct === 100 ? 'bg-[var(--secondary)]' : pct > 0 ? 'bg-[var(--primary)]/30' : 'bg-[var(--surface-container-high)]'}`}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(pct, 8)}%` }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                      />
                      <span className={`text-xs font-medium ${isToday ? 'text-[var(--primary)] font-bold' : 'text-[var(--on-surface-variant)]'}`}>
                        {day.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Today's Exercises ──────────────────────────────────── */}
          <motion.div variants={fadeInUp}>
            <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold">Today&apos;s Exercises</h3>
                <span className="text-sm text-[var(--primary)] font-semibold">{totalCompleted}/{totalExercises} done</span>
              </div>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                      exercise.completed
                        ? 'bg-[var(--secondary)]/5 opacity-70'
                        : 'hover:bg-[var(--surface-container)]'
                    }`}
                  >
                    <div className="text-2xl w-12 h-12 flex items-center justify-center bg-[var(--surface-container)] rounded-xl" aria-hidden="true">
                      {exercise.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${exercise.completed ? 'line-through text-[var(--on-surface-variant)]' : 'text-[var(--on-surface)]'}`}>
                          {exercise.name}
                        </p>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          exercise.category === 'MOBILITY' ? 'badge-info' :
                          exercise.category === 'STRETCHING' ? 'badge-stable' :
                          exercise.category === 'STRENGTHENING' ? 'badge-warning' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {exercise.category}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">
                        {exercise.targetArea} • {exercise.reps} • {exercise.duration}
                      </p>
                    </div>
                    {exercise.completed ? (
                      <CheckCircle size={22} className="text-[var(--secondary)] flex-shrink-0" />
                    ) : (
                      <button className="p-2.5 gradient-primary rounded-xl text-white hover:scale-105 transition-transform" aria-label={`Start ${exercise.name}`}>
                        <Play size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Pain Level & Sessions ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pain Tracker */}
            <motion.div variants={fadeInUp}>
              <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold mb-4">Current Pain Level</h3>
                <p className="text-sm text-[var(--on-surface-variant)] mb-4">How would you rate your pain right now?</p>
                <div className="flex gap-2 mb-4">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedPainLevel(level)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        level === selectedPainLevel
                          ? level <= 3
                            ? 'bg-[var(--secondary)] text-white'
                            : level <= 6
                              ? 'bg-amber-500 text-white'
                              : 'bg-[var(--error)] text-white'
                          : 'bg-[var(--surface-container)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]'
                      }`}
                      aria-label={`Pain level ${level}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-[var(--on-surface-variant)] uppercase">
                  <span>No Pain</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
                <button className="mt-4 w-full py-3 gradient-primary text-white font-bold rounded-xl hover:scale-[1.01] transition-transform" id="log-pain-btn">
                  Log Pain Level
                </button>
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div variants={fadeInUp}>
              <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold mb-4">Recent Sessions</h3>
                <div className="space-y-3">
                  {recentSessions.map((session) => (
                    <div key={session.date} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--surface-container)] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                          <Dumbbell size={18} className="text-[var(--primary)]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--on-surface)]">{session.date}</p>
                          <p className="text-xs text-[var(--on-surface-variant)]">
                            {session.exercises} exercises • {session.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--secondary)] font-bold">{session.improvement}</p>
                        <p className="text-[10px] text-[var(--on-surface-variant)]">
                          Pain: {session.painBefore} → {session.painAfter}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Recovery Tip ──────────────────────────────────────── */}
          <motion.div variants={fadeInUp}>
            <div className="gradient-primary rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap size={28} aria-hidden="true" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-sm uppercase tracking-wider">Recovery Insight</p>
                <p className="text-sm opacity-90 mt-1">
                  Your mobility has improved 18% over the last 2 weeks. Consistency is key — aim for at least 3 sessions this week.
                </p>
              </div>
              <button className="px-6 py-3 bg-white/15 rounded-xl font-bold text-sm hover:bg-white/25 transition-colors backdrop-blur-md">
                View Full Report
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
