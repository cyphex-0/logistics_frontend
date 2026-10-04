import { Metadata } from "next";
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Shiply",
  description: "Join our team and help build the future of global logistics.",
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Backend Engineer",
      department: "Engineering",
      location: "New York (Hybrid)",
      type: "Full-time",
    },
    {
      title: "Logistics Operations Manager",
      department: "Operations",
      location: "London, UK",
      type: "Full-time",
    },
    {
      title: "Frontend Developer (React)",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
    },
    {
      title: "Enterprise Sales Executive",
      department: "Sales",
      location: "Chicago, IL",
      type: "Full-time",
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote (US)",
      type: "Full-time",
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Team collaborating" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container px-4 mx-auto relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Build the future of delivery.</h1>
          <p className="text-xl opacity-90 mb-8">
            We are looking for passionate, driven individuals to help us modernize global logistics and make commerce seamless for everyone.
          </p>
          <a href="#open-positions" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            View Open Positions
          </a>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-12">Life at Shiply</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="h-48 rounded-xl overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Remote work" />
              </div>
              <h3 className="text-xl font-bold mb-2">Work from anywhere</h3>
              <p className="text-muted-foreground">We are a remote-first company with hubs in major cities. Work where you feel most productive.</p>
            </div>
            <div>
              <div className="h-48 rounded-xl overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Benefits" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive benefits</h3>
              <p className="text-muted-foreground">Top-tier health insurance, generous equity packages, and 401(k) matching for all full-time employees.</p>
            </div>
            <div>
              <div className="h-48 rounded-xl overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Growth" />
              </div>
              <h3 className="text-xl font-bold mb-2">Continuous growth</h3>
              <p className="text-muted-foreground">Annual learning stipends, mentorship programs, and clear pathways for career advancement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-24 bg-muted/30 border-t">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Join our rapidly growing team. Don&apos;t see a perfect fit? Send your resume to careers@shiply.example.com</p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="bg-background border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow group">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full md:w-auto group-hover:bg-primary group-hover:text-primary-foreground">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
