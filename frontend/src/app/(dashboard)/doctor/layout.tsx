import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-grid">
      <Sidebar role="doctor" userName="Dr. Julian Vance" userTitle="Chief Surgeon" />
      <div className="flex flex-col min-h-screen">
        <Header userName="Dr. Julian Vance" userRole="Chief Surgeon" notificationCount={5} />
        <div className="flex-1 p-6 lg:p-8 bg-[var(--surface)]">{children}</div>
      </div>
    </div>
  );
}
