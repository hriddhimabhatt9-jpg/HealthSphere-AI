// ============================================================================
// HealthSphere AI — Patient Dashboard
// Complete health overview matching Stitch design
// ============================================================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart, TrendingUp, Calendar, FileText, Pill, Upload,
  Video, Bot, Activity, ArrowRight, CheckCircle, Clock,
  Droplets, ChevronRight, Sparkles,
} from 'lucide-react';
import Link from 'next/link';

// ── Animation Variants ──────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ── Mock Data ───────────────────────────────────────────────────────────────

const healthScore = 88;

const healthActivity = [
  { id: '1', icon: Activity, color: 'var(--secondary)', title: 'Evening Jogging Session completed', desc: '5.4 km in 32 mins • Heart rate peak 145 bpm', time: 'Yesterday, 6:30 PM' },
  { id: '2', icon: Droplets, color: 'var(--primary)', title: 'Annual Flu Shot administered', desc: 'Administered by Dr. Sarah Collins at City General', time: 'Oct 18, 2023, 9:00 AM' },
  { id: '3', icon: Heart, color: 'var(--error)', title: 'Blood Pressure Check', desc: 'Reading: 120/80 mmHg [Perfectly normal range]', time: 'Oct 12, 2023, 09:15 AM' },
];

const reports = [
  { id: '1', name: 'Blood_Test_Sept_2023.pdf', size: '2.4 MB', date: 'Sep 26, 2023' },
  { id: '2', name: 'MRI_Brain_Scan_Results.zip', size: '15.8 MB', date: 'Aug 12, 2023' },
];

const upcomingAppts = [
  { id: '1', date: '21', month: 'OCT', doctor: 'Dr. Robert Chen', specialty: 'Cardiology Checkup', time: '10:30 AM', type: 'ONLINE SESSION' },
  { id: '2', date: '25', month: 'OCT', doctor: 'Physiotherapy', specialty: 'Wellness Center', time: '12:00 PM', type: 'IN-PERSON' },
];

const reminders = [
  { id: '1', name: 'Atorvastatin', detail: 'After breakfast • 10mg', taken: true },
  { id: '2', name: 'Vitamin D3', detail: 'During lunch • 2000 IU', taken: false },
];

import { useAuthStore } from '@/store/authStore';

// ── Page Component ──────────────────────────────────────────────────────────

