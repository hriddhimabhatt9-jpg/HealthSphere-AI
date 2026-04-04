// ============================================================================
// HealthSphere AI — Login Page
// Premium authentication with role-based demo login
// ============================================================================

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Globe,
  Stethoscope, User, Shield, Sparkles,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const demoAccounts = [
  { label: 'Patient', email: 'patient@healthsphere.ai', role: 'PATIENT', icon: User, color: 'var(--primary)', route: '/patient' },
  { label: 'Doctor', email: 'doctor@healthsphere.ai', role: 'DOCTOR', icon: Stethoscope, color: 'var(--secondary)', route: '/doctor' },
  { label: 'Admin', email: 'admin@healthsphere.ai', role: 'ADMIN', icon: Shield, color: 'var(--tertiary)', route: '/admin' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    const demo = demoAccounts.find((d) => d.email === email);
    if (demo && password === 'Password@123') {
      router.push(demo.route);
    } else if (email && password.length >= 8) {
      router.push('/patient');
    } else {
      setError('Invalid credentials. Try a demo account below.');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword('Password@123');
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    router.push(account.route);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel — Branding ──────────────────────────────────── */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="text-2xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight">
            HealthSphere AI
          </Link>

          <div className="space-y-8 max-w-md">
            <h2 className="text-4xl font-[family-name:var(--font-headline)] font-bold leading-tight">
              Welcome back to the future of healthcare.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Access your clinical dashboard, manage patients, and leverage AI-powered diagnostics — all in one secure platform.
            </p>

            <div className="space-y-4">
              {[
                { icon: Shield, text: 'HIPAA-Compliant Security', desc: 'End-to-end encryption' },
                { icon: Sparkles, text: 'AI-Powered Insights', desc: 'Real-time diagnostics' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{feature.text}</p>
                    <p className="text-xs text-white/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} HealthSphere AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right Panel — Login Form ───────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[var(--surface)]">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Mobile logo */}
          <motion.div variants={fadeInUp} className="lg:hidden text-center">
            <span className="text-2xl font-[family-name:var(--font-headline)] font-extrabold text-[var(--primary)]">HealthSphere AI</span>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Sign In</h1>
            <p className="text-[var(--on-surface-variant)] mt-2">
              Enter your credentials to access your dashboard.
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form variants={fadeInUp} onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-[var(--error-container)] text-[var(--error)] text-sm rounded-xl font-medium" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="text-sm font-medium text-[var(--on-surface)] block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@healthsphere.ai"
                  className="w-full pl-12 pr-4 py-3.5 bg-[var(--surface-container)] rounded-xl text-sm text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/50 border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="text-sm font-medium text-[var(--on-surface)] block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-[var(--surface-container)] rounded-xl text-sm text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/50 border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                  required
                  minLength={8}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[var(--primary)]" />
                <span className="text-[var(--on-surface-variant)]">Remember me</span>
              </label>
              <a href="#" className="text-[var(--primary)] font-semibold hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 gradient-primary text-white font-bold rounded-xl shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              id="login-submit-btn"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>

            {/* Google OAuth */}
            <button
              type="button"
              className="w-full py-3.5 bg-[var(--surface-container-lowest)] text-[var(--on-surface)] font-semibold rounded-xl shadow-sm hover:bg-[var(--surface-container)] transition-colors flex items-center justify-center gap-3 text-sm"
              id="google-login-btn"
            >
              <Globe size={20} className="text-[var(--primary)]" />
              Continue with Google
            </button>
          </motion.form>

          {/* Demo Accounts */}
          <motion.div variants={fadeInUp} className="pt-4">
            <p className="text-xs text-[var(--on-surface-variant)] text-center mb-3 uppercase tracking-widest font-medium">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-3 gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  onClick={() => handleDemoLogin(account)}
                  className="p-3 bg-[var(--surface-container-lowest)] rounded-xl shadow-sm hover:shadow-md transition-all text-center group card-interactive"
                  id={`demo-${account.role.toLowerCase()}-btn`}
                >
                  <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${account.color}15` }}>
                    <account.icon size={18} style={{ color: account.color }} />
                  </div>
                  <p className="text-xs font-bold text-[var(--on-surface)]">{account.label}</p>
                  <p className="text-[10px] text-[var(--on-surface-variant)] truncate">{account.email.split('@')[0]}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Register link */}
          <motion.p variants={fadeInUp} className="text-center text-sm text-[var(--on-surface-variant)]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[var(--primary)] font-bold hover:underline">
              Create Account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
