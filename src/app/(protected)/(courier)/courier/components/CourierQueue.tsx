"use client";

import { useState } from "react";
import { useShipments } from "@/lib/query/shipments";
import { AssignedShipmentCard } from "./AssignedShipmentCard";
import { PackageX, Loader2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CourierQueue() {
  const { data: shipmentsData, isLoading, isError, refetch } = useShipments({ limit: 50 });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading your assigned shipments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-destructive/5 rounded-xl border border-destructive/20 p-6 text-center">
        <PackageX className="h-10 w-10 text-destructive mb-4" />
        <h3 className="font-semibold text-lg text-foreground">Failed to load shipments</h3>
        <p className="mb-4">There was a problem retrieving your assigned deliveries.</p>
        <Button variant="outline" onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const shipments = shipmentsData?.data || [];
  
  const sortedShipments = [...shipments].sort((a, b) => {
    const isATerminal = ["DELIVERED", "FAILED_DELIVERY", "CANCELLED", "RETURNED"].includes(a.status);
    const isBTerminal = ["DELIVERED", "FAILED_DELIVERY", "CANCELLED", "RETURNED"].includes(b.status);
    
    if (isATerminal === isBTerminal) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return isATerminal ? 1 : -1;
  });

  const filteredShipments = sortedShipments.filter(s => {
    const searchMatch = s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isTerminal = ["DELIVERED", "FAILED_DELIVERY", "CANCELLED", "RETURNED"].includes(s.status);
    let statusMatch = true;
    if (statusFilter === "ACTIVE") statusMatch = !isTerminal;
    if (statusFilter === "COMPLETED") statusMatch = isTerminal;
    
    return searchMatch && statusMatch;
  });

  const hasShipments = shipments.length > 0;

  return (
    <div className="space-y-6">
      {hasShipments && (
        <div className="flex flex-col sm:flex-row gap-4 bg-muted/30 p-4 rounded-xl border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by tracking number..." 
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "ALL")}>
              <SelectTrigger className="bg-background">
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {statusFilter === "ALL" && "All Shipments"}
                    {statusFilter === "ACTIVE" && "Active Only"}
                    {statusFilter === "COMPLETED" && "Completed"}
                  </span>
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Shipments</SelectItem>
                <SelectItem value="ACTIVE">Active Only</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {!hasShipments ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-muted/30 rounded-xl border border-dashed p-8 text-center">
          <PackageX className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-semibold text-lg">No assigned shipments</h3>
          <p className="text-muted-foreground text-sm max-w-sm mt-2">
            You don't have any packages assigned to you right now. 
            When an Admin assigns a shipment to you, it will appear here.
          </p>
        </div>
      ) : filteredShipments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-xl border-dashed">
          <Search className="h-8 w-8 text-muted-foreground/50 mb-4" />
          <h3 className="font-medium text-lg">No matches found</h3>
          <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or filters.</p>
          <Button variant="link" onClick={() => { setSearchTerm(""); setStatusFilter("ALL"); }}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredShipments.map((shipment) => (
            <AssignedShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      )}
    </div>
  );
}
