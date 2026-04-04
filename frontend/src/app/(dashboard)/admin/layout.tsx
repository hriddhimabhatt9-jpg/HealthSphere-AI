import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-grid">
      <Sidebar role="admin" userName="Dr. Sarah Vance" userTitle="Chief Administrator" />
      <div className="flex flex-col min-h-screen">
        <Header userName="Dr. Sarah Vance" userRole="Chief Administrator" notificationCount={8} />
        <div className="flex-1 p-6 lg:p-8 bg-[var(--surface)]">{children}</div>
      </div>
    </div>
  );
}
