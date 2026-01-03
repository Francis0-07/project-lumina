import { User, Payment, SystemLog, KpiMetric, CohortData } from '@/types';

export class AnalyticsService {
  private users: User[];
  private payments: Payment[];
  private systemLogs: SystemLog[];

  constructor(users: User[], payments: Payment[], systemLogs: SystemLog[] = []) {
    this.users = users;
    this.payments = payments;
    this.systemLogs = systemLogs;
  }

  getMRR(): KpiMetric {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const currentMonthRevenue = this.payments
      .filter(p => new Date(p.date) >= thirtyDaysAgo && p.status === 'SUCCESS')
      .reduce((sum, p) => sum + p.amount, 0);

    // Mocking previous month (92% of current) for trend calculation
    const prevMonthRevenue = currentMonthRevenue * 0.92; 
    const change = ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;

    return {
      label: 'Monthly Recurring Revenue',
      value: currentMonthRevenue,
      changePercentage: parseFloat(change.toFixed(1)),
      trend: change >= 0 ? 'up' : 'down',
    };
  }

  getARPU(): number {
    const mrr = this.getMRR().value as number;
    const activeUsers = this.users.filter(u => u.status === 'ACTIVE').length;
    return activeUsers > 0 ? parseFloat((mrr / activeUsers).toFixed(2)) : 0;
  }

  getChurnRate(): KpiMetric {
    const totalUsers = this.users.length;
    const churnedUsers = this.users.filter(u => u.status === 'CHURNED').length;
    const rate = (churnedUsers / totalUsers) * 100;

    return {
      label: 'Churn Rate',
      value: rate.toFixed(1) + '%',
      changePercentage: -0.5, 
      trend: 'down', // Down is good for churn
    };
  }

  getCohortRetention(): CohortData[] {
    const cohorts: Record<string, { total: number; active: number }> = {};

    this.users.forEach(user => {
      const month = user.signupDate.substring(0, 7); // "2023-10"
      if (!cohorts[month]) cohorts[month] = { total: 0, active: 0 };
      
      cohorts[month].total++;
      if (user.status === 'ACTIVE') {
        cohorts[month].active++;
      }
    });

    return Object.entries(cohorts)
      .map(([month, data]) => ({
        month,
        retentionRate: parseFloat(((data.active / data.total) * 100).toFixed(1)),
        totalUsers: data.total
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  getRevenueHistory(): { date: string; revenue: number }[] {
    const history: Record<string, number> = {};
    const months = 6;
    
    // Initialize last 6 months with 0
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = d.toISOString().slice(0, 7); // "YYYY-MM"
      history[key] = 0;
    }

    this.payments.forEach(p => {
      if (p.status === 'SUCCESS') {
        const key = p.date.slice(0, 7);
        if (history[key] !== undefined) {
          history[key] += p.amount;
        }
      }
    });

    return Object.entries(history).map(([date, revenue]) => ({
      date,
      revenue
    })).sort((a, b) => a.date.localeCompare(b.date));
  }

  getRecentTransactions() {
    return [...this.payments]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(p => ({
        ...p,
        user: this.users.find(u => u.id === p.userId)
      }));
  }

  getSystemHealth() {
    return [...this.systemLogs]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20);
  }

  getActiveUsers(): KpiMetric {
    const activeCount = this.users.filter(u => u.status === 'ACTIVE').length;
    return {
      label: "Active Users",
      value: activeCount,
      changePercentage: 12.5, // Mocked growth for demo purposes
      trend: 'up',
    };
  }
}