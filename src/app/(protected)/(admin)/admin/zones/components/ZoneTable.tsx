"use client";

import { Zone } from "@/services/zone.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ZoneStatusSwitch } from "./ZoneStatusSwitch";
import { ZoneDeleteDialog } from "./ZoneDeleteDialog";
import { ZoneEditDialog } from "./ZoneEditDialog";
import { Timestamp } from "@/components/shared/Timestamp";

export function ZoneTable({ zones }: { zones: Zone[] }) {
  if (zones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/50 rounded-lg border border-dashed">
        <p className="text-muted-foreground">No zones found.</p>
      </div>
    );
  }

  return (
    <div className="md:rounded-md md:border">
      <Table mobileCards={true}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Coverage Cities</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((zone) => (
            <TableRow key={zone.id}>
              <TableCell className="font-medium" data-label="Name">{zone.name}</TableCell>
              <TableCell data-label="Coverage Cities">
                <div className="flex flex-wrap gap-1">
                  {(zone.coverageCities || []).map(city => (
                    <span key={city} className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {city}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell data-label="Created At"><Timestamp date={zone.createdAt} /></TableCell>
              <TableCell data-label="Status">
                <ZoneStatusSwitch zone={zone} />
              </TableCell>
              <TableCell className="text-right flex items-center justify-end" data-label="Actions">
                <ZoneEditDialog zone={zone} />
                <ZoneDeleteDialog zone={zone} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
