'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Shield, Building, Mail, Phone, Server, Settings2 } from 'lucide-react';

export default function AdminProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Admin Profile</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Superuser account details and access levels.</p>
        </div>
        <button className="px-4 py-2 border border-[var(--outline)] rounded-xl text-sm font-semibold hover:bg-[var(--surface-container)] flex items-center gap-2">
          <Settings2 size={16} /> Manage Roles
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <div className="glass-card-strong p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start border border-[var(--outline-variant)]/20 shadow-sm relative overflow-hidden h-full">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--error-container)]/10 blur-[80px] rounded-full point-events-none" />

          <div className="w-32 h-32 bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 border-2 border-[var(--error)] relative z-10">
            <Shield size={48} className="text-[var(--error)] opacity-80 absolute" />
            <span className="relative z-10">{user ? user.firstName[0] : 'A'}</span>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4 relative z-10 w-full">
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-3xl font-bold text-[var(--on-surface)]">{user ? `${user.firstName} ${user.lastName}` : 'System Administrator'}</h2>
                <span className="flex items-center justify-center gap-1 text-xs font-bold px-2 py-1 bg-[var(--error-container)] text-[var(--error)] rounded-lg mx-auto md:mx-0 w-max">
                  God Mode
                </span>
              </div>
              <p className="text-[var(--primary)] font-semibold mt-1">System Health Coordinator</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--outline-variant)]/20">
              <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
                <Building size={16} className="text-[var(--on-surface)]" />
                Network HQ
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
                <Server size={16} className="text-[var(--on-surface)]" />
                Node ID: US-WEST-01
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)] mb-2 md:mb-0">
                <Mail size={16} className="text-[var(--on-surface)]" />
                {user?.email || 'admin@healthsphere.ai'}
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
                <Phone size={16} className="text-[var(--on-surface)]" />
                Direct: +1 800 000 0000
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-4 h-full">
          <h3 className="font-bold border-b border-[var(--outline-variant)]/20 pb-3 flex items-center gap-2">
            <Shield size={18} className="text-[var(--error)]" /> Access Limits
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center"><span className="text-[var(--on-surface-variant)]">User Data Mgmt</span><span className="w-3 h-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--surface)]"></span></li>
            <li className="flex justify-between items-center"><span className="text-[var(--on-surface-variant)]">Role Assignment</span><span className="w-3 h-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--surface)]"></span></li>
            <li className="flex justify-between items-center"><span className="text-[var(--on-surface-variant)]">System Configs</span><span className="w-3 h-3 bg-[var(--secondary)] rounded-full border-2 border-[var(--surface)]"></span></li>
            <li className="flex justify-between items-center"><span className="text-[var(--on-surface-variant)]">Database Drop (WIPE)</span><span className="w-3 h-3 bg-[var(--error)] rounded-full border-2 border-[var(--surface)]"></span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