export default function PatientDashboard() {
  const user = useAuthStore((state) => state.user);
  
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <motion.div
      className="space-y-8 max-w-6xl"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* ── Greeting & Book Button ──────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">
            {greeting}, <br className="sm:hidden" />{user ? user.firstName : 'Guest'}
          </h1>
          <p className="text-[var(--on-surface-variant)] mt-1">
            Here is what&apos;s happening with your health today.
          </p>
        </div>
        <Link href="/patient/appointments" className="self-start px-6 py-3 gradient-primary text-white font-bold rounded-xl shadow-lg shadow-[var(--primary)]/15 hover:scale-[1.02] transition-transform flex items-center gap-2" id="book-appointment-btn">
          <Calendar size={18} aria-hidden="true" />
          Book Appointment
        </Link>
      </motion.div>

      {/* ── Health Score Card ───────────────────────────────────────── */}
      <motion.div variants={fadeInUp}>
        <div className="bg-[var(--surface-container-lowest)] rounded-[2rem] p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1 space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-bold uppercase rounded-full">
                Overall Health
              </span>
              <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">
                Excellent
              </h2>
              <p className="text-sm text-[var(--on-surface-variant)]">
                Your vital signs are within optimal range for your age and activity level.
              </p>
              <p className="flex items-center gap-1 text-sm text-[var(--secondary)] font-medium">
                <TrendingUp size={14} aria-hidden="true" /> +4% from last month
              </p>
            </div>
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-container-high)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42 * healthScore / 100} ${2 * Math.PI * 42}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--secondary)]">{healthScore}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Vital Cards Grid ───────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Heart Rate */}
        <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-5 shadow-sm card-interactive">
          <div className="flex items-center justify-between mb-3">
            <Heart size={20} className="text-[var(--error)]" aria-hidden="true" />
            <span className="text-xs text-[var(--on-surface-variant)]">BPM</span>
          </div>
          <p className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">72</p>
          <div className="flex gap-1 mt-3" aria-hidden="true">
            {['bg-[var(--secondary)]', 'bg-[var(--secondary)]', 'bg-[var(--error)]', 'bg-[var(--error)]', 'bg-[var(--secondary)]'].map((c, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${c} opacity-60`} />
            ))}
          </div>
        </div>

        {/* BMI */}
        <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-5 shadow-sm card-interactive">
          <p className="text-xs text-[var(--on-surface-variant)] mb-1">BMI</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">22.4</span>
            <span className="text-xs text-[var(--secondary)] font-bold uppercase badge-stable px-2 py-0.5 rounded-full">Normal</span>
          </div>
        </div>

        {/* BMR */}
        <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-5 shadow-sm card-interactive">
          <p className="text-xs text-[var(--on-surface-variant)] mb-1">BMR</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">1,640</span>
            <span className="text-xs text-[var(--on-surface-variant)]">KCAL/DAY</span>
          </div>
        </div>
      </motion.div>

      {/* ── Health Activity Timeline ───────────────────────────────── */}
      <motion.div variants={fadeInUp}>
        <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Health Activity</h3>
            <button className="text-sm text-[var(--primary)] font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {healthActivity.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon size={16} style={{ color: item.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--on-surface)]">{item.title}</p>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">{item.desc}</p>
                  <p className="text-xs text-[var(--on-surface-variant)]/60 mt-1 uppercase">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Reports & Upcoming Row ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <motion.div variants={fadeInUp}>
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Recent Reports</h3>
              <button className="flex items-center gap-1 text-sm text-[var(--primary)] font-semibold px-3 py-1.5 bg-[var(--primary)]/10 rounded-lg hover:bg-[var(--primary)]/20 transition-colors" id="upload-report-btn">
                <Upload size={14} aria-hidden="true" /> Upload New
              </button>
            </div>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--surface-container)] transition-colors group cursor-pointer">
                  <div className="w-10 h-10 bg-[var(--error)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[var(--error)]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--on-surface)] truncate">{report.name}</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">{report.size} • {report.date}</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--on-surface-variant)] group-hover:text-[var(--primary)] transition-colors" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div variants={fadeInUp}>
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm h-full">
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)] mb-5">Upcoming</h3>
            <div className="space-y-4">
              {upcomingAppts.map((appt) => (
                <div key={appt.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[var(--surface-container)] transition-colors">
                  <div className="text-center flex-shrink-0">
                    <p className="text-[10px] uppercase text-[var(--on-surface-variant)] font-medium">{appt.month}</p>
                    <p className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">{appt.date}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--on-surface)]">{appt.doctor}</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">{appt.specialty} • {appt.time}</p>
                    <span className={`inline-block mt-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${appt.type === 'ONLINE SESSION' ? 'badge-info' : 'badge-stable'}`}>
                      {appt.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Reminders ──────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp}>
        <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Pill size={20} className="text-[var(--primary)]" aria-hidden="true" />
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Reminders</h3>
          </div>
          <div className="space-y-3">
            {reminders.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--surface-container)] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${r.taken ? 'bg-[var(--secondary)]' : 'bg-[var(--primary)]'}`}>
                    <Pill size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--on-surface)]">{r.name}</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">{r.detail}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer ${r.taken ? 'bg-[var(--secondary)] border-[var(--secondary)]' : 'border-[var(--outline-variant)]'}`} role="checkbox" aria-checked={r.taken} aria-label={`${r.name} ${r.taken ? 'taken' : 'not taken'}`}>
                  {r.taken && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>
            ))}
            <div className="mt-2 p-3 bg-[var(--secondary)]/10 rounded-xl">
              <p className="text-sm font-semibold text-[var(--secondary)]">
                <Droplets size={14} className="inline mr-1" aria-hidden="true" />
                DRINK WATER
              </p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Goal: 2.5L today. You&apos;ve had 1.2L.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── AI Assistant FAB ───────────────────────────────────────── */}
      <motion.a
        href="/ai-assistant"
        className="fixed bottom-8 right-8 w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-xl shadow-[var(--primary)]/30 hover:scale-110 transition-transform z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        aria-label="Open AI Health Assistant"
        id="ai-assistant-fab"
      >
        <Sparkles size={24} className="text-white" />
      </motion.a>
    </motion.div>
  );
}
