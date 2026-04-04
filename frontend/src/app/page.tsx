// ============================================================================
// HealthSphere AI — Landing Page
// Premium healthcare platform landing with glassmorphism and animations
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bot,
  Video,
  Activity,
  BarChart3,
  Shield,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Heart,
} from 'lucide-react';

// ── Animation Variants ──────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── Feature Data ────────────────────────────────────────────────────────────

const features = [
  {
    icon: Bot,
    title: 'AI Health Assistant',
    description: 'Personalized health insights powered by large medical models. Available 24/7 for symptom triage and preventive advice.',
    color: 'var(--primary)',
    bgColor: 'rgba(0, 61, 155, 0.1)',
    span: 'col-span-1 md:col-span-2',
  },
  {
    icon: Video,
    title: 'HD Telemedicine',
    description: 'Crystal clear virtual consultations with encrypted data streams for total privacy.',
    color: 'var(--secondary)',
    bgColor: 'rgba(0, 110, 40, 0.1)',
    span: 'col-span-1',
  },
  {
    icon: Activity,
    title: 'Physiotherapy Tracking',
    description: 'Real-time motion tracking and posture correction using just your device camera.',
    color: 'var(--tertiary)',
    bgColor: 'rgba(123, 38, 0, 0.1)',
    span: 'col-span-1',
  },
  {
    icon: BarChart3,
    title: 'Predictive Diagnostics',
    description: 'Identify risks before they become emergencies. Our models analyze longitudinal data to forecast potential health trends.',
    color: '#ffffff',
    bgColor: 'transparent',
    span: 'col-span-1 md:col-span-2',
    gradient: true,
  },
];

