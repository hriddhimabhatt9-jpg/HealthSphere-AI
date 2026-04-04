// ============================================================================
// HealthSphere AI — Sidebar Navigation Component
// Clinical Precision design with active pill indicator
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import {
  LayoutDashboard,
  User,
  Calendar,
  Stethoscope,
  FileText,
  Activity,
  Pill,
  Settings,
  LogOut,
  Menu,
  X,
  Bot,
  Video,
  ChevronLeft,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  role: 'patient' | 'doctor' | 'admin';
  userName?: string;
  userTitle?: string;
}

const navItems: Record<string, NavItem[]> = {
  patient: [
    { label: 'Dashboard', href: '/patient', icon: LayoutDashboard },
    { label: 'Profile', href: '/patient/profile', icon: User },
    { label: 'Appointments', href: '/patient/appointments', icon: Calendar },
    { label: 'Doctors', href: '/patient/doctors', icon: Stethoscope },
    { label: 'Reports', href: '/patient/reports', icon: FileText },
    { label: 'Physiotherapy', href: '/physiotherapy', icon: Activity },
    { label: 'Medicine Tracker', href: '/patient/medicines', icon: Pill },
    { label: 'Settings', href: '/patient/settings', icon: Settings },
  ],
  doctor: [
    { label: 'Dashboard', href: '/doctor', icon: LayoutDashboard },
    { label: 'Profile', href: '/doctor/profile', icon: User },
    { label: 'Appointments', href: '/doctor/appointments', icon: Calendar },
    { label: 'Doctors', href: '/doctor/colleagues', icon: Stethoscope },
    { label: 'Reports', href: '/doctor/reports', icon: FileText },
    { label: 'Physiotherapy', href: '/physiotherapy', icon: Activity },
    { label: 'Medicine Tracker', href: '/doctor/prescriptions', icon: Pill },
    { label: 'Settings', href: '/doctor/settings', icon: Settings },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Profile', href: '/admin/profile', icon: User },
    { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { label: 'Doctors', href: '/admin/doctors', icon: Stethoscope },
    { label: 'Reports', href: '/admin/reports', icon: FileText },
    { label: 'Physiotherapy', href: '/admin/physio', icon: Activity },
    { label: 'Medicine Tracker', href: '/admin/medicines', icon: Pill },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ],
};

export default function Sidebar({ role, userName: propUserName, userTitle: propUserTitle }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  
  const userName = authUser ? `${authUser.firstName} ${authUser.lastName}` : propUserName || 'User';
  const userTitle = authUser ? authUser.role : propUserTitle || role.charAt(0).toUpperCase() + role.slice(1);
  const items = navItems[role] || navItems.patient;

  const isActive = (href: string) => {
    if (href === `/${role}`) return pathname === href;
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="px-6 py-6">
        <Link href="/" className="flex items-center gap-2" aria-label="HealthSphere AI Home">
          <span className="text-xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight text-[var(--primary)]">
            HealthSphere AI
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-2 space-y-1" aria-label="Dashboard navigation">
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${active
                  ? 'nav-item-active text-[var(--on-surface)] bg-[var(--surface-container-lowest)]'
                  : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
                }
              `}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={20}
                className={active ? 'text-[var(--primary)]' : 'text-[var(--on-surface-variant)] group-hover:text-[var(--on-surface)]'}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="px-3 py-2 space-y-1 border-t border-[var(--surface-container-high)]">
        <Link
          href="/ai-assistant"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary-fixed)] transition-all"
        >
          <Bot size={20} aria-hidden="true" />
          <span>AI Assistant</span>
        </Link>
        <Link
          href="/video-consultation"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--secondary)] hover:bg-[var(--secondary-container)]/30 transition-all"
        >
          <Video size={20} aria-hidden="true" />
          <span>Video Call</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center text-[var(--primary)] font-bold text-sm">
            {userName?.split(' ').map(n => n[0]).join('') || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--on-surface)] truncate">
              {userName || 'User'}
            </p>
            <p className="text-xs text-[var(--on-surface-variant)] truncate">
              {userTitle || role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-[var(--surface-container-high)] transition-colors"
            aria-label="Log out"
          >
            <LogOut size={16} className="text-[var(--on-surface-variant)]" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl glass-card shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[260px] bg-[var(--surface-container-low)] h-screen sticky top-0 overflow-y-auto"
        aria-label="Sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-[var(--surface-container-low)] z-50 shadow-xl overflow-y-auto"
              aria-label="Mobile sidebar"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
