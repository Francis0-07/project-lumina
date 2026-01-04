import { Skeleton } from "@/components/ui/Skeleton";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <Sidebar />
      
      <main className="flex-1 p-4 pt-16 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-4">
             <Skeleton className="h-4 w-32 hidden md:block" />
             <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}