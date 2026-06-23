import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Problem } from "@/components/landing/Problem";
import { ValueProps } from "@/components/landing/ValueProps";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { BuiltFor } from "@/components/landing/BuiltFor";
import { Benefits } from "@/components/landing/Benefits";
import { Roadmap } from "@/components/landing/Roadmap";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "Jeevana — Your Entire Life, Organized In One Conversation" },
        {
          name: "description",
          content:
            "Jeevana is an AI Life Operating System. Log activities, expenses, reminders, and habits through natural conversation.",
        },
        { property: "og:title", content: "Jeevana — AI Life Operating System" },
        {
          property: "og:description",
          content: "Ceritakan harimu, Jeevana akan mengurus sisanya.",
        },
      ],
    }),
    component: Landing,
  },
);

function Landing() {
  return (
    <div id="main-content" className="min-h-screen bg-canvas font-sans text-ink selection:bg-brand/20">
      <Nav />
      <Hero />
      <Stats />
      <Problem />
      <ValueProps />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <BuiltFor />
      <Benefits />
      <Roadmap />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

