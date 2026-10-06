"use client";

import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useShipments } from "@/hooks/queries";
import { ShipmentStatus } from "@/types/api";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, ChevronRight, AlertCircle, Plus, Loader2 } from "lucide-react";
import { Timestamp } from "@/components/shared/Timestamp";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/use-debounce";

function ShipmentsListClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // URL Params parsing
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const urlLimit = parseInt(searchParams.get("limit") || "10", 10);
  const urlStatus = searchParams.get("status") as ShipmentStatus | "ALL" || "ALL";
  const urlQ = searchParams.get("q") || "";
  const urlSort = searchParams.get("sort") || "createdAt:desc"; // client-side sort
  
  // Local state for immediate UI feedback on search
  const [searchValue, setSearchValue] = useState(urlQ);
  const debouncedSearch = useDebounce(searchValue, 500);

  // Sync URL when debounced search changes
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Reset to page 1 when filtering or sorting
      if (name !== "page") {
        params.set("page", "1");
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (debouncedSearch !== urlQ) {
      router.push(pathname + "?" + createQueryString("q", debouncedSearch));
    }
  }, [debouncedSearch, pathname, router, createQueryString, urlQ]);

  // Query variables
  const queryStatus = urlStatus === "ALL" ? undefined : urlStatus;
  const queryTrackingNumber = urlQ ? urlQ : undefined;

  const { data: shipmentsData, isLoading, isError, refetch } = useShipments({
    page: urlPage,
    limit: urlLimit,
    status: queryStatus,
    trackingNumber: queryTrackingNumber,
  });

  // Client-side sort
  const sortedShipments = useMemo(() => {
    const rawShipments = shipmentsData?.data || [];
    const shipments = [...rawShipments];
    
    if (urlSort === "status:asc") {
      shipments.sort((a, b) => a.status.localeCompare(b.status));
    } else if (urlSort === "status:desc") {
      shipments.sort((a, b) => b.status.localeCompare(a.status));
    } else if (urlSort === "createdAt:asc") {
      shipments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      // createdAt:desc default
      shipments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return shipments;
  }, [shipmentsData?.data, urlSort]);

  const totalPages = Math.ceil((shipmentsData?.total || 0) / urlLimit) || 1;

  const handleStatusChange = (value: string | null) => {
    if (!value) return;
    router.push(pathname + "?" + createQueryString("status", value === "ALL" ? "" : value));
  };

  const handleSortChange = (value: string | null) => {
    if (!value) return;
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
          <p className="text-muted-foreground">Manage and track all your packages in one place.</p>
        </div>
        <Link href="/dashboard/shipments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Shipment
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by tracking number..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Select value={urlStatus as string} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[160px] shrink-0">
              <SelectValue placeholder="Filter by status">{urlStatus === "ALL" ? "All Statuses" : (urlStatus as string).replace(/_/g, " ")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {Object.values(ShipmentStatus).map((status) => (
                <SelectItem key={status} value={status as string}>
                  {status.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={urlSort as string} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[160px] shrink-0">
              <SelectValue placeholder="Sort by">{urlSort === "createdAt:desc" ? "Newest First" : urlSort === "createdAt:asc" ? "Oldest First" : urlSort === "status:asc" ? "Status (A-Z)" : "Status (Z-A)"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt:desc">Newest First</SelectItem>
              <SelectItem value="createdAt:asc">Oldest First</SelectItem>
              <SelectItem value="status:asc">Status (A-Z)</SelectItem>
              <SelectItem value="status:desc">Status (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-muted rounded"></div>
                  <div className="h-3 w-24 bg-muted rounded"></div>
                </div>
                <div className="h-6 w-24 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-12 text-center flex flex-col items-center">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-destructive">Failed to load shipments</h3>
            <p className="text-muted-foreground mb-4">There was an error communicating with the server.</p>
            <Button variant="outline" onClick={() => refetch()}>Try Again</Button>
          </div>
        ) : sortedShipments.length > 0 ? (
          <>
            <div className="divide-y">
              {sortedShipments.map((shipment) => (
                <Link
                  href={`/dashboard/shipments/${shipment.id}`}
                  key={shipment.id}
                  className="block group hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex mt-1 w-10 h-10 bg-primary/10 text-primary rounded-full items-center justify-center shrink-0">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-base flex items-center gap-2">
                          {shipment.trackingNumber}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium text-foreground/80">{shipment.recipientName}</span> • {shipment.destinationAddress}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Created <Timestamp date={shipment.createdAt} showTime />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-6 shrink-0">
                      <StatusBadge status={shipment.status} />
                      <ChevronRight className="hidden sm:block h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="border-t p-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(urlPage - 1);
                        }}
                        className={urlPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        href="#"
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const page = idx + 1;
                      // Logic to show a limited number of pages could go here
                      // But since max page is usually small or manageable, simple mapping works
                      // Let's implement a simple range (e.g. current, +/- 1, first, last)
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= urlPage - 1 && page <= urlPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={urlPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        page === urlPage - 2 || 
                        page === urlPage + 2
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(urlPage + 1);
                        }}
                        className={urlPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        href="#"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h4 className="font-semibold text-xl mb-2">No shipments found</h4>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {urlQ || urlStatus !== "ALL" 
                ? "We couldn't find any shipments matching your current filters. Try adjusting them."
                : "You haven't created any shipments yet. Get started by creating your first package."}
            </p>
            {urlQ || urlStatus !== "ALL" ? (
              <Button variant="outline" onClick={() => router.push(pathname)}>
                Clear Filters
              </Button>
            ) : (
              <Link href="/dashboard/shipments/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Shipment
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomerShipmentsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ShipmentsListClient />
    </Suspense>
  );
}

