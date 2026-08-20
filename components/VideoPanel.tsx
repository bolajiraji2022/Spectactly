"use client";

import { useCallback, useRef, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";

export function VideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().then(() => setPlaying(true)).catch(() => {
      setPlaying(false);
    });
  }, []);

  return (
    <Reveal scaleFrom={0.97} amount={0.3} className="w-full">
      <GlassCard hover={false} className="overflow-hidden !rounded-[24px] p-2 sm:p-3">
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-[#0a0a10]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/tour-poster.jpg"
            src="/tour-preview.mp4"
            playsInline
            muted
            loop
            preload="metadata"
            onPlay={() => setPlaying(true)}
          />
          <button
            type="button"
            onClick={play}
            aria-label="Play walkthrough"
            className={`glass absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-opacity duration-300 ${
              playing ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="ml-0.5">
              <path d="M8 5.5v11l9-5.5-9-5.5z" fill="#F4F4F5" />
            </svg>
          </button>
        </div>
      </GlassCard>
      <p className="mt-4 text-center text-[14px] text-[var(--text-faint)]">
        Recorded walkthrough of a completed scan.
      </p>
    </Reveal>
  );
}
