'use client';

import { useState } from 'react';
import { Payment, User } from "@/types";
import { Card } from "@/components/ui/Card";
import { Search, ArrowUpDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PaginationControls } from './PaginationControls';

type TransactionWithUser = Payment & { user?: User };

export function TransactionTable({ transactions }: { transactions: TransactionWithUser[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const itemsPerPage = 10;

  // Filter transactions based on search (Customer Name, Email, or Transaction ID)
  const filteredTransactions = transactions.filter(t =>
    (t.user?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (t.user?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    
    let aValue: string | number = '';
    let bValue: string | number = '';

    if (key === 'user.name') {
      aValue = a.user?.name || '';
      bValue = b.user?.name || '';
    } else if (key === 'amount' || key === 'date' || key === 'status') {
       aValue = a[key as keyof Payment];
       bValue = b[key as keyof Payment];
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
          className="w-full pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" onClick={() => handleSort('user.name')}>
                  <div className="flex items-center gap-1">Customer <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-6 py-3 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-6 py-3 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" onClick={() => handleSort('amount')}>
                  <div className="flex items-center gap-1">Amount <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-6 py-3 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">Status <ArrowUpDown className="h-3 w-3" /></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{t.user?.name || 'Unknown'}</div>
                      <div className="text-xs text-gray-500">{t.user?.email || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatCurrency(t.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        t.status === 'SUCCESS' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No transactions found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsInfo={`Showing ${startIndex + 1} to ${Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of ${filteredTransactions.length} results`}
      />
    </div>
  );
}