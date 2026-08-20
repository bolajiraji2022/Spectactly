import type { ReactNode } from "react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { VideoPanel } from "@/components/VideoPanel";
import { GlassCard } from "@/components/GlassCard";
import { Timeline } from "@/components/Timeline";
import { Estimator } from "@/components/Estimator";
import { WhyItWorks } from "@/components/WhyItWorks";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

const DELIVERABLES = [
  {
    title: "Interactive walkthrough",
    body: "Move room to room at your own pace, same as being there.",
  },
  {
    title: "Overhead layout view",
    body: "See the whole floorplate at once, spatial relationships instantly clear.",
  },
  {
    title: "Measured dimensions",
    body: "Pull measurements off any wall, door, or opening directly in the tour.",
  },
];

function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-[640px]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-text md:text-[40px]">
        {title}
      </h2>
      {copy ? (
        <p className="mt-3 text-[17px] leading-[1.7] text-[var(--text-dim)]">{copy}</p>
      ) : null}
    </Reveal>
  );
}

export default function Page() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />

        <section className="pb-24 pt-4 md:pb-32">
          <Shell>
            <VideoPanel />
          </Shell>
        </section>

        <section id="service" className="py-24 md:py-32">
          <Shell>
            <SectionHead eyebrow="The deliverable" title="What you get" />
            <div className="grid gap-4 md:grid-cols-3">
              {DELIVERABLES.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <GlassCard className="h-full p-6 sm:p-7">
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-text">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-[1.7] text-[var(--text-dim)]">
                      {item.body}
                    </p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </Shell>
        </section>

        <section id="process" className="py-24 md:py-32">
          <Shell>
            <SectionHead
              eyebrow="From site to screen"
              title="Four steps. One engagement."
            />
            <Timeline />
          </Shell>
        </section>

        <section id="pricing" className="py-24 md:py-32">
          <Shell>
            <SectionHead
              eyebrow="Indicative pricing"
              title="Estimate your capture"
              copy="Move the slider and choose the capture detail. The number updates instantly. It is a starting point, not a commitment."
            />
            <Reveal>
              <Estimator />
            </Reveal>
          </Shell>
        </section>

        <section className="py-24 md:py-32">
          <Shell>
            <SectionHead eyebrow="The difference" title="Why it works" />
            <WhyItWorks />
          </Shell>
        </section>

        <section id="contact" className="pb-24 pt-24 md:pb-32 md:pt-32">
          <Shell>
            <SectionHead
              eyebrow="Start a project"
              title="Request a quote"
              copy="Tell us about the space. We will come back with a firm number."
            />
            <Reveal>
              <ContactForm />
            </Reveal>
          </Shell>
        </section>
      </main>
      <Footer />
    </>
  );
}
