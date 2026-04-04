// ============================================================================
// HealthSphere AI — Register Page
// Multi-step registration with role selection
// ============================================================================

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone,
  Stethoscope, Shield, CheckCircle, Globe,
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const roles = [
  { value: 'PATIENT', label: 'Patient', icon: User, desc: 'Track health & manage appointments', color: 'var(--primary)' },
  { value: 'DOCTOR', label: 'Doctor', icon: Stethoscope, desc: 'Manage patients & prescriptions', color: 'var(--secondary)' },
  { value: 'ADMIN', label: 'Administrator', icon: Shield, desc: 'Hospital management & analytics', color: 'var(--tertiary)' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password)) {
      setError('Password must include uppercase, lowercase, number, and special character.');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const route = form.role === 'DOCTOR' ? '/doctor' : form.role === 'ADMIN' ? '/admin' : '/patient';
    router.push(route);
  };

  const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="text-2xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight">
            HealthSphere AI
          </Link>
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-[family-name:var(--font-headline)] font-bold leading-tight">
              Join the clinical revolution.
            </h2>
            <p className="text-white/70 text-lg">
              Create your account and access AI-powered healthcare tools trusted by 12,000+ medical professionals.
            </p>
            <div className="space-y-3">
              {['HIPAA-compliant data storage', 'AI diagnostic assistance', '24/7 telemedicine support'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} HealthSphere AI</p>
        </div>
      </div>

      {/* ── Right Panel — Form ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[var(--surface)] overflow-y-auto">
        <motion.div className="w-full max-w-md space-y-6" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="lg:hidden text-center">
            <span className="text-2xl font-[family-name:var(--font-headline)] font-extrabold text-[var(--primary)]">HealthSphere AI</span>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Create Account</h1>
            <p className="text-[var(--on-surface-variant)] mt-1">Fill in your details to get started.</p>
          </motion.div>

          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-[var(--error-container)] text-[var(--error)] text-sm rounded-xl font-medium" role="alert">{error}</div>
            )}

            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-[var(--on-surface)] block mb-2">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => updateForm('role', role.value)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      form.role === role.value
                        ? 'ring-2 ring-[var(--primary)] bg-[var(--primary)]/5'
                        : 'bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)]'
                    }`}
                    aria-pressed={form.role === role.value}
                    id={`role-${role.value.toLowerCase()}-btn`}
                  >
                    <role.icon size={20} className="mx-auto mb-1" style={{ color: role.color }} />
                    <p className="text-xs font-bold text-[var(--on-surface)]">{role.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="reg-first-name" className="text-sm font-medium text-[var(--on-surface)] block mb-1">First Name</label>
                <input id="reg-first-name" type="text" value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)} placeholder="Aris" className="w-full px-4 py-3 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20" required />
              </div>
              <div>
                <label htmlFor="reg-last-name" className="text-sm font-medium text-[var(--on-surface)] block mb-1">Last Name</label>
                <input id="reg-last-name" type="text" value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)} placeholder="Patel" className="w-full px-4 py-3 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="text-sm font-medium text-[var(--on-surface)] block mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-hidden="true" />
                <input id="reg-email" type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="you@healthsphere.ai" className="w-full pl-12 pr-4 py-3 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20" required />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="reg-phone" className="text-sm font-medium text-[var(--on-surface)] block mb-1">Phone <span className="text-[var(--on-surface-variant)]">(optional)</span></label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-hidden="true" />
                <input id="reg-phone" type="tel" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-3 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="text-sm font-medium text-[var(--on-surface)] block mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-hidden="true" />
                <input id="reg-password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => updateForm('password', e.target.value)} placeholder="Min 8 chars, upper, lower, number, special" className="w-full pl-12 pr-12 py-3 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-label={showPassword ? 'Hide' : 'Show'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm-password" className="text-sm font-medium text-[var(--on-surface)] block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" aria-hidden="true" />
                <input id="reg-confirm-password" type="password" value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)} placeholder="Re-enter password" className="w-full pl-12 pr-4 py-3 bg-[var(--surface-container)] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20" required minLength={8} />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-4 gradient-primary text-white font-bold rounded-xl shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.01] transition-transform disabled:opacity-60 flex items-center justify-center gap-2" id="register-submit-btn">
              {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight size={18} /></>}
            </button>

            <button type="button" className="w-full py-3 bg-[var(--surface-container-lowest)] text-[var(--on-surface)] font-semibold rounded-xl shadow-sm hover:bg-[var(--surface-container)] transition-colors flex items-center justify-center gap-3 text-sm">
              <Globe size={20} className="text-[var(--primary)]" />
              Continue with Google
            </button>
          </motion.form>

          <motion.p variants={fadeInUp} className="text-center text-sm text-[var(--on-surface-variant)]">
            Already have an account?{' '}
            <Link href="/login" className="text-[var(--primary)] font-bold hover:underline">Sign In</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
