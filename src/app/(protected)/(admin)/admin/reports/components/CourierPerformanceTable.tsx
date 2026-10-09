"use client";

import { useCourierPerformance } from "@/hooks/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function CourierPerformanceTable() {
  const { data: couriers, isLoading } = useCourierPerformance();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courier Performance</CardTitle>
        <CardDescription>
          Overview of delivery success rates and average delivery times per courier.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : couriers && couriers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Courier Name</TableHead>
                <TableHead>Service Area</TableHead>
                <TableHead className="text-right">Total Assigned</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Failed</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
                <TableHead className="text-right">Avg Delivery Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {couriers.map((courier) => {
                const totalFinished = courier.delivered + courier.failed;
                const successRate = totalFinished > 0 
                  ? Math.round((courier.delivered / totalFinished) * 100) 
                  : 0;

                return (
                  <TableRow key={courier.id}>
                    <TableCell className="font-medium">{courier.name}</TableCell>
                    <TableCell>
                      {courier.serviceArea ? (
                        <Badge variant="outline">{courier.serviceArea}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{courier.totalAssigned}</TableCell>
                    <TableCell className="text-right text-green-600 font-medium">{courier.delivered}</TableCell>
                    <TableCell className="text-right text-red-600 font-medium">{courier.failed}</TableCell>
                    <TableCell className="text-right">
                      {totalFinished > 0 ? `${successRate}%` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {courier.avgDeliveryTimeHours 
                        ? `${courier.avgDeliveryTimeHours} hrs` 
                        : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No courier performance data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
