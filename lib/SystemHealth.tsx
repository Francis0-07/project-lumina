'use client';

import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/Card";
import { SystemLog } from "@/types";

export function SystemHealth({ logs }: { logs: SystemLog[] }) {
  const avgResponse = Math.round(logs.reduce((acc, log) => acc + log.responseTimeMs, 0) / logs.length);
  const isHealthy = avgResponse < 300;

  // Reverse logs for chart (oldest to newest)
  const chartData = [...logs].reverse();

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">System Health</h3>
        <div className={`px-2 py-1 rounded text-xs font-bold ${isHealthy ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {isHealthy ? 'HEALTHY' : 'DEGRADED'}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold">{avgResponse}ms</div>
        <div className="text-xs text-gray-500">Avg. Response Time</div>
      </div>

      <div className="h-[150px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar 
              dataKey="responseTimeMs" 
              fill={isHealthy ? "#22c55e" : "#eab308"} 
              radius={[4, 4, 0, 0]}
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}