"use client";

import { useShipments } from "@/lib/query/shipments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Timestamp } from "@/components/shared/Timestamp";

export default function PaymentsPage() {
  const { data: response, isLoading, isError } = useShipments();
  const shipments = response?.data || [];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load payment history.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
        <p className="text-muted-foreground mt-1">
          View your shipment payments and their current status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>A list of your recent shipment transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table mobileCards={true}>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No payment history found.
                  </TableCell>
                </TableRow>
              ) : (
                shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="whitespace-nowrap" data-label="Date">
                      <Timestamp date={shipment.createdAt} />
                    </TableCell>
                    <TableCell className="font-medium" data-label="Tracking Number">
                      {shipment.trackingNumber}
                    </TableCell>
                    <TableCell data-label="Amount">
                      {shipment.estimatedPrice ? `${shipment.estimatedPrice} BDT` : "N/A"}
                    </TableCell>
                    <TableCell data-label="Status">
                      <Badge variant={
                        shipment.paymentStatus === "PAID" ? "default" :
                        shipment.paymentStatus === "INITIATED" ? "secondary" : 
                        shipment.paymentStatus === "FAILED" ? "destructive" : "outline"
                      }>
                        {shipment.paymentStatus || "UNPAID"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

