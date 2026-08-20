"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/GlassCard";

const STEPS = [
  {
    title: "Site capture",
    body: "We scan on location; a typical property takes 1–3 hours.",
  },
  {
    title: "Point cloud processing",
    body: "Captures register into a single dimensionally accurate model.",
  },
  {
    title: "Tour conversion",
    body: "The model becomes a browser-based walkthrough with navigation and measurement.",
  },
  {
    title: "Delivery",
    body: "You get a link and embed code within 48 hours; it's yours permanently.",
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute bottom-6 left-[23px] top-6 w-px bg-white/[0.08]"
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[23px] top-6 origin-top bg-[linear-gradient(180deg,#A78BFA,#67E8F9)]"
        style={{ width: 1, height: "calc(100% - 48px)" }}
        initial={{ scaleY: reduce ? 1 : 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : undefined}
        transition={{ duration: reduce ? 0.6 : 1.15, ease: "easeOut" }}
        aria-hidden="true"
      />
      <ol className="relative space-y-5">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            className="flex items-stretch gap-5"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
          >
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#A78BFA,#67E8F9)] text-[15px] font-semibold tabular-nums text-[#050507] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
              {i + 1}
            </div>
            <GlassCard className="flex-1 p-5 sm:p-6">
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.7] text-[var(--text-dim)]">
                {step.body}
              </p>
            </GlassCard>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
