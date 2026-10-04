import { Metadata } from "next";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Contact Us | Shiply",
  description: "Get in touch with our support and sales teams.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need technical support, have a question about enterprise pricing, or just want to say hello, our team is ready to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Customer support team" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                    <Mail className="h-5 w-5" /> Email
                  </div>
                  <p className="text-foreground">support@shiply.example.com</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                    <MessageSquare className="h-5 w-5" /> In-App Support
                  </div>
                  <p className="text-foreground">Available in your dashboard</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted/30 p-8 md:p-12 rounded-3xl border">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Provide as much detail as possible..." 
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="button" size="lg" className="w-full">
                  Submit Message
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
