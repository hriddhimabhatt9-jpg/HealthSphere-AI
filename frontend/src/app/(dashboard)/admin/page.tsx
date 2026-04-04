// ============================================================================
// HealthSphere AI — Admin Dashboard
// Hospital performance overview with analytics and management tools
// ============================================================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Stethoscope, Calendar, AlertTriangle, TrendingUp,
  TrendingDown, BarChart3, Building2, Download, Clock,
  Award, ChevronRight, Activity,
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

const statsCards = [
  { label: 'Total Patients', value: '12,842', icon: Users, change: '+12.5%', changeType: 'up' as const, sub: 'from last month', color: 'var(--primary)', bgColor: 'var(--primary-fixed)' },
  { label: 'Active Doctors', value: '154', icon: Stethoscope, change: null, changeType: null, sub: 'OPERATIONAL', color: 'var(--secondary)', bgColor: 'var(--secondary-container)' },
  { label: 'Daily Appointments', value: '412', icon: Calendar, change: '+3.1%', changeType: 'up' as const, sub: 'vs yesterday', color: 'var(--primary)', bgColor: 'var(--primary-fixed)' },
  { label: 'Emergency Rate', value: '4.2%', icon: AlertTriangle, change: null, changeType: null, sub: 'CRITICAL FOCUS', color: 'var(--error)', bgColor: 'var(--error-container)' },
];

const admissionData = [
  { month: 'Jan', value: 1200 },
  { month: 'Feb', value: 1350 },
  { month: 'Mar', value: 1100 },
  { month: 'Apr', value: 1450 },
  { month: 'May', value: 1600 },
  { month: 'Jun', value: 1400 },
];

const doctors = [
  { name: 'Dr. James Wilson', spec: 'Neurosurgeon', status: 'Available', avatar: null },
  { name: 'Dr. Elena Rodriguez', spec: 'Cardiologist', status: 'Available', avatar: null },
  { name: 'Dr. Michael Chen', spec: 'Pediatrician', status: 'Off-duty', avatar: null },
];

const diseaseTrends = [
  { name: 'Influenza A', detail: 'Seasonal Spike', trend: 24, up: true },
  { name: 'Asthma Relapse', detail: 'Quarterly Trend', trend: -8, up: false },
  { name: 'Cardio Issues', detail: 'Increased Testing', trend: 12, up: true },
];

import { useAuthStore } from '@/store/authStore';

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <motion.div className="space-y-8 max-w-7xl" initial="hidden" animate="visible" variants={stagger}>
      {/* ── Page Title ─────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl lg:text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">
          Welcome, {user ? user.firstName : 'Admin'}
        </h1>
        <p className="text-[var(--on-surface-variant)] mt-1">
          Hospital Performance Overview and real-time clinical intelligence.
        </p>
      </motion.div>

      {/* ── Stats Cards ────────────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div key={card.label} className="bg-[var(--surface-container-lowest)] rounded-2xl p-5 shadow-sm card-interactive">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-[var(--on-surface-variant)] font-medium">{card.label}</p>
                <p className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)] mt-1">{card.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bgColor }}>
                <card.icon size={20} style={{ color: card.color }} aria-hidden="true" />
              </div>
            </div>
            {card.change ? (
              <p className="text-xs text-[var(--on-surface-variant)]">
                <span className="text-[var(--secondary)] font-bold">{card.change}</span> {card.sub}
              </p>
            ) : (
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${card.sub === 'OPERATIONAL' ? 'badge-stable' : 'badge-critical'}`}>
                {card.sub}
              </span>
            )}
          </div>
        ))}
      </motion.div>

      {/* ── Charts Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admission Trends */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold">Patient Admission Trends</h3>
                <p className="text-xs text-[var(--on-surface-variant)]">Aggregated data across all specialties</p>
              </div>
              <select className="text-xs bg-[var(--surface-container)] rounded-lg px-3 py-1.5 border-none outline-none" aria-label="Time period">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex items-end gap-3 h-48">
              {admissionData.map((item, i) => {
                const maxVal = Math.max(...admissionData.map(d => d.value));
                const pct = (item.value / maxVal) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full bg-[var(--primary)] rounded-t-md"
                      style={{ opacity: 0.3 + pct / 100 * 0.7 }}
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    />
                    <span className="text-[10px] text-[var(--on-surface-variant)] font-medium">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Doctor Directory */}
        <motion.div variants={fadeInUp}>
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold">Doctor Directory</h3>
              <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                <Stethoscope size={16} className="text-[var(--primary)]" aria-hidden="true" />
              </div>
            </div>
            <p className="text-[10px] text-[var(--on-surface-variant)] uppercase tracking-wider font-medium mb-3">Specialist</p>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <div key={doc.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--surface-container)] transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--on-surface)]">{doc.name}</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">{doc.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Disease Trends & Efficiency ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Trends */}
        <motion.div variants={fadeInUp}>
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold mb-5">Disease Trends</h3>
            <div className="space-y-4">
              {diseaseTrends.map((disease) => (
                <div key={disease.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity size={16} className="text-[var(--on-surface-variant)]" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-[var(--on-surface)]">{disease.name}</p>
                      <p className="text-xs text-[var(--on-surface-variant)]">{disease.detail}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold flex items-center gap-1 ${disease.up ? 'text-[var(--error)]' : 'text-[var(--secondary)]'}`}>
                    {disease.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {disease.up ? '+' : ''}{disease.trend}%
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full py-2.5 bg-[var(--surface-container)] rounded-xl text-sm font-semibold text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] transition-colors flex items-center justify-center gap-2" id="download-report-btn">
              <Download size={16} aria-hidden="true" /> Download Epidemiological Report
            </button>
          </div>
        </motion.div>

        {/* Efficiency Score */}
        <motion.div variants={fadeInUp}>
          <div className="gradient-primary rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-[family-name:var(--font-headline)] font-bold mb-2">Efficiency Score</h3>
            <p className="text-sm opacity-80 mb-6">Quarterly Hospital Performance</p>
            <div className="flex items-center gap-8">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${2 * Math.PI * 42 * 0.92} ${2 * Math.PI * 42}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-[family-name:var(--font-headline)] font-extrabold">92</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} aria-hidden="true" />
                  <span className="text-sm font-bold">Excellent Rating</span>
                </div>
                <p className="text-xs opacity-80">Top 5% of Network Facilities</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Bed Occupancy</span>
                  <span className="font-bold">84%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ delay: 0.5, duration: 0.8 }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-2.5 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors" id="view-map-btn">Map View</button>
              <button className="flex-1 py-2.5 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">Details</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Admin Schedule ──────────────────────────────────────────── */}
      <motion.div variants={fadeInUp}>
        <div className="gradient-primary rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} aria-hidden="true" />
            <h3 className="font-[family-name:var(--font-headline)] font-bold">Staff Town Hall</h3>
          </div>
          <p className="text-sm opacity-80 mb-1">Updates on diagnostics scheduled for tomorrow at 08:00 AM</p>
          <p className="text-xs bg-white/10 px-3 py-1.5 rounded-full inline-block mt-2">
            <Clock size={12} className="inline mr-1" aria-hidden="true" />
            Next Live Review: <strong>Friday, Oct 24 — 02:15 PM via Video Call</strong>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
