export function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mb-8">Customer Story</p>
          <blockquote className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            &ldquo;Shiply gives us the clarity to make decisions before a delay becomes a problem.&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold text-white">Maya Rahman</p>
              <p className="text-slate-400 text-sm">Director of Operations, Vela Commerce</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
