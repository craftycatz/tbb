"use client";
import { Button } from "@/components/ui/button";
import { BarChart2, AreaChart as AC } from "lucide-react";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
} from "recharts";

export function OrderChart({
  data,
  isBarChart,
}: {
  data: Array<{ month: string; amount: number }>;
  isBarChart: boolean;
}) {
  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        {isBarChart ? (
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              dataKey="amount"
              fill="currentColor"
              type={"monotone"}
              className="fill-primary"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </>
  );
}