const stats = [
  { value: '12,000+', label: 'Medical Professionals' },
  { value: '94%', label: 'Diagnostic Accuracy' },
  { value: '2.4M', label: 'Data Points Analyzed' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const testimonials = [
  {
    quote: "The clarity HealthSphere brings to our clinical workflow is unparalleled. It's not just a tool; it's like having a team of experts whispering insights in your ear.",
    author: 'Dr. Sarah Chen',
    role: 'Chief of Medicine, Global Health Institute',
    rating: 5,
  },
  {
    quote: 'We reduced our average patient wait time by 40% within the first month. The AI-driven queue management is revolutionary.',
    author: 'Dr. Rajesh Kumar',
    role: 'Hospital Administrator, Apollo Medical',
    rating: 5,
  },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card-strong">
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className="text-xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight text-[var(--primary)]">
            HealthSphere AI
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-sm font-medium text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">Testimonials</a>
            <a href="#stats" className="text-sm font-medium text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">Technology</a>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-md shadow-[var(--primary)]/20"
            >
              Launch Platform
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-container)]" aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16" aria-label="Hero">
        {/* Background effects */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[var(--primary)]/5 blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[60%] rounded-full bg-[var(--secondary)]/5 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider rounded-full"
            >
              <Zap size={14} aria-hidden="true" />
              Next-Gen Clinical Intelligence
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-[family-name:var(--font-headline)] font-extrabold text-[var(--on-surface)] leading-[1.1] tracking-tight"
            >
              Intelligence for a{' '}
              <span className="text-[var(--primary)]">Healthier Life</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-[var(--on-surface-variant)] max-w-xl leading-relaxed"
            >
              Experience the sanctuary of modern healthcare. Our AI-driven platform
              harmonizes clinical precision with seamless telemedicine, predictive
              diagnostics, and physiotherapy monitoring.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="px-8 py-4 gradient-primary text-white font-bold rounded-xl shadow-xl shadow-[var(--primary)]/20 hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <button className="px-8 py-4 bg-[var(--surface-container-high)] text-[var(--on-surface)] font-bold rounded-xl hover:bg-[var(--surface-container-highest)] transition-colors inline-flex items-center gap-2">
                <Play size={18} aria-hidden="true" />
                Watch Overview
              </button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="pt-4 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[var(--surface)] bg-gradient-to-br from-[var(--primary-fixed-dim)] to-[var(--primary-fixed)] flex items-center justify-center"
                  >
                    <Users size={14} className="text-[var(--primary)]" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-[var(--on-surface-variant)]">
                Trusted by <span className="text-[var(--on-surface)] font-bold">12,000+</span> medical professionals
              </p>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-[var(--primary)]/10 rounded-3xl blur-3xl transform rotate-3" aria-hidden="true" />
            <div className="relative glass-card p-6 rounded-[2rem] shadow-2xl overflow-hidden">
              {/* Dashboard Preview */}
              <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-medium">Overall Health</p>
                    <p className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Excellent</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-[var(--secondary)] flex items-center justify-center">
                    <span className="text-lg font-[family-name:var(--font-headline)] font-bold text-[var(--secondary)]">88</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Heart Rate', value: '72', unit: 'BPM', color: 'var(--error)' },
                    { label: 'BMI', value: '22.4', unit: 'Normal', color: 'var(--secondary)' },
                    { label: 'BMR', value: '1,640', unit: 'kcal', color: 'var(--primary)' },
                  ].map((metric) => (
                    <div key={metric.label} className="bg-[var(--surface-container)] rounded-xl p-3 text-center">
                      <p className="text-xs text-[var(--on-surface-variant)]">{metric.label}</p>
                      <p className="text-lg font-[family-name:var(--font-headline)] font-bold" style={{ color: metric.color }}>
                        {metric.value}
                      </p>
                      <p className="text-[10px] text-[var(--on-surface-variant)]">{metric.unit}</p>
                    </div>
                  ))}
                </div>

                {/* Mini chart bars */}
                <div className="flex items-end gap-1.5 h-12 mt-2">
                  {[40, 65, 45, 80, 55, 72, 60, 85, 50, 70, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-[var(--primary)] rounded-t-sm"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                      style={{ opacity: 0.3 + (h / 100) * 0.7 }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating AI card */}
              <motion.div
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 p-4 glass-card-strong rounded-2xl shadow-lg flex items-center gap-3 max-w-[200px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-[var(--secondary-container)] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} className="text-[var(--on-secondary-container)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-[var(--secondary)]">AI Scan Complete</p>
                  <p className="text-xs font-medium text-[var(--on-surface)]">99.8% Accuracy</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Bento Grid ────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-[var(--surface-container-low)]" aria-label="Features">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)] tracking-tight"
            >
              The Ecosystem of Care
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[var(--on-surface-variant)] max-w-2xl mx-auto text-lg"
            >
              Seamlessly integrated tools designed to elevate the clinical experience
              and improve patient outcomes.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className={`${feature.span} ${
                  feature.gradient
                    ? 'gradient-primary text-white'
                    : 'bg-[var(--surface-container-lowest)]'
                } p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group`}
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: feature.gradient ? 'rgba(255,255,255,0.15)' : feature.bgColor }}
                  >
                    <feature.icon size={24} style={{ color: feature.color }} aria-hidden="true" />
                  </div>
                  <h3
                    className={`text-2xl font-[family-name:var(--font-headline)] font-bold ${
                      feature.gradient ? '' : 'text-[var(--on-surface)]'
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${feature.gradient ? 'opacity-90' : 'text-[var(--on-surface-variant)]'}`}>
                    {feature.description}
                  </p>
                  {!feature.gradient && (
                    <span className="inline-flex items-center text-[var(--primary)] font-bold gap-2 group-hover:translate-x-2 transition-transform text-sm">
                      Learn more <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  )}
                </div>

                {feature.gradient && (
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                      <p className="text-2xl font-[family-name:var(--font-headline)] font-bold">94%</p>
                      <p className="text-xs font-medium uppercase tracking-widest opacity-70">Accuracy</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                      <p className="text-2xl font-[family-name:var(--font-headline)] font-bold">2.4M</p>
                      <p className="text-xs font-medium uppercase tracking-widest opacity-70">Data Points</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────────────────────────────── */}
      <section id="stats" className="py-16 bg-[var(--surface)]" aria-label="Platform statistics">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <p className="text-3xl lg:text-4xl font-[family-name:var(--font-headline)] font-extrabold text-[var(--primary)]">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--on-surface-variant)] mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 bg-[var(--surface-container-low)]" aria-label="Testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)] tracking-tight">
              Voices of Precision
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={scaleIn}
                className="p-8 glass-card rounded-3xl relative"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-lg text-[var(--on-surface)] leading-relaxed italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--on-surface)]">{testimonial.author}</p>
                    <p className="text-sm text-[var(--on-surface-variant)]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Multi-Language Support ──────────────────────────────────────── */}
      <section className="py-16 bg-[var(--surface)]" aria-label="Multi-language support">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-bold uppercase tracking-wider rounded-full">
              <Globe size={14} aria-hidden="true" />
              Available in 5 Languages
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {['English', 'हिन्दी', 'ગુજરાતી', 'தமிழ்', 'বাংলা'].map((lang) => (
                <span
                  key={lang}
                  className="px-6 py-3 bg-[var(--surface-container-lowest)] rounded-xl text-sm font-medium text-[var(--on-surface)] shadow-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────── */}
      <section className="py-24" aria-label="Call to action">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="bg-[var(--inverse-surface)] text-[var(--inverse-on-surface)] py-16 px-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 gradient-radial-primary" aria-hidden="true" />
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-headline)] font-bold relative z-10">
              Start Your Clinical Evolution
            </h2>
            <p className="text-[var(--surface-container-high)]/70 max-w-xl mx-auto relative z-10 text-lg">
              Join thousands of clinics redefining the standard of care with HealthSphere AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/login"
                className="px-10 py-5 bg-[var(--primary)] text-white font-bold rounded-2xl hover:scale-105 transition-transform inline-block"
              >
                Get Started Now
              </Link>
              <button className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10">
                Talk to Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-[var(--surface-container-low)] pt-24 pb-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
            <div className="space-y-6">
              <span className="text-2xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight text-[var(--primary)]">
                HealthSphere AI
              </span>
              <p className="text-[var(--on-surface-variant)] text-sm leading-relaxed">
                Leading the future of digital health through clinical intelligence and atmospheric design.
              </p>
            </div>

            {[
              { title: 'Platform', links: ['AI Health Assistant', 'Telemedicine', 'Diagnostics', 'Security'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'API Docs', 'Community', 'Status'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)] mb-6">{col.title}</h4>
                <ul className="space-y-4 text-sm text-[var(--on-surface-variant)]" role="list">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-[var(--primary)] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-[var(--outline-variant)]/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-[var(--on-surface-variant)]">
              © {new Date().getFullYear()} HealthSphere AI. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs text-[var(--on-surface-variant)]">
              <a href="#" className="hover:text-[var(--primary)]">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--primary)]">Terms of Service</a>
              <a href="#" className="hover:text-[var(--primary)]">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
