import React from 'react';
import { FileText, Download, UploadCloud, CheckCircle } from 'lucide-react';

const reports = [
  { name: 'Complete Blood Count (CBC).pdf', date: 'Oct 15, 2023', size: '1.2 MB', doc: 'Dr. Sarah Collins', status: 'Reviewed' },
  { name: 'Lipid Panel Results.pdf', date: 'Oct 15, 2023', size: '0.8 MB', doc: 'Dr. Sarah Collins', status: 'Reviewed' },
  { name: 'Annual Physical Summary.docx', date: 'Sep 02, 2023', size: '2.4 MB', doc: 'Dr. Michael Chen', status: 'Completed' },
];

export default function PatientReportsPage() {
  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">My Reports</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Access and manage all your medical documents and lab results.</p>
        </div>
        <button className="px-5 py-2.5 gradient-primary text-white font-bold rounded-xl shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-transform">
          <UploadCloud size={18} /> Upload New
        </button>
      </div>

      <div className="glass-card-strong rounded-2xl overflow-hidden border border-[var(--outline-variant)]/20">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider bg-[var(--surface-container-low)] border-b border-[var(--outline-variant)]/20">
          <div>Document Name</div>
          <div className="w-32 hidden md:block">Added By</div>
          <div className="w-24">Date</div>
          <div className="w-10 text-center">Action</div>
        </div>
        <div className="divide-y divide-[var(--outline-variant)]/10">
          {reports.map((report, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-4 items-center hover:bg-[var(--surface-container)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--error-container)] rounded-lg flex items-center justify-center text-[var(--error)] flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--on-surface)] text-sm">{report.name}</p>
                  <p className="text-xs text-[var(--on-surface-variant)] flex items-center gap-1 mt-0.5">
                    {report.size} • <CheckCircle size={12} className="text-[var(--secondary)]" /> {report.status}
                  </p>
                </div>
              </div>
              <div className="w-32 text-xs text-[var(--on-surface-variant)] hidden md:block">{report.doc}</div>
              <div className="w-24 text-xs font-medium text-[var(--on-surface)]">{report.date}</div>
              <div className="w-10 flex justify-end">
                <button className="p-2 text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-lg transition-colors" aria-label={`Download ${report.name}`}>
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
