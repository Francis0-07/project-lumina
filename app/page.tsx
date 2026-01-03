import { generateMockData } from '@/lib/mockData';
import { AnalyticsService } from '@/lib/analytics';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { SystemHealth } from '../components/dashboard/SystemHealth';
import { DownloadButton } from '@/components/dashboard/DownloadButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lumina Dashboard | Financial Analytics",
  description: "Real-time financial insights and system monitoring.",
};

export default function Home() {
  const { users, payments, systemLogs } = generateMockData();
  const analytics = new AnalyticsService(users, payments, systemLogs);
  
  const mrr = analytics.getMRR();
  const churn = analytics.getChurnRate();
  const revenueHistory = analytics.getRevenueHistory();
  const recentTransactions = analytics.getRecentTransactions();
  const systemHealth = analytics.getSystemHealth();
  const activeUsers = analytics.getActiveUsers();

  // Prepare data for CSV export
  const exportData = payments.map(p => ({
    TransactionID: p.id,
    Amount: p.amount,
    Date: p.date,
    Status: p.status,
    Customer: users.find(u => u.id === p.userId)?.name || 'Unknown',
    Email: users.find(u => u.id === p.userId)?.email || 'Unknown'
  }));

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <Sidebar />
      
      <main className="flex-1 p-4 pt-16 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 hidden md:block">Last updated: Just now</div>
            <DownloadButton data={exportData} filename="transactions_report.csv" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <KPICard metric={mrr} />
          <KPICard metric={activeUsers} />
          <KPICard metric={churn} />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueHistory} />
          </div>
          <div className="lg:col-span-1">
            <RecentTransactions transactions={recentTransactions} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 grid-cols-1">
          <SystemHealth logs={systemHealth} />
        </div>
      </main>
    </div>
  );
}
