// ============================================================================
// HealthSphere AI — Dashboard Header Component
// Top bar with search, notifications, and user profile
// ============================================================================

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  userRole?: string;
  notificationCount?: number;
}

export default function Header({
  userName: propUserName,
  userAvatar,
  userRole: propUserRole,
  notificationCount = 0,
}: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const user = useAuthStore((state) => state.user);
  
  const userName = user ? `${user.firstName} ${user.lastName}` : propUserName || 'User';
  const userRole = user ? user.role : propUserRole || 'Patient';

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 h-16 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--outline-variant)]/10"
      role="banner"
    >
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className={`relative flex items-center transition-all duration-200 ${searchFocused ? 'ring-2 ring-[var(--primary)]/20' : ''} rounded-xl`}>
          <Search
            size={18}
            className="absolute left-3 text-[var(--on-surface-variant)]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search medical records..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-container)] rounded-xl text-sm text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/60 border-none outline-none focus:bg-[var(--surface-container-lowest)]  transition-colors"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search medical records"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-4">
        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-xl hover:bg-[var(--surface-container)] transition-colors"
          aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
        >
          <Bell size={20} className="text-[var(--on-surface-variant)]" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[var(--error)] rounded-full border-2 border-[var(--surface)]" />
          )}
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-[var(--outline-variant)]/20">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-[var(--on-surface)]">{userName}</p>
            <p className="text-xs text-[var(--on-surface-variant)]">{userRole}</p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${userName}'s avatar`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] flex items-center justify-center text-white text-sm font-bold">
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
