'use client';

import React from 'react';
import { CalendarIcon, Clock, Users, Video, Search } from 'lucide-react';

const schedule = [
  { time: '09:00 AM', patient: 'Arthur Henderson', type: 'Checkup', status: 'Upcoming' },
  { time: '10:30 AM', patient: 'Clara Thorne', type: 'Video Consult', status: 'Upcoming' },
  { time: '12:00 PM', patient: 'Jameson Wells', type: 'Follow-up', status: 'Upcoming' },
  { time: '02:00 PM', patient: 'Lydia Martin', type: 'New Patient', status: 'Pending' },
];

export default function DoctorAppointmentsPage() {
  return (
    <div className="max-w-6xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Appointments Schedule</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage your daily calendar and consultations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[var(--surface-container)] rounded-xl font-bold text-sm">Month View</button>
          <button className="px-4 py-2 gradient-primary text-white rounded-xl shadow-md font-bold text-sm">Today</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <div className="glass-card-strong p-6 rounded-2xl border border-[var(--outline-variant)]/20 shadow-sm self-start">
          <h2 className="font-bold flex items-center gap-2 mb-4"><CalendarIcon size={18} className="text-[var(--primary)]" /> Date Picker</h2>
          {/* Mock Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[var(--on-surface-variant)] mb-2">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className={`p-1.5 rounded-lg cursor-pointer ${i + 1 === 24 ? 'bg-[var(--primary)] text-white shadow-md' : 'hover:bg-[var(--surface-container)]'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Thursday, October 24</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
              <input type="text" placeholder="Search patient..." className="pl-9 pr-4 py-1.5 bg-[var(--surface-container)] rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
          </div>

          <div className="space-y-4">
            {schedule.map((appt, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)]/20 hover:bg-[var(--surface-container)] transition-colors">
                <div className="flex items-center gap-2 w-28 flex-shrink-0 font-bold text-[var(--primary)]">
                  <Clock size={16} /> {appt.time}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--secondary-container)] flex items-center justify-center font-bold text-[var(--secondary)]">
                    {appt.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--on-surface)]">{appt.patient}</h3>
                    <p className="text-xs text-[var(--on-surface-variant)]">{appt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {appt.type === 'Video Consult' && (
                    <button className="flex-1 sm:flex-none px-3 py-1.5 bg-[var(--primary-container)] text-[var(--primary)] font-semibold text-xs rounded-lg flex items-center justify-center gap-1">
                      <Video size={14} /> Join Call
                    </button>
                  )}
                  <button className="flex-1 sm:flex-none px-3 py-1.5 bg-[var(--surface-container-high)] font-semibold text-xs rounded-lg hover:brightness-95">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
