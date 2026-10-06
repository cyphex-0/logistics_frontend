"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types/api";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";

import { MobileFilterSheet } from "@/components/shared/MobileFilterSheet";

export function UserFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSearch = searchParams.get("q") || "";
  const initialRole = searchParams.get("role") || "ALL";

  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.set("page", "1");
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

  const handleRoleChange = (value: string) => {
    router.push(`?${createQueryString("role", value)}`);
  };

  const filters = (
    <div className="w-full sm:w-[200px]">
      <Select value={initialRole} onValueChange={(val) => handleRoleChange(val || "")}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by role">{initialRole === "ALL" ? "All Roles" : initialRole}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          {Object.values(UserRole).map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
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

