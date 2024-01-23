"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderChart } from "./order-chart";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart2 } from "lucide-react";

type OrderChartCardProps = {
  formattedOrders: Array<{ month: string; amount: number }>;
  title: string;
  description: string;
  className?: string;
};

export function OrderChartCard({
  formattedOrders,
  title,
  description,
  className,
}: OrderChartCardProps) {
  const [isBarChart, setIsBarChart] = useState(true);
  return (
    <Card className={cn("w-full p-0", className)}>
      <CardHeader className="flex flex-row justify-between w-full">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          variant={"ghost"}
          onClick={() => setIsBarChart((prev) => !prev)}
        >
          {isBarChart ? (
            <AreaChart className="h-4 w-4" />
          ) : (
            <BarChart2 className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-1">
        <OrderChart data={formattedOrders} isBarChart={isBarChart} />
      </CardContent>
    </Card>
  );
}
