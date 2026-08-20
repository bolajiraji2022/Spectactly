type Star = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  twinkle: boolean;
};

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS: Star[] = Array.from({ length: 250 }, (_, i) => {
  const rnd = mulberry32(0x9e3779b9 + i * 97);
  return {
    left: rnd() * 100,
    top: rnd() * 100,
    size: rnd() < 0.62 ? 1 : 2,
    opacity: 0.15 + rnd() * 0.45,
    duration: 4 + rnd() * 4,
    delay: rnd() * 8,
    twinkle: i % 13 === 0,
  };
});

export function Starfield() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star, i) => (
        <div
          key={i}
          className={star.twinkle ? "star-twinkle absolute rounded-full bg-white" : "absolute rounded-full bg-white"}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            ["--star-opacity" as string]: star.opacity,
            animationDuration: star.twinkle ? `${star.duration}s` : undefined,
            animationDelay: star.twinkle ? `${star.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
