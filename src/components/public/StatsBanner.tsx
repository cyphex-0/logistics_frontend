export function StatsBanner() {
  const stats = [
    { value: "98%", label: "on-time delivery" },
    { value: "120+", label: "countries" },
    { value: "4.2M", label: "shipments handled" },
    { value: "24/7", label: "tracking" },
  ];

  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className={`px-4 ${idx === 0 ? 'pl-0' : ''}`}>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
