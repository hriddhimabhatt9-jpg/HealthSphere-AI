'use client';

import React from 'react';
import { User, Bell, Lock, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Account Settings</h1>
        <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage your preferences, security, and notifications.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {['Profile & Info', 'Notifications', 'Privacy & Security', 'Billing'].map((tab, idx) => (
            <button key={tab} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${idx === 0 ? 'bg-[var(--primary-container)] text-[var(--on-primary-container)]' : 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="glass-card-strong p-6 rounded-2xl border border-[var(--outline-variant)]/20 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <User size={18} className="text-[var(--primary)]" />
              General Information
            </h2>
            
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-[var(--primary)] to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                JD
              </div>
              <button className="px-4 py-2 text-sm border border-[var(--outline)] rounded-lg font-medium hover:bg-[var(--surface-container)] transition-colors">
                Change Photo
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">First Name</label>
                <input type="text" defaultValue="John" className="w-full px-3 py-2 bg-[var(--surface-container)] rounded-lg border-none outline-none text-sm focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full px-3 py-2 bg-[var(--surface-container)] rounded-lg border-none outline-none text-sm focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Email Address</label>
                <input type="email" defaultValue="patient@healthsphere.ai" className="w-full px-3 py-2 bg-[var(--surface-container)] rounded-lg border-none outline-none text-sm focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-md">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
