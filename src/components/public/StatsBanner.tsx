"use client";

import { useEffect, useState } from "react";

interface PublicStats {
  totalShipments: number;
  deliveredShipments: number;
  onTimeRate: number;
  countries: number;
  tracking: string;
}

export function StatsBanner() {
  const [statsData, setStatsData] = useState<PublicStats>({
    totalShipments: 0,
    deliveredShipments: 0,
    onTimeRate: 0,
    countries: 0,
    tracking: "24/7",
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json?.data) {
          setStatsData({
            totalShipments: json.data.totalShipments ?? 0,
            deliveredShipments: json.data.deliveredShipments ?? 0,
            onTimeRate: json.data.onTimeRate ?? 0,
            countries: json.data.countries ?? 0,
            tracking: json.data.tracking ?? "24/7",
          });
        }
      } catch {
        // Fallback remains accurate zero-state
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { value: `${statsData.onTimeRate}%`, label: "on-time delivery" },
    { value: statsData.countries.toLocaleString(), label: "countries" },
    { value: statsData.totalShipments.toLocaleString(), label: "shipments handled" },
    { value: statsData.tracking, label: "tracking" },
  ];

  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center px-4 md:px-8 ${
                idx !== 0 && idx !== 2 ? "border-l border-slate-800" : ""
              } ${idx === 2 ? "md:border-l md:border-slate-800" : ""} ${
                idx === 0 || idx === 2 ? "pl-0 md:pl-8" : ""
              } ${idx === 0 ? "md:pl-0" : ""}`}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium text-xs sm:text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
