import { generateMockData } from '@/lib/mockData';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Transactions | Lumina Dashboard",
};

export default function TransactionsPage() {
  const { users, payments } = generateMockData();

  // Join payments with user data and sort by date (newest first)
  const transactions = payments.map(payment => ({
    ...payment,
    user: users.find(u => u.id === payment.userId)
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <div className="text-sm text-gray-500">{transactions.length} total transactions</div>
        </div>
        <TransactionTable transactions={transactions} />
      </main>
    </div>
  );
}