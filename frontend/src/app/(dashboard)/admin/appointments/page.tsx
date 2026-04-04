'use client';

import React from 'react';
import { Calendar, Search, Filter, CalendarDays, Activity } from 'lucide-react';

const masterSchedule = [
  { id: 1, facility: 'Main Campus', room: 'Cardiology 101', doc: 'Dr. Sarah Collins', patient: 'Arthur H.', time: '09:00 AM', status: 'In Progress' },
  { id: 2, facility: 'West Wing', room: 'Dermatology 2A', doc: 'Dr. Elena Rodriguez', patient: 'Maya S.', time: '09:15 AM', status: 'Checked In' },
  { id: 3, facility: 'Main Campus', room: 'General Med 4', doc: 'Dr. Michael Chen', patient: 'James L.', time: '09:30 AM', status: 'Scheduled' },
  { id: 4, facility: 'Main Campus', room: 'Cardiology 101', doc: 'Dr. Sarah Collins', patient: 'David W.', time: '10:00 AM', status: 'Scheduled' },
];

export default function AdminAppointmentsPage() {
  return (
    <div className="max-w-6xl space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Network Schedule Grid</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Master view of all facility bookings and facility utilization.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[var(--surface-container)] rounded-lg text-sm font-semibold flex items-center gap-2"><CalendarDays size={16} /> Select Date</button>
          <button className="px-4 py-2 border border-[var(--outline)] rounded-lg text-sm font-semibold flex items-center gap-2"><Filter size={16} /> Filter</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 glass-card-strong p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-[var(--on-surface-variant)]" size={18} />
            <input type="text" placeholder="Search appointments across network..." className="w-full bg-transparent border-none outline-none text-sm placeholder:text-[var(--on-surface-variant)]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)] font-semibold border-b border-[var(--outline-variant)]/20">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Facility & Room</th>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--outline-variant)]/10">
                {masterSchedule.map((a) => (
                  <tr key={a.id} className="hover:bg-[var(--surface-container)] transition-colors">
                    <td className="px-4 py-3 font-semibold">{a.time}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--on-surface)]">{a.room}</div>
                      <div className="text-[10px] text-[var(--on-surface-variant)] uppercase">{a.facility}</div>
                    </td>
                    <td className="px-4 py-3 text-[var(--primary)] font-medium">{a.doc}</td>
                    <td className="px-4 py-3">{a.patient}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        a.status === 'In Progress' ? 'bg-[var(--primary-container)] text-[var(--on-primary-container)]' :
                        a.status === 'Checked In' ? 'bg-[var(--secondary-container)] text-[var(--on-secondary-container)]' :
                        'bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)]'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl h-max space-y-4">
          <h2 className="font-bold flex items-center gap-2"><Activity size={18} className="text-[var(--primary)]" /> Live Utilization</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Diagnostic Rooms</span><span>92%</span>
              </div>
              <div className="h-2 bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
                <div className="bg-[var(--error)] h-full w-[92%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>General Wards</span><span>65%</span>
              </div>
              <div className="h-2 bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
                <div className="bg-[var(--secondary)] h-full w-[65%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Operating Theaters</span><span>40%</span>
              </div>
              <div className="h-2 bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
                <div className="bg-[var(--primary)] h-full w-[40%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
