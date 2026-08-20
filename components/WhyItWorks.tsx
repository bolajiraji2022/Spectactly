"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";

const STATS = [
  {
    value: 3,
    suffix: "x",
    caption: "longer engagement than static images",
  },
  {
    value: 48,
    suffix: "h",
    caption: "from capture to live tour",
  },
  {
    value: 1,
    suffix: ":1",
    caption: "dimensional accuracy to the real space",
  },
];

export function WhyItWorks() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {STATS.map((stat, i) => (
        <Reveal key={stat.caption} delay={i * 0.1}>
          <StatPanel {...stat} />
        </Reveal>
      ))}
    </div>
  );
}

function StatPanel({
  value,
  suffix,
  caption,
}: {
  value: number;
  suffix: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(value);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setShown(value);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <GlassCard className="h-full p-6 sm:p-8">
      <div ref={ref}>
        <p className="gradient-text text-[48px] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-[56px]">
          {Math.round(shown)}
          {suffix}
        </p>
        <p className="mt-4 text-[16px] leading-[1.7] text-[var(--text-dim)]">
          {caption}
        </p>
      </div>
    </GlassCard>
  );
}
