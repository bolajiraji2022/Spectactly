"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { estimatePrice, formatSqft, formatUsd } from "@/lib/format";
import { scrollToId } from "@/lib/scroll";

const MIN_SQFT = 500;
const MAX_SQFT = 20_000;
const STEP = 100;

const LEVELS = [
  { id: "standard", label: "Standard", rate: 0.16 },
  { id: "detailed", label: "Detailed", rate: 0.22 },
  { id: "survey", label: "Survey-grade", rate: 0.35 },
] as const;

type LevelId = (typeof LEVELS)[number]["id"];

export function Estimator() {
  const [sqft, setSqft] = useState(2500);
  const [level, setLevel] = useState<LevelId>("standard");
  const reduce = useReducedMotion();

  const rate = LEVELS.find((item) => item.id === level)?.rate ?? 0.16;
  const target = useMemo(() => estimatePrice(sqft, rate), [sqft, rate]);
  const display = useAnimatedNumber(target, reduce ? 0 : 520);
  const fill = ((sqft - MIN_SQFT) / (MAX_SQFT - MIN_SQFT)) * 100;

  const requestQuote = () => {
    try {
      sessionStorage.setItem("spectacly-sqft", String(sqft));
    } catch {
      /* ignore */
    }
    scrollToId("contact");
  };

  return (
    <GlassCard hover={false} className="p-6 sm:p-8 md:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[14px] text-[var(--text-dim)]">Capture area</p>
          <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-text">
            {formatSqft(sqft)}
          </p>
        </div>
      </div>

      <label className="mt-6 block">
        <span className="sr-only">Square footage</span>
        <input
          type="range"
          min={MIN_SQFT}
          max={MAX_SQFT}
          step={STEP}
          value={sqft}
          onChange={(e) => setSqft(Number(e.target.value))}
          className="range mt-2"
          style={{ ["--p" as string]: `${fill}%` }}
          aria-valuemin={MIN_SQFT}
          aria-valuemax={MAX_SQFT}
          aria-valuenow={sqft}
          aria-valuetext={formatSqft(sqft)}
        />
        <span className="mt-2 flex justify-between text-[12px] tabular-nums text-[var(--text-faint)]">
          <span>{formatSqft(MIN_SQFT)}</span>
          <span>{formatSqft(MAX_SQFT)}</span>
        </span>
      </label>

      <div
        role="radiogroup"
        aria-label="Capture detail"
        className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {LEVELS.map((item) => {
          const selected = item.id === level;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setLevel(item.id)}
              className={`glass rounded-[20px] px-4 py-3 text-[14px] font-medium transition-[background-color,border-color] duration-300 ${
                selected
                  ? "border-white/16 bg-white/[0.07] text-text"
                  : "text-[var(--text-dim)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center">
        <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
          Indicative fee
        </p>
        <p
          className="gradient-text mt-2 min-h-[1.1em] min-w-[9ch] text-center text-[56px] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-[72px]"
          aria-live="polite"
        >
          {formatUsd(display)}
        </p>
        <p className="mt-5 max-w-[520px] text-center text-[14px] leading-[1.7] text-[var(--text-faint)]">
          Indicative only. Final pricing depends on site conditions, access, and
          level of detail. Request a quote for a firm number.
        </p>
        <button
          type="button"
          onClick={requestQuote}
          className="cta-gradient mt-8 rounded-[20px] px-6 py-3 text-[15px] font-semibold"
        >
          Request a quote
        </button>
      </div>
    </GlassCard>
  );
}

function useAnimatedNumber(target: number, duration: number): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (duration <= 0) {
      current.current = target;
      setValue(target);
      return;
    }

    const from = current.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const next = from + (target - from) * eased;
      current.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        current.current = target;
        setValue(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
