'use client';

import React from 'react';
import { Settings2, Shield, Users, Server, HardDrive, Cpu } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Global Configuration</h1>
        <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage core system parameters and security policies.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card-strong p-6 rounded-2xl border border-[var(--outline-variant)]/20 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Shield size={20} className="text-[var(--primary)]" /> Security Policies</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[var(--surface-container)] rounded-xl">
                <div>
                  <h3 className="font-bold text-sm">Enforce 2FA for Medical Staff</h3>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Require all Doctors and Admins to use OTP generators.</p>
                </div>
                <div className="w-12 h-6 bg-[var(--primary)] rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[var(--surface-container)] rounded-xl">
                <div>
                  <h3 className="font-bold text-sm">Patient Data Encryption Type</h3>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Database level encryption algorithm.</p>
                </div>
                <select className="bg-transparent border border-[var(--outline)] rounded-lg px-2 py-1 text-sm outline-none">
                  <option>AES-256</option>
                  <option>ChaCha20</option>
                </select>
              </div>
            </div>
            <div className="pt-2">
              <button className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-bold text-sm">Save Policies</button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2"><Users size={20} className="text-[var(--secondary)]" /> Default Roles & Permissions</h2>
            <p className="text-sm text-[var(--on-surface-variant)]">Module functionality configuration for roles is maintained via the RBAC panel. Launching the RBAC tool is required.</p>
            <button className="px-4 py-2 border border-[var(--outline)] rounded-lg text-sm font-semibold hover:bg-[var(--surface-container)] transition-colors">
              Launch RBAC Interface
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl bg-[var(--surface-container-lowest)] text-center w-full">
             <div className="w-16 h-16 mx-auto bg-[var(--error-container)] rounded-full flex items-center justify-center text-[var(--error)] mb-3">
               <Cpu size={32} />
             </div>
             <h3 className="font-bold text-lg text-[var(--on-surface)]">System Load</h3>
             <p className="text-4xl font-black text-[var(--error)] mt-2">42%</p>
             <p className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] tracking-widest mt-1">CPU Utilization</p>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-[var(--surface-container-lowest)] space-y-4">
            <h3 className="font-bold text-sm flex items-center gap-2"><Server size={16} /> Backend Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--on-surface-variant)]">Main Database</span>
                <span className="text-[var(--secondary)] font-bold">Online</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--on-surface-variant)]">Redis Cache</span>
                <span className="text-[var(--secondary)] font-bold">Online</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--on-surface-variant)]">Video Signaling</span>
                <span className="text-[var(--error)] font-bold">Degraded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
