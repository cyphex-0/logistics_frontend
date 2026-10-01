import { Metadata } from "next";
import { CTASection } from "@/components/public/CTASection";
import { HelpCircle, Mail, MapPin, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support | Shiply",
  description: "Get help with your shipments, learn about account-based support, and check platform health.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact & Support</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Information and resources to help you manage your shipments and account effectively.
          </p>
        </div>
      </section>

      {/* Support Information */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Support Channels</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Support</h3>
                    <p className="text-muted-foreground mb-2">General inquiries and non-urgent support.</p>
                    <a href="mailto:support@example.com" className="text-primary hover:underline font-medium">support@example.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Account-Based Support</h3>
                    <p className="text-muted-foreground">Registered users receive contextual support and automated shipment notifications directly to their account email.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Headquarters</h3>
                    <p className="text-muted-foreground">
                      Logistics Tech Hub<br />
                      Innovation District<br />
                      Global Operations Center
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Status */}
            <div className="p-8 rounded-2xl border bg-muted/30 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-8 w-8 text-green-500" />
                <h2 className="text-2xl font-bold">Platform Health</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-background rounded-lg border">
                  <span className="font-medium">API Services</span>
                  <span className="text-green-500 text-sm font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Operational
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-background rounded-lg border">
                  <span className="font-medium">Web App</span>
                  <span className="text-green-500 text-sm font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Operational
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-background rounded-lg border">
                  <span className="font-medium">Payment Gateway</span>
                  <span className="text-green-500 text-sm font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Operational
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                System status is continuously monitored by our admin operations team to ensure maximum uptime.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
}
