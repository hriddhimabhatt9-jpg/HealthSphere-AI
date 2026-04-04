'use client';

import React from 'react';
import { User, Bell, Shield, Lock, CreditCard, Stethoscope } from 'lucide-react';

export default function DoctorSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Professional Settings</h1>
        <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage your clinic details, availability, and security.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {[
            { name: 'Professional Info', icon: Stethoscope },
            { name: 'Security', icon: Lock },
            { name: 'Notifications', icon: Bell },
            { name: 'Payout Details', icon: CreditCard }
          ].map((tab, idx) => (
            <button key={tab.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${idx === 0 ? 'bg-[var(--primary-container)] text-[var(--on-primary-container)] shadow-sm' : 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]'}`}>
              <tab.icon size={16} /> {tab.name}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="glass-card pl-6 pr-6 py-6 pb-8 rounded-2xl border border-[var(--outline-variant)]/20 space-y-6">
            <h2 className="text-lg font-bold">Clinic Profile</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Specialization</label>
                <input type="text" defaultValue="Cardiology" className="w-full px-3 py-2 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-lg outline-none text-sm focus:border-[var(--primary)] text-[var(--on-surface)]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Medical License ID</label>
                <input type="text" defaultValue="MED-89102-CA" disabled className="w-full px-3 py-2 bg-[var(--surface-container-highest)] border-none rounded-lg text-sm text-[var(--on-surface-variant)] cursor-not-allowed opacity-70" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--on-surface-variant)]">Bio / Credentials</label>
                <textarea rows={3} defaultValue="Board-certified cardiologist with over 15 years of experience in clinical diagnosis and preventive care." className="w-full px-3 py-2 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-lg outline-none text-sm focus:border-[var(--primary)] resize-none text-[var(--on-surface)]" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-xl font-bold shadow hover:brightness-110 transition-all">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
