'use client';

import { LayoutDashboard, Users, CreditCard, Settings, Activity, Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: CreditCard, label: "Transactions", href: "/transactions" },
  { icon: Activity, label: "Activity", href: "/activity" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-zinc-900 rounded-md border dark:border-zinc-800 shadow-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={cn(
        "border-r bg-gray-50/40 dark:bg-zinc-900/50 h-screen p-4 flex flex-col",
        "transition-transform duration-300 ease-in-out z-40",
        "fixed top-0 left-0 w-64 md:translate-x-0 md:sticky md:top-0 md:block",
        isMobileOpen ? "translate-x-0 bg-white dark:bg-zinc-900 shadow-xl" : "-translate-x-full hidden md:flex"
      )}>
      <div className="mb-8 px-4 flex items-center gap-2">
        <div className="h-6 w-6 bg-indigo-600 rounded-md"></div>
        <span className="font-bold text-lg">Lumina</span>
      </div>
      <nav className="space-y-1 flex-1">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors",
              pathname === item.href
                ? "bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm" 
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t pt-4 dark:border-zinc-800">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 rounded-md transition-colors"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
    </>
  );
}
