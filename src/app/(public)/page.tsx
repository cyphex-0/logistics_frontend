import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { ServicesGrid } from "@/components/public/ServicesGrid";
import { StatsBanner } from "@/components/public/StatsBanner";
import { ProcessSteps } from "@/components/public/ProcessSteps";
import { IndustriesGrid } from "@/components/public/IndustriesGrid";
import { TestimonialSection } from "@/components/public/TestimonialSection";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "Shiply | Fast & Reliable",
  description: "Next-generation logistics platform for individuals and businesses. Create shipments, pay securely, and track in real-time.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      <HeroSection />
      <ServicesGrid />
      <ProcessSteps />
      <StatsBanner />
      <IndustriesGrid />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
