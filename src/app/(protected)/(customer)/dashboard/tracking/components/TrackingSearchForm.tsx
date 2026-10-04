"use client";

import { useState } from "react";
import { useSearchShipments } from "@/lib/query/shipments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, MapPin, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Timestamp } from "@/components/shared/Timestamp";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TrackingTimeline } from "../../shipments/[id]/components/TrackingTimeline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function TrackingSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTrackingNumber = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(urlTrackingNumber);
  const [prevUrlTrackingNumber, setPrevUrlTrackingNumber] = useState(urlTrackingNumber);

  if (urlTrackingNumber !== prevUrlTrackingNumber) {
    setPrevUrlTrackingNumber(urlTrackingNumber);
    setSearchInput(urlTrackingNumber);
  }

  const { data, isLoading, isError } = useSearchShipments(
    { trackingNumber: urlTrackingNumber },
    !!urlTrackingNumber
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", searchInput.trim());
      router.push(`?${params.toString()}`);
    } else {
      router.push("?");
    }
  };

  const shipment = data?.data?.[0];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <label htmlFor="tracking-search" className="sr-only">Tracking Number</label>
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <Input
            id="tracking-search"
            placeholder="Enter tracking number (e.g. TRK-123456789)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Button type="submit" disabled={!searchInput.trim() || isLoading} className="h-12 px-8">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Track
        </Button>
      </form>

      {isError && (
        <Card className="border-destructive">
          <CardContent className="pt-6 text-center text-destructive">
            <p>Failed to track shipment. Please try again or check your tracking number.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && urlTrackingNumber && data?.data?.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No shipment found with tracking number &quot;{urlTrackingNumber}&quot;.</p>
          </CardContent>
        </Card>
      )}

      {shipment && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Shipment Details</CardTitle>
                  <StatusBadge status={shipment.status} className="text-sm" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Service:</span>
                  <span className="text-muted-foreground">{shipment.serviceType}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Created:</span>
                  <span className="text-muted-foreground">
                    <Timestamp date={shipment.createdAt} />
                  </span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Origin
                      </span>
                      <span>{shipment.originCity}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Destination
                      </span>
                      <span>{shipment.destinationCity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t py-4">
                <Link href={`/dashboard/shipments/${shipment.id}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    View Full Details <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                 <TrackingTimeline shipmentId={shipment.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
