"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shipment } from "@/services/shipment.service";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface AdminChartCardProps {
  shipments: Shipment[];
  isLoading: boolean;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function AdminChartCard({ shipments, isLoading }: AdminChartCardProps) {
  // Compute distribution of statuses
  const statusCounts = shipments.reduce((acc, shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground animate-pulse">Loading chart data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available for chart.</p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
