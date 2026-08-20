"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import { GlassCard } from "@/components/GlassCard";

const STATS = [
  "Sub-centimetre accuracy",
  "48-hour delivery",
  "Runs in any browser",
];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.09 },
  });

  return (
    <section className="flex min-h-[92vh] items-center justify-center px-5 pb-16 pt-28 sm:px-8">
      <div className="mx-auto flex w-full max-w-[800px] flex-col items-center text-center">
        <motion.p className="eyebrow" {...fade(0)}>
          Spatial capture and conversion
        </motion.p>
        <motion.h1
          className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.03em] text-text md:text-[60px]"
          {...fade(1)}
        >
          We scan the space. You get the tour.
        </motion.h1>
        <motion.p
          className="mt-5 max-w-[640px] text-[17px] leading-[1.7] text-[var(--text-dim)]"
          {...fade(2)}
        >
          Millimetre-accurate 3D capture converted into an interactive
          walkthrough anyone can explore from a browser. One engagement, one
          fee, yours to keep.
        </motion.p>
        <motion.div
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
          {...fade(3)}
        >
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="cta-gradient w-full rounded-[20px] px-6 py-3 text-[15px] font-semibold sm:w-auto"
          >
            Request a quote
          </button>
          <button
            type="button"
            onClick={() => scrollToId("pricing")}
            className="glass glass-interactive w-full rounded-[20px] px-6 py-3 text-[15px] font-medium text-text sm:w-auto"
          >
            Estimate cost
          </button>
        </motion.div>
        <motion.div className="mt-12 w-full max-w-[720px]" {...fade(4)}>
          <GlassCard
            hover={false}
            className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0"
          >
            {STATS.map((stat) => (
              <p
                key={stat}
                className="flex-1 px-5 py-4 text-[14px] leading-snug text-[var(--text-dim)] md:py-5"
              >
                {stat}
              </p>
            ))}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
