import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 px-4 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4 flex items-center gap-2">
              <span className="text-primary">GLOBAL FREIGHT</span>
              <span>•</span>
              <span>LIVE CONTROL</span>
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Shipments move. <br /> You see everything.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              One manifest. Every handoff visible. Shiply connects road, ocean, air, and last mile in one continuous view.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg" })}>
                Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/tracking" className={buttonVariants({ size: "lg", variant: "outline", className: "h-14 px-8 text-lg" })}>
                Track Shipment
              </Link>
            </div>
          </div>

          {/* Right Mock Card */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mb-1">Shipment ID</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">SH-123456</h3>
                </div>
                <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-medium border border-red-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  LIVE
                </div>
              </div>

              {/* Animated Map visualization */}
              <div className="relative h-48 w-full mt-10 mb-8">
                {/* SVG Route */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                  <path 
                    d="M 20 80 Q 100 20 200 80 T 380 60" 
                    fill="transparent" 
                    stroke="#334155" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeDasharray="8 8"
                  />
                  {/* Animated path overlay */}
                  <path 
                    d="M 20 80 Q 100 20 200 80 T 380 60" 
                    fill="transparent" 
                    stroke="#6366f1" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="animate-[dash_3s_linear_infinite]"
                    style={{ strokeDasharray: '400', strokeDashoffset: '400' }}
                  />
                  <style>
                    {`
                      @keyframes dash {
                        to {
                          stroke-dashoffset: 0;
                        }
                      }
                    `}
                  </style>
                  
                  {/* Nodes */}
                  {/* Origin */}
                  <circle cx="20" cy="80" r="6" fill="#6366f1" />
                  <text x="20" y="105" fill="#94a3b8" fontSize="12" textAnchor="middle">Khulna</text>
                  
                  {/* Waypoint */}
                  <circle cx="200" cy="80" r="6" fill="#6366f1" />
                  <circle cx="200" cy="80" r="14" fill="#6366f1" opacity="0.2" className="animate-pulse" />
                  <text x="200" y="55" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">In Transit</text>
                  
                  {/* Destination */}
                  <circle cx="380" cy="60" r="6" fill="#334155" />
                  <text x="380" y="85" fill="#94a3b8" fontSize="12" textAnchor="middle">Dhaka</text>
                </svg>

                {/* Truck/Ship icon moving along path - static positioned at waypoint for now, or could animate */}
                <div className="absolute top-[35px] left-[48%] -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 p-1.5 rounded-full shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              {/* Status Footer */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                <div>
                  <p className="text-slate-400 text-xs font-medium uppercase mb-1">Current Signal</p>
                  <p className="text-white font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> On the way
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs font-medium uppercase mb-1">Position</p>
                  <p className="text-white font-mono text-sm">
                    34.9100° N<br/>67.019° E
                  </p>
                </div>
              </div>
            </div>
            
            {/* Background decorative glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent opacity-20 blur-2xl -z-10 rounded-[3rem]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
