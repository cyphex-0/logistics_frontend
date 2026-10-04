import { Metadata } from "next";
import { CTASection } from "@/components/public/CTASection";
import { Store, Building2, HeartPulse, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Industry Solutions | Shiply",
  description: "Specialized logistics solutions for E-commerce, B2B, Healthcare, and Retail industries.",
};

export default function SolutionsPage() {
  const industries = [
    {
      icon: <Store className="h-8 w-8" />,
      title: "E-Commerce",
      description: "Integrate directly with Shopify, WooCommerce, and custom platforms to automate fulfillment. Benefit from our volume discounts and automated return label generation.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "B2B & Enterprise",
      description: "Dedicated account managers, custom billing cycles, and API access for seamless integration into your existing ERP and warehouse management systems.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "Healthcare",
      description: "Temperature-controlled transport, HIPAA-compliant data handling, and specialized delivery protocols for pharmaceuticals and medical devices.",
      image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Retail & Omnichannel",
      description: "Ship-from-store capabilities, same-day local delivery for retail locations, and consolidated reverse logistics for simplified returns.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for your industry.</h1>
          <p className="text-lg text-muted-foreground">
            Whether you&apos;re shipping medical supplies, managing an e-commerce empire, or running a local retail chain, Shiply has specialized workflows designed for your exact needs.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="space-y-24">
            {industries.map((industry, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`order-2 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    {industry.icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{industry.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {industry.description}
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/contact">
                      Talk to Sales <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`order-1 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} aspect-video rounded-3xl overflow-hidden shadow-2xl`}>
                  <img 
                    src={industry.image} 
                    alt={industry.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Banner */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Developer First API</h2>
          <p className="text-xl opacity-90 mb-10">
            Automate your entire logistics pipeline using our robust REST APIs. From rate calculation to label generation and webhook tracking.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/auth/register">Get API Keys</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary border-primary-foreground">
              <Link href="#">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
