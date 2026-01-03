import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { KpiMetric } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function KPICard({ metric }: { metric: KpiMetric }) {
  const isPositive = metric.trend === 'up';
  const isNeutral = metric.trend === 'neutral';

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground text-gray-500">{metric.label}</span>
        <span className="text-2xl font-bold">
            {typeof metric.value === 'number' ? formatCurrency(metric.value) : metric.value}
        </span>
      </div>
      <div className="mt-4 flex items-center text-xs">
        {isNeutral ? (
            <Minus className="mr-1 h-4 w-4 text-gray-500" />
        ) : isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
        ) : (
            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
        )}
        <span className={isPositive ? "text-green-500" : isNeutral ? "text-gray-500" : "text-red-500"}>
          {Math.abs(metric.changePercentage)}%
        </span>
        <span className="ml-1 text-gray-500">from last month</span>
      </div>
    </Card>
  );
}