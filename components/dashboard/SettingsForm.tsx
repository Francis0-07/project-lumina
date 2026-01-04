'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { User, Mail, Bell, Shield } from "lucide-react";

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              defaultValue="Demo User"
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              defaultValue="demo@example.com"
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {message.text}
            </div>
          )}
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="emailNotifications" className="flex items-center gap-2 cursor-pointer">
              <Bell className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Email Notifications</span>
            </label>
            <input id="emailNotifications" type="checkbox" defaultChecked className="accent-indigo-600 h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="securityAlerts" className="flex items-center gap-2 cursor-pointer">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Security Alerts</span>
            </label>
            <input id="securityAlerts" type="checkbox" defaultChecked className="accent-indigo-600 h-4 w-4" />
          </div>
        </div>
      </Card>
    </div>
  );
}