import { Sidebar } from '@/components/dashboard/Sidebar';
import { SettingsForm } from '@/components/dashboard/SettingsForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Settings | Lumina Dashboard",
};

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <Sidebar />
      <main className="flex-1 p-4 pt-16 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account preferences</p>
        </div>
        <SettingsForm />
      </main>
    </div>
  );
}