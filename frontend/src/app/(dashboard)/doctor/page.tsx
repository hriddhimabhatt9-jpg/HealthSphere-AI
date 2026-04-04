// ============================================================================
// HealthSphere AI — Doctor Dashboard
// Clinical overview with patient queue, flow analytics, and prescriptions
// ============================================================================

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Clock, TrendingUp, Calendar, Mic, FileText,
  ChevronRight, Shield, Activity, Star, Video,
  BarChart3, CheckCircle, AlertCircle, Plus,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const patientQueue = [
  { id: '1', name: 'Arthur Henderson', initials: 'AH', status: 'STABLE', condition: 'Routine checkup', waitTime: '12 min', bgColor: 'bg-orange-100 text-orange-700' },
  { id: '2', name: 'Clara Thorne', initials: 'CT', status: 'CRITICAL', condition: 'Chest pain', waitTime: '3 min', bgColor: 'bg-purple-100 text-purple-700' },
  { id: '3', name: 'Jameson Wells', initials: 'JW', status: 'STABLE', condition: 'Follow-up', waitTime: '20 min', bgColor: 'bg-teal-100 text-teal-700' },
];

const flowData = [
  { day: 'MON', value: 45 },
  { day: 'TUE', value: 52 },
  { day: 'WED', value: 60 },
  { day: 'THU', value: 38 },
  { day: 'FRI', value: 47 },
];

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function DoctorDashboard() {
  const user = useAuthStore((state) => state.user);
  const [voiceActive, setVoiceActive] = useState(false);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <motion.div className="space-y-8 max-w-6xl" initial="hidden" animate="visible" variants={stagger}>
      {/* ── Title bar ──────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Clinical Overview</h1>
          <p className="text-[var(--on-surface-variant)] mt-1">{today} • Welcome back, Dr. {user ? user.lastName || user.firstName : 'Doctor'}</p>
        </div>
        <Link href="/doctor/appointments" className="self-start px-6 py-3 gradient-primary text-white font-bold rounded-xl shadow-lg shadow-[var(--primary)]/15 hover:scale-[1.02] transition-transform flex items-center gap-2" id="schedule-btn">
          <Calendar size={18} aria-hidden="true" />
          Schedule
        </Link>
      </motion.div>

      {/* ── Analytics Row ──────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: '1,489', change: '+4', icon: Users, color: 'var(--primary)' },
          { label: 'Success Rate', value: '96%', change: null, icon: CheckCircle, color: 'var(--secondary)' },
          { label: 'Avg Wait Time', value: '14', unit: 'min', change: '+2', icon: Clock, color: 'var(--tertiary)' },
          { label: 'Consultations', value: '4.9', change: null, icon: Star, color: '#f59e0b' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--surface-container-lowest)] rounded-2xl p-5 shadow-sm card-interactive">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} style={{ color: stat.color }} aria-hidden="true" />
              {stat.change && (
                <span className="text-xs font-medium text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">
              {stat.value}{stat.unit && <span className="text-sm text-[var(--on-surface-variant)] ml-1">{stat.unit}</span>}
            </p>
            <p className="text-xs text-[var(--on-surface-variant)] mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Patient Flow Chart ─────────────────────────────────── */}
        <motion.div variants={fadeInUp} className="lg:col-span-3">
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Patient Flow Analysis</h3>
                <p className="text-xs text-[var(--on-surface-variant)]">Patients treated per day across the current week</p>
              </div>
              <select className="text-xs bg-[var(--surface-container)] rounded-lg px-3 py-1.5 border-none outline-none text-[var(--on-surface-variant)]" aria-label="Time range">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex items-end gap-4 h-40">
              {flowData.map((item, i) => {
                const isHighest = item.value === Math.max(...flowData.map(d => d.value));
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className={`w-full rounded-t-lg ${isHighest ? 'bg-[var(--primary)]' : 'bg-[var(--primary)]/20'}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.value / 70) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    />
                    <span className={`text-xs font-medium ${isHighest ? 'text-[var(--primary)] font-bold' : 'text-[var(--on-surface-variant)]'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Patient Queue ──────────────────────────────────────── */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Active Patient Queue</h3>
              <div className="flex gap-1.5">
                <span className="badge-stable text-[10px] font-bold px-2 py-0.5 rounded-full">4 Stable</span>
                <span className="badge-critical text-[10px] font-bold px-2 py-0.5 rounded-full">1 Critical</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_auto] gap-2 text-[10px] text-[var(--on-surface-variant)] uppercase tracking-wider font-medium px-3 pb-2">
                <span>Patient Name</span>
                <span>Status</span>
              </div>
              {patientQueue.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--surface-container)] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${patient.bgColor}`}>
                      {patient.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--on-surface)]">{patient.name}</p>
                      <p className="text-xs text-[var(--on-surface-variant)]">{patient.condition}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${patient.status === 'CRITICAL' ? 'badge-critical' : 'badge-stable'}`}>
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Voice Notes & Quick Actions ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice-to-Text Notes */}
        <motion.div variants={fadeInUp}>
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Mic size={20} className="text-[var(--primary)]" aria-hidden="true" />
              <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Voice Notes</h3>
            </div>
            <p className="text-sm text-[var(--on-surface-variant)] mb-4">
              Dictate medical notes and they&apos;ll be transcribed automatically using Web Speech API.
            </p>
            <div className="bg-[var(--surface-container)] rounded-xl p-4 min-h-[120px] text-sm text-[var(--on-surface-variant)] italic">
              {voiceActive ? 'Listening... Speak your clinical notes.' : 'Press the microphone to start dictating...'}
            </div>
            <button
              onClick={() => setVoiceActive(!voiceActive)}
              className={`mt-4 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                voiceActive
                  ? 'bg-[var(--error)] text-white shadow-lg shadow-[var(--error)]/20'
                  : 'gradient-primary text-white shadow-lg shadow-[var(--primary)]/15'
              }`}
              aria-label={voiceActive ? 'Stop recording' : 'Start recording'}
              id="voice-record-btn"
            >
              <Mic size={18} />
              {voiceActive ? 'Stop Recording' : 'Start Dictation'}
            </button>
          </div>
        </motion.div>

        {/* Quick Prescription */}
        <motion.div variants={fadeInUp}>
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-[var(--secondary)]" aria-hidden="true" />
              <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Quick Prescription</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label htmlFor="patient-select" className="text-xs text-[var(--on-surface-variant)] font-medium">Patient</label>
                <select id="patient-select" className="w-full mt-1 px-4 py-2.5 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none text-[var(--on-surface)]">
                  <option>Select patient...</option>
                  <option>Arthur Henderson</option>
                  <option>Clara Thorne</option>
                  <option>Jameson Wells</option>
                </select>
              </div>
              <div>
                <label htmlFor="medication-input" className="text-xs text-[var(--on-surface-variant)] font-medium">Medication</label>
                <input id="medication-input" type="text" placeholder="e.g., Amoxicillin 500mg" className="w-full mt-1 px-4 py-2.5 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/50" />
              </div>
              <div>
                <label htmlFor="instructions-input" className="text-xs text-[var(--on-surface-variant)] font-medium">Instructions</label>
                <textarea id="instructions-input" rows={2} placeholder="Dosage and frequency..." className="w-full mt-1 px-4 py-2.5 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/50 resize-none" />
              </div>
              <button className="w-full py-3 gradient-primary text-white font-bold rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2" id="create-prescription-btn">
                <Plus size={18} /> Create Prescription
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── AI Insight Banner ──────────────────────────────────────── */}
      <motion.div variants={fadeInUp}>
        <div className="gradient-primary rounded-2xl p-6 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield size={24} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">AI INSIGHT</p>
            <p className="text-sm opacity-90">98% Data Accuracy — Machine learning models have been updated with latest clinical guidelines.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
