"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "./components/RevenueChart";
import { CourierPerformanceTable } from "./components/CourierPerformanceTable";
import { ExportDataCard } from "./components/ExportDataCard";

export function AdminReportsClient() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courier">Courier Performance</TabsTrigger>
        <TabsTrigger value="export">Data Export</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <RevenueChart />
      </TabsContent>
      
      <TabsContent value="courier" className="space-y-4">
        <CourierPerformanceTable />
      </TabsContent>
      
      <TabsContent value="export" className="space-y-4">
        <ExportDataCard />
      </TabsContent>
    </Tabs>
  );
}
