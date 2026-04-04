'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Mail, Phone, Building2, MapPin, Award, Star } from 'lucide-react';

export default function DoctorProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Doctor Profile</h1>
        <button className="px-4 py-2 border border-[var(--outline)] rounded-xl text-sm font-semibold hover:bg-[var(--surface-container)]">Settings</button>
      </div>

      <div className="glass-card-strong p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start border border-[var(--outline-variant)]/20 shadow-sm relative overflow-hidden">
        {/* Decorative Background blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[80px] rounded-full point-events-none" />

        <div className="w-32 h-32 bg-gradient-to-tr from-blue-500 to-[var(--primary)] rounded-full shadow-lg flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 border-4 border-[var(--surface)] relative z-10">
          {user ? `${user.firstName[0]}${user.lastName?.[0] || ''}` : 'Dr'}
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-4 relative z-10">
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-3xl font-bold text-[var(--on-surface)]">Dr. {user ? `${user.firstName} ${user.lastName}` : 'Physician'}</h2>
              <span className="flex items-center justify-center gap-1 text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg mx-auto md:mx-0 w-max">
                <Star size={14} className="fill-yellow-500" /> 4.9 Ranking
              </span>
            </div>
            <p className="text-[var(--primary)] font-semibold mt-1">Chief of Cardiology</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--outline-variant)]/20">
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <Building2 size={16} className="text-[var(--on-surface)]" />
              HealthSphere Medical Center
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <MapPin size={16} className="text-[var(--on-surface)]" />
              Block C, Room 402
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <Mail size={16} className="text-[var(--on-surface)]" />
              {user?.email || 'doctor@healthsphere.ai'}
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <Phone size={16} className="text-[var(--on-surface)]" />
              Internal Ext: 5501
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
