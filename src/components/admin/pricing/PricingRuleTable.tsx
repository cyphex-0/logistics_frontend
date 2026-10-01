"use client";

import { PricingRule } from "@/services/pricing.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { RuleScopeBadge } from "./RuleScopeBadge";

interface PricingRuleTableProps {
  rules: PricingRule[];
  onEdit: (rule: PricingRule) => void;
}

export function PricingRuleTable({ rules, onEdit }: PricingRuleTableProps) {
  return (
    <div className="md:rounded-md md:border">
      <Table mobileCards={true}>
        <TableHeader>
          <TableRow>
            <TableHead>Service Type</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>Zone Name</TableHead>
            <TableHead className="text-right">Base Price</TableHead>
            <TableHead className="text-right">Price / KG</TableHead>
            <TableHead className="text-right">Max Weight</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No pricing rules found.
              </TableCell>
            </TableRow>
          ) : (
            rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium capitalize" data-label="Service Type">{rule.serviceType.replace("_", " ")}</TableCell>
                <TableCell data-label="Scope">
                  <RuleScopeBadge zoneId={rule.zone?.id} />
                </TableCell>
                <TableCell data-label="Zone Name">
                  {rule.zone?.name || "All Zones"}
                </TableCell>
                <TableCell className="text-right" data-label="Base Price">${Number(rule.basePrice).toFixed(2)}</TableCell>
                <TableCell className="text-right" data-label="Price / KG">${Number(rule.pricePerKg).toFixed(2)}</TableCell>
                <TableCell className="text-right" data-label="Max Weight">{Number(rule.maxWeight)} KG</TableCell>
                <TableCell className="text-right" data-label="Actions">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(rule)}>
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
