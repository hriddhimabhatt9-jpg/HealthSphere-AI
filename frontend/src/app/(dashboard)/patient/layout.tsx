// ============================================================================
// HealthSphere AI — Patient Dashboard Layout
// ============================================================================

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-grid">
      <Sidebar role="patient" userName="Dr. Aris Patel" userTitle="Patient" />
      <div className="flex flex-col min-h-screen">
        <Header
          userName="Dr. Aris"
          userRole="Patient"
          notificationCount={3}
        />
        <div className="flex-1 p-6 lg:p-8 bg-[var(--surface)]">
          {children}
        </div>
      </div>
    </div>
  );
}
