import { generateMockData } from '@/lib/mockData';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ActivityTable } from '@/components/dashboard/ActivityTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Activity | Lumina Dashboard",
};

export default function ActivityPage() {
  const { systemLogs } = generateMockData();

  // Sort logs by timestamp descending (newest first)
  const sortedLogs = [...systemLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">System Activity</h1>
          <div className="text-sm text-gray-500">{systemLogs.length} total events</div>
        </div>
        <ActivityTable logs={sortedLogs} />
      </main>
    </div>
  );
}