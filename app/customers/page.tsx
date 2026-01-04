import { generateMockData } from '@/lib/mockData';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { UserTable } from '@/components/dashboard/UserTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Customers | Lumina Dashboard",
};

export default function CustomersPage() {
  const { users } = generateMockData();

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Customers</h1>
          <div className="text-sm text-gray-500">{users.length} total users</div>
        </div>
        <UserTable users={users} />
      </main>
    </div>
  );
}