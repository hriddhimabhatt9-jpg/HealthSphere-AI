'use client';

import React from 'react';
import { Package, Search, AlertCircle, RefreshCw } from 'lucide-react';

const inventory = [
  { name: 'Amoxicillin 500mg', code: 'DRG-492', stock: 1240, status: 'Healthy' },
  { name: 'Lisinopril 10mg', code: 'DRG-112', stock: 530, status: 'Healthy' },
  { name: 'Morphine Sulfate 15mg', code: 'DRG-881', stock: 45, status: 'Low Stock' },
  { name: 'Ibuprofen 400mg', code: 'DRG-045', stock: 8900, status: 'Healthy' },
];

export default function AdminMedicinesPage() {
  return (
    <div className="max-w-6xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Pharmacy Inventory</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Global view of network pharmacy stocks and alerts.</p>
        </div>
        <button className="px-4 py-2 border border-[var(--outline)] rounded-lg text-sm font-semibold flex items-center gap-2">
          <RefreshCw size={16} /> Sync Database
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--error-container)]/50 border border-[var(--error-container)] p-5 rounded-2xl flex items-center gap-4">
          <AlertCircle className="text-[var(--error)]" size={24} />
          <div>
            <p className="text-xl font-bold text-[var(--error)]">3</p>
            <p className="text-xs font-semibold text-[var(--error)] opacity-80 uppercase tracking-widest">Critical Items</p>
          </div>
        </div>
        <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
          <Package className="text-[var(--primary)]" size={24} />
          <div>
            <p className="text-xl font-bold text-[var(--on-surface)]">12,408</p>
            <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-widest">Total SKUs</p>
          </div>
        </div>
      </div>

      <div className="glass-card pl-0 pr-0 pt-4 rounded-2xl overflow-hidden">
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" size={18} />
            <input type="text" placeholder="Search drug name or code..." className="w-full bg-[var(--surface-container)] pl-10 pr-4 py-2.5 rounded-lg border-none outline-none text-sm" />
          </div>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)] font-semibold border-y border-[var(--outline-variant)]/20">
            <tr>
              <th className="px-6 py-3">Item Name</th>
              <th className="px-6 py-3">Internal Code</th>
              <th className="px-6 py-3">Stock Units</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--outline-variant)]/10">
            {inventory.map((item, i) => (
              <tr key={i} className="hover:bg-[var(--surface-container)] transition-colors">
                <td className="px-6 py-4 font-bold text-[var(--on-surface)]">{item.name}</td>
                <td className="px-6 py-4 font-mono text-xs text-[var(--on-surface-variant)]">{item.code}</td>
                <td className="px-6 py-4 font-medium">{item.stock.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${item.status === 'Low Stock' ? 'bg-[var(--error-container)] text-[var(--error)]' : 'bg-[var(--secondary-container)] text-[var(--secondary)]'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[var(--primary)] font-semibold hover:underline text-xs">Re-order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
