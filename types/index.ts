export type SubscriptionPlan = 'BASIC' | 'PRO' | 'ENTERPRISE';
export type UserStatus = 'ACTIVE' | 'CHURNED';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: SubscriptionPlan;
  status: UserStatus;
  signupDate: string; // ISO Date string
  lastActiveDate: string; // ISO Date string
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  date: string; // ISO Date string
  status: 'SUCCESS' | 'FAILED';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  responseTimeMs: number;
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  errorCount: number;
}

export interface KpiMetric {
  value: number | string;
  changePercentage: number;
  trend: 'up' | 'down' | 'neutral';
  label: string;
}

export interface CohortData {
  month: string;
  retentionRate: number;
  totalUsers: number;
}