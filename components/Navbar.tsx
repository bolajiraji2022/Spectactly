"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  { href: "service", label: "Service" },
  { href: "process", label: "Process" },
  { href: "pricing", label: "Pricing" },
  { href: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
        <nav
          className={`flex h-16 w-full max-w-[1120px] items-center justify-between gap-4 px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-5 ${
            scrolled || open
              ? "glass"
              : "border border-transparent bg-transparent shadow-none"
          }`}
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-text"
          >
            <Mark />
            Spectacly
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => go(link.href)}
                  className="rounded-full px-3 py-2 text-[14px] text-[var(--text-dim)] transition-colors hover:text-text"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go("contact")}
              className="glass glass-interactive hidden rounded-full px-4 py-2 text-[13px] font-medium text-text sm:inline-flex"
            >
              Request a quote
            </button>
            <button
              type="button"
              className="glass glass-interactive inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <Hamburger open={open} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="glass fixed inset-0 z-40 flex flex-col rounded-none px-6 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((link, i) => (
                <li key={link.href}>
                  <motion.button
                    type="button"
                    onClick={() => go(link.href)}
                    className="w-full py-3 text-left text-[28px] font-semibold tracking-[-0.03em] text-text"
                    initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => go("contact")}
              className="cta-gradient w-full rounded-[20px] py-3.5 text-[15px] font-semibold"
            >
              Request a quote
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1.2" y="1.2" width="19.6" height="19.6" rx="6" stroke="url(#mark)" strokeWidth="1.4" />
      <rect x="5.4" y="5.4" width="11.2" height="11.2" rx="3" stroke="url(#mark)" strokeWidth="1.2" opacity="0.7" />
      <circle cx="11" cy="11" r="1.6" fill="#67E8F9" />
      <defs>
        <linearGradient id="mark" x1="1" y1="1" x2="21" y2="21">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#67E8F9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={open ? "M4 4l10 10M14 4L4 14" : "M3 5h12M3 9h12M3 13h12"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
