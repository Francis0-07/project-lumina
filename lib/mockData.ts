import { User, Payment, SystemLog, SubscriptionPlan } from '@/types';

const PLANS: Record<SubscriptionPlan, number> = {
  BASIC: 29,
  PRO: 99,
  ENTERPRISE: 299,
};

export const generateMockData = () => {
  const users: User[] = [];
  const payments: Payment[] = [];
  const systemLogs: SystemLog[] = [];

  // Generate 200 Users
  for (let i = 0; i < 200; i++) {
    const isChurned = Math.random() < 0.15; 
    const planKeys = Object.keys(PLANS) as SubscriptionPlan[];
    const plan = planKeys[Math.floor(Math.random() * planKeys.length)];
    
    // Skew signups towards recent dates for a "growth" curve
    const daysAgo = Math.floor(Math.sqrt(Math.random()) * 90); 
    const signupDate = new Date();
    signupDate.setDate(signupDate.getDate() - daysAgo);

    const user: User = {
      id: `user_${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      plan,
      status: isChurned ? 'CHURNED' : 'ACTIVE',
      signupDate: signupDate.toISOString(),
      lastActiveDate: new Date().toISOString(),
    };

    users.push(user);

    // Generate Payments
    // If churned, they only paid for 1-2 months. If active, they pay until now.
    const monthsActive = isChurned ? Math.floor(Math.random() * 2) + 1 : Math.floor((90 - daysAgo) / 30) + 1;
    
    for (let m = 0; m < monthsActive; m++) {
      const paymentDate = new Date(signupDate);
      paymentDate.setMonth(paymentDate.getMonth() + m);
      
      // Only add payment if it's in the past
      if (paymentDate < new Date()) {
        payments.push({
          id: `pay_${i}_${m}`,
          userId: user.id,
          amount: PLANS[plan],
          date: paymentDate.toISOString(),
          status: Math.random() > 0.98 ? 'FAILED' : 'SUCCESS', 
        });
      }
    }
  }

  // Generate System Logs (Last 30 days)
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    systemLogs.push({
      id: `log_${i}`,
      timestamp: date.toISOString(),
      responseTimeMs: Math.floor(120 + Math.random() * 100 + (Math.random() > 0.9 ? 500 : 0)),
      status: Math.random() > 0.95 ? 'DEGRADED' : 'HEALTHY',
      errorCount: Math.floor(Math.random() * 5),
    });
  }

  return { users, payments, systemLogs };
};