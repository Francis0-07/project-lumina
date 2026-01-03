import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-800", className)}>
      {children}
    </div>
  );
}