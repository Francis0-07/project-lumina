import { Card } from "@/components/ui/Card";
import { Payment, User } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions: (Payment & { user: User | undefined })[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="p-6 h-full">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                {t.user?.name.substring(0, 2).toUpperCase() || "??"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{t.user?.name || "Unknown User"}</span>
                <span className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={`text-sm font-bold ${t.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'}`}>
              {t.status === 'SUCCESS' ? '+' : ''}{formatCurrency(t.amount)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}