"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin.service";
import { Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

type ExportType = 'shipments' | 'users' | 'payments' | 'audit-logs';

const EXPORT_OPTIONS: { id: ExportType; title: string; description: string }[] = [
  { id: 'shipments', title: 'Export Shipments', description: 'Download all shipment records including status, origin, destination, and courier.' },
  { id: 'users', title: 'Export Users', description: 'Download user data (customers, couriers, and admins).' },
  { id: 'payments', title: 'Export Payments', description: 'Download payment transactions. Sensitive credentials are automatically excluded.' },
  { id: 'audit-logs', title: 'Export Audit Logs', description: 'Download system audit trails (requires admin privileges).' },
];

export function ExportDataCard() {
  const [isExporting, setIsExporting] = useState<ExportType | null>(null);

  const handleExport = async (type: ExportType) => {
    setIsExporting(type);
    try {
      const data = await adminService.exportData(type);
      
      if (!data || data.length === 0) {
        toast.error("No Data", {
          description: `There is no data to export for ${type}.`,
        });
        return;
      }

      // Helper function to flatten nested objects for CSV
      const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
        return Object.keys(obj).reduce((acc: Record<string, unknown>, k: string) => {
          const pre = prefix.length ? prefix + '_' : '';
          
          if (obj[k] === null || obj[k] === undefined) {
            acc[pre + k] = '';
          } else if (typeof obj[k] === 'object' && !Array.isArray(obj[k]) && !(obj[k] instanceof Date)) {
            Object.assign(acc, flattenObject(obj[k] as Record<string, unknown>, pre + k));
          } else if (Array.isArray(obj[k])) {
            acc[pre + k] = JSON.stringify(obj[k]);
          } else {
            acc[pre + k] = obj[k];
          }
          return acc;
        }, {});
      };

      const flattenedData = data.map(item => flattenObject(item));
      const headers = Object.keys(flattenedData[0]);

      const csvContent = [
        headers.join(','),
        ...flattenedData.map(row => 
          headers.map(header => {
            let cell = row[header] === null || row[header] === undefined ? '' : String(row[header]);
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          }).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      const dateStr = new Date().toISOString().split('T')[0];
      link.setAttribute('href', url);
      link.setAttribute('download', `${type}_export_${dateStr}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Export Successful", {
        description: `Successfully downloaded ${data.length} records.`,
      });
    } catch (error) {
      console.error("Export failed", error);
      toast.error("Export Failed", {
        description: "An error occurred while generating the export.",
      });
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {EXPORT_OPTIONS.map((option) => (
        <Card key={option.id} className="flex flex-col h-full">
          <CardHeader className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
              {option.title}
            </CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button 
              onClick={() => handleExport(option.id)}
              disabled={isExporting !== null}
            >
              {isExporting === option.id ? (
                <>Generating CSV...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
