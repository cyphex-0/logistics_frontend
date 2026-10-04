import { Metadata } from "next";
import { RoleCard } from "@/components/public/RoleCard";
import { User, Truck, ShieldUser, Target, Globe, Zap, Award } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "About Us | Shiply",
  description: "Learn about our mission, platform roles, and our commitment to transparent and reliable logistics.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-muted/30 -z-10" />
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Redefining Modern Logistics.</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                We are a leading courier and logistics platform dedicated to providing fast, reliable, and secure delivery services. 
                Our platform connects customers with professional couriers, managed by advanced routing algorithms.
              </p>
              <div className="flex gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="text-3xl font-bold">10M+</h4>
                  <p className="text-sm text-muted-foreground">Deliveries completed</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="text-3xl font-bold">99.9%</h4>
                  <p className="text-sm text-muted-foreground">On-time delivery</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square h-full max-h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8ed74514f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Warehouse logistics" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6 bg-muted/50 rounded-xl">
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Speed</h3>
              <p className="text-muted-foreground text-sm">Lightning-fast deliveries powered by optimized routing algorithms.</p>
            </div>
            <div className="p-6 bg-muted/50 rounded-xl">
              <ShieldUser className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-muted-foreground text-sm">Every package is tracked, insured, and handled with utmost care.</p>
            </div>
            <div className="p-6 bg-muted/50 rounded-xl">
              <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Scale</h3>
              <p className="text-muted-foreground text-sm">Connecting local businesses to national and international markets.</p>
            </div>
            <div className="p-6 bg-muted/50 rounded-xl">
              <Award className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground text-sm">Award-winning customer service available 24/7 for all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Who uses our platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our ecosystem is built for three primary roles, each with dedicated tools and workflows.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard 
              icon={User}
              title="Customers"
              description="Create shipments, track packages in real-time, and manage delivery addresses from a unified dashboard."
              href="/auth/register"
              ctaText="Join as Customer"
            />
            <RoleCard 
              icon={Truck}
              title="Couriers"
              description="Accept delivery requests, optimize routes, update statuses, and manage earnings seamlessly."
              href="/auth/register"
              ctaText="Become a Courier"
            />
            <RoleCard 
              icon={ShieldUser}
              title="Administrators"
              description="Oversee platform operations, manage users, monitor system health, and ensure service quality."
              href="/auth/login"
              ctaText="Admin Portal"
            />
          </div>
        </div>
      </section>

      {/* Accountability Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl aspect-video h-full max-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Accountability and tracking" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Our Accountability Model</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                We believe in complete transparency. Every shipment has a strict lifecycle, from pending payment to delivery. 
                Customers have full visibility into the exact location and status of their packages at any given moment.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Payments are processed securely via Stripe, and our courier partners are held to high standards of reliability and punctuality.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> End-to-end transparent tracking</li>
                <li className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Automated route optimizations</li>
                <li className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Secured payment escrows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
}
