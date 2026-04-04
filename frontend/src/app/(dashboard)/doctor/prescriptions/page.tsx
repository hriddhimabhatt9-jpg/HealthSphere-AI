'use client';

import React from 'react';
import { Pill, Plus, Search, CheckCircle } from 'lucide-react';

const prescriptions = [
  { id: 1, patient: 'Arthur Henderson', drug: 'Amoxicillin', dose: '500mg', status: 'Active', date: 'Oct 20, 2023' },
  { id: 2, patient: 'Clara Thorne', drug: 'Lisinopril', dose: '10mg', status: 'Active', date: 'Oct 18, 2023' },
  { id: 3, patient: 'Jameson Wells', drug: 'Ibuprofen', dose: '400mg', status: 'Completed', date: 'Sep 10, 2023' },
];

export default function DoctorPrescriptionsPage() {
  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Prescriptions Archive</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage and issue medications for your patients.</p>
        </div>
        <button className="px-5 py-2.5 gradient-primary text-white font-bold rounded-xl shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-transform">
          <Plus size={18} /> New Prescription
        </button>
      </div>

      <div className="glass-card-strong p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" size={18} />
            <input type="text" placeholder="Search by patient or drug..." className="w-full pl-10 pr-4 py-2 bg-[var(--surface-container)] rounded-xl border-none outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm" />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[var(--primary-container)] text-[var(--primary)] font-semibold text-xs rounded-lg">Active</button>
            <button className="px-3 py-1.5 bg-[var(--surface-container)] text-[var(--on-surface-variant)] font-semibold text-xs rounded-lg hover:bg-[var(--surface-container-high)]">Past</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)] font-semibold">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Patient</th>
                <th className="px-4 py-3">Medication</th>
                <th className="px-4 py-3">Dosage</th>
                <th className="px-4 py-3">Issued On</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--outline-variant)]/10">
              {prescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--surface-container)] transition-colors">
                  <td className="px-4 py-4 font-bold">{p.patient}</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2"><Pill size={16} className="text-[var(--secondary)]" /> {p.drug}</div></td>
                  <td className="px-4 py-4">
                    <span className="bg-[var(--surface-container-highest)] px-2 py-1 rounded-md text-xs font-medium">{p.dose}</span>
                  </td>
                  <td className="px-4 py-4 text-[var(--on-surface-variant)]">{p.date}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${p.status === 'Active' ? 'bg-[var(--secondary-container)] text-[var(--on-secondary-container)]' : 'bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)]'}`}>
                      {p.status === 'Active' && <CheckCircle size={10} />} {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-[var(--primary)] font-semibold hover:underline text-xs">View/Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
