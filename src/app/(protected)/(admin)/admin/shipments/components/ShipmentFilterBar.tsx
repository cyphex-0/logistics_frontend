"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShipmentStatus } from "@/types/api";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { MobileFilterSheet } from "@/components/shared/MobileFilterSheet";

export function ShipmentFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSearch = searchParams.get("q") || "";
  const initialStatus = searchParams.get("status") || "ALL";
  const initialSort = searchParams.get("sort") || "newest";

  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL" && value !== "newest") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (name !== "sort") {
        params.set("page", "1"); // Reset to page 1 on filter change, but not on sort change
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentQ = params.get("q") || "";
    if (currentQ !== debouncedSearch) {
      router.push(`?${createQueryString("q", debouncedSearch)}`);
    }
  }, [debouncedSearch, createQueryString, router, searchParams]);

  const handleStatusChange = (value: string) => {
    router.push(`?${createQueryString("status", value)}`);
  };

  const handleSortChange = (value: string) => {
    router.push(`?${createQueryString("sort", value)}`);
  };

  const filters = (
    <>
      <div className="w-full sm:w-[200px]">
        <Select value={initialStatus} onValueChange={(val) => handleStatusChange(val || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status">{initialStatus === "ALL" ? "All Statuses" : (initialStatus as string).replace(/_/g, " ")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {Object.values(ShipmentStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-[180px]">
        <Select value={initialSort} onValueChange={(val) => handleSortChange(val || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by">{initialSort === "createdAt:desc" ? "Newest First" : initialSort === "createdAt:asc" ? "Oldest First" : initialSort === "status:asc" ? "Status (A-Z)" : "Status (Z-A)"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by tracking number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex gap-4">
        {filters}
      </div>

      {/* Mobile Filters */}
      <MobileFilterSheet>
        <div className="flex flex-col gap-4">
          {filters}
        </div>
      </MobileFilterSheet>
    </div>
  );
}


