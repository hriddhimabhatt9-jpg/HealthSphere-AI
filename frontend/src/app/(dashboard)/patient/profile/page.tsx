'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Mail, Phone, MapPin, Activity, Shield } from 'lucide-react';

export default function PatientProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">My Profile</h1>
        <button className="px-4 py-2 border border-[var(--outline)] rounded-xl text-sm font-semibold hover:bg-[var(--surface-container)]">Edit Profile</button>
      </div>

      <div className="glass-card-strong p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <div className="w-32 h-32 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] rounded-full shadow-xl flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
          {user ? `${user.firstName[0]}${user.lastName?.[0] || ''}` : 'U'}
        </div>
        <div className="flex-1 text-center sm:text-left space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--on-surface)]">{user ? `${user.firstName} ${user.lastName}` : 'User Name'}</h2>
            <p className="text-[var(--primary)] font-medium">Patient</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--outline-variant)]/20">
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <Mail size={16} className="text-[var(--on-surface)]" />
              {user?.email || 'patient@example.com'}
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <Phone size={16} className="text-[var(--on-surface)]" />
              +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <MapPin size={16} className="text-[var(--on-surface)]" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <span className="font-bold text-[var(--on-surface)] w-4 text-center">A+</span>
              Blood Group
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Activity size={18} className="text-[var(--secondary)]" /> Medical Summary</h3>
          <ul className="space-y-3 text-sm text-[var(--on-surface-variant)]">
            <li className="flex justify-between"><span>Allergies</span><span className="font-semibold text-[var(--on-surface)]">Penicillin</span></li>
            <li className="flex justify-between"><span>Weight</span><span className="font-semibold text-[var(--on-surface)]">72 kg</span></li>
            <li className="flex justify-between"><span>Height</span><span className="font-semibold text-[var(--on-surface)]">175 cm</span></li>
          </ul>
        </div>
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Shield size={18} className="text-[var(--primary)]" /> Emergency Contact</h3>
          <div className="space-y-1">
            <p className="font-semibold text-[var(--on-surface)]">Sarah Connor</p>
            <p className="text-sm text-[var(--on-surface-variant)]">Relationship: Spouse</p>
            <p className="text-sm text-[var(--on-surface-variant)]">+1 (555) 987-6543</p>
          </div>
        </div>
      </div>
    </div>
  );
}
