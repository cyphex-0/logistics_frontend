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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex flex-col justify-center px-4 md:px-8 ${idx !== 0 && idx !== 2 ? 'border-l border-slate-800' : ''} ${idx === 2 ? 'md:border-l md:border-slate-800' : ''} ${idx === 0 || idx === 2 ? 'pl-0 md:pl-8' : ''} ${idx === 0 ? 'md:pl-0' : ''}`}>
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
