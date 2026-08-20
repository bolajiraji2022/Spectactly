export function Footer() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-[1120px] px-5 pb-10 pt-4 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.09] pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:flex-row sm:items-center">
        <p className="text-[15px] font-semibold tracking-tight text-text">Spectacly</p>
        <a
          href="mailto:hello@spectacly.com"
          className="text-[14px] text-[var(--text-dim)] transition-colors hover:text-text"
        >
          hello@spectacly.com
        </a>
        <p className="text-[13px] text-[var(--text-faint)]">
          &copy; {new Date().getFullYear()} Spectacly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
