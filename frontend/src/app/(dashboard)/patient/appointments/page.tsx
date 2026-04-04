'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Video, User } from 'lucide-react';

const upcoming = [
  { id: 1, doctor: 'Dr. Sarah Collins', spec: 'General Physician', date: 'Tomorrow, Oct 25', time: '10:00 AM', type: 'Video Consult' },
  { id: 2, doctor: 'Dr. Michael Chen', spec: 'Cardiologist', date: 'Next week, Nov 2', time: '02:30 PM', type: 'In-person' },
];

const past = [
  { id: 3, doctor: 'Dr. Elena Rodriguez', spec: 'Dermatologist', date: 'Last month, Sep 15', time: '11:00 AM', status: 'Completed' },
];

export default function AppointmentsPage() {
  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold text-[var(--on-surface)]">Appointments</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage your upcoming schedules and consultation history.</p>
        </div>
        <button className="px-5 py-2.5 gradient-primary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
          Book New
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--on-surface)] flex items-center gap-2">
            <CalendarIcon size={20} className="text-[var(--primary)]" />
            Upcoming Appointments
          </h2>
          {upcoming.map((appt) => (
            <div key={appt.id} className="glass-card-strong p-5 rounded-2xl flex flex-col gap-4 border border-[var(--outline-variant)]/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[var(--primary-container)] rounded-full flex items-center justify-center text-[var(--on-primary-container)]">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--on-surface)]">{appt.doctor}</h3>
                    <p className="text-xs text-[var(--on-surface-variant)]">{appt.spec}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-[var(--secondary-container)] text-[var(--on-secondary-container)] rounded-lg">
                  {appt.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--on-surface-variant)] bg-[var(--surface-container-low)] p-3 rounded-xl">
                <div className="flex items-center gap-1.5"><CalendarIcon size={16} /> {appt.date}</div>
                <div className="flex items-center gap-1.5"><Clock size={16} /> {appt.time}</div>
              </div>
              <div className="flex gap-3 mt-1">
                <button className="flex-1 py-2 font-semibold text-sm border border-[var(--primary)] text-[var(--primary)] rounded-xl hover:bg-[var(--primary)] hover:text-white transition-colors">Reschedule</button>
                {appt.type === 'Video Consult' && (
                  <button className="flex-1 py-2 font-semibold text-sm bg-[var(--primary)] text-white rounded-xl flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all">
                    <Video size={16} /> Join Call
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--on-surface)] flex items-center gap-2">
            <Clock size={20} className="text-[var(--secondary)]" />
            Past Visits
          </h2>
          {past.map((appt) => (
            <div key={appt.id} className="glass-card p-5 rounded-2xl flex flex-col gap-3 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[var(--on-surface)]">{appt.doctor}</h3>
                  <p className="text-xs text-[var(--on-surface-variant)]">{appt.date} • {appt.time}</p>
                </div>
                <span className="text-xs font-bold text-[var(--secondary)]">{appt.status}</span>
              </div>
              <button className="w-full text-left text-sm text-[var(--primary)] font-medium mt-2 hover:underline">
                View Summary Notes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
