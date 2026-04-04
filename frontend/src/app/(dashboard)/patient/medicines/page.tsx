'use client';

import React, { useState } from 'react';
import { Pill, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const initialMeds = [
  { id: 1, name: 'Amoxicillin', dose: '500mg', instructions: 'Take twice daily after meals', time: '08:00 AM', taken: true },
  { id: 2, name: 'Vitamin D3', dose: '2000 IU', instructions: 'Take once daily in the morning', time: '08:00 AM', taken: false },
  { id: 3, name: 'Lisinopril', dose: '10mg', instructions: 'Take once daily before bed', time: '09:00 PM', taken: false },
];

export default function MedicinesPage() {
  const [meds, setMeds] = useState(initialMeds);

  const toggleTaken = (id: number) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Medicine Tracker</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Keep track of your daily prescriptions and adherence.</p>
        </div>
        <button className="px-4 py-2 font-semibold text-[var(--primary)] bg-[var(--primary-container)] rounded-lg hover:brightness-95 transition-all">
          Request Refill
        </button>
      </div>

      <div className="bg-[var(--surface-container-lowest)] rounded-2xl p-6 shadow-sm border border-[var(--outline-variant)]/20">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[var(--primary)]" />
          Today's Schedule
        </h2>
        <div className="space-y-3">
          {meds.map((med) => (
            <div key={med.id} className="flex items-center justify-between p-4 bg-[var(--surface-container)] rounded-xl hover:bg-[var(--surface-container-high)] transition-colors cursor-pointer" onClick={() => toggleTaken(med.id)}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${med.taken ? 'bg-[var(--secondary)] text-white' : 'bg-[var(--outline-variant)]/20 text-[var(--on-surface-variant)]'}`}>
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--on-surface)] text-sm md:text-base">
                    {med.name} <span className="text-xs font-normal text-[var(--on-surface-variant)] bg-[var(--surface-container-highest)] px-2 py-0.5 rounded-md ml-2">{med.dose}</span>
                  </h3>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-1">{med.time} • {med.instructions}</p>
                </div>
              </div>
              <div>
                <button 
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${med.taken ? 'border-[var(--secondary)] bg-[var(--secondary)]' : 'border-[var(--outline)]'}`}
                  aria-label={med.taken ? "Mark as missed" : "Mark as taken"}
                >
                  {med.taken && <CheckCircle2 size={16} className="text-white" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card-strong p-6 rounded-2xl border-l-4 border-l-[var(--secondary)] flex gap-4">
        <AlertCircle className="text-[var(--secondary)] flex-shrink-0" size={24} />
        <div>
          <h4 className="font-bold text-sm">Adherence Reminder</h4>
          <p className="text-xs text-[var(--on-surface-variant)] mt-1">Taking your medications at the same time every day helps maintain stable blood levels and improves therapeutic outcomes.</p>
        </div>
      </div>
    </div>
  );
}
