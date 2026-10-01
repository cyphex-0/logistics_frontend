"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { usePricingRules } from "@/lib/query/pricing";
import { PricingRule } from "@/services/pricing.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PricingRuleTable } from "@/components/admin/pricing/PricingRuleTable";
import { PricingRuleForm } from "@/components/admin/pricing/PricingRuleForm";

export function PricingManagement() {
  const { data: rulesData, isLoading, error } = usePricingRules();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);

  const rules = rulesData || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Pricing Rules</CardTitle>
          <CardDescription>
            Manage default and zone-specific pricing rules for different service types.
          </CardDescription>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Pricing Rule</DialogTitle>
              <DialogDescription>
                Create a new pricing rule for a specific service type and optional zone.
              </DialogDescription>
            </DialogHeader>
            <PricingRuleForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-sm text-muted-foreground">Loading pricing rules...</div>
        ) : error ? (
          <div className="py-6 text-center text-sm text-red-500">Failed to load pricing rules</div>
        ) : (
          <PricingRuleTable rules={rules} onEdit={setEditingRule} />
        )}
      </CardContent>

      <Dialog open={!!editingRule} onOpenChange={(open) => !open && setEditingRule(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pricing Rule</DialogTitle>
            <DialogDescription>
              Update pricing parameters for this rule.
            </DialogDescription>
          </DialogHeader>
          {editingRule && (
            <PricingRuleForm 
              initialData={editingRule} 
              onSuccess={() => setEditingRule(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
