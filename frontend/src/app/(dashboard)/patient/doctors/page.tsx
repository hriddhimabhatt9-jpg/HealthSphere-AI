import React from 'react';
import { Search, Star, MapPin } from 'lucide-react';

const doctors = [
  { name: 'Dr. Sarah Collins', spec: 'General Physician', rating: 4.9, distance: '2.5 miles', image: 'SC' },
  { name: 'Dr. Michael Chen', spec: 'Cardiologist', rating: 4.8, distance: '3.1 miles', image: 'MC' },
  { name: 'Dr. Elena Rodriguez', spec: 'Dermatologist', rating: 4.7, distance: '1.2 miles', image: 'ER' },
];

export default function PatientDoctorsPage() {
  return (
    <div className="max-w-6xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Find Doctors</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Search for specialists and book appointments.</p>
        </div>
      </div>
      
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" size={20} />
        <input 
          type="text" 
          placeholder="Search by name, specialty, or condition..." 
          className="w-full pl-12 pr-4 py-3 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doc, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl text-center space-y-4 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[var(--primary)] to-blue-300 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {doc.image}
            </div>
            <div>
              <h3 className="font-bold text-[var(--on-surface)]">{doc.name}</h3>
              <p className="text-sm text-[var(--primary)]">{doc.spec}</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-[var(--on-surface-variant)] font-medium">
              <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {doc.rating}</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {doc.distance}</span>
            </div>
            <button className="w-full py-2.5 mt-2 text-sm font-bold text-[var(--primary)] bg-[var(--primary-container)] rounded-xl hover:brightness-95 transition-all">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
