import { Starfield } from "@/components/Starfield";

export function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#050507]" />
      <div className="absolute -left-[18%] -top-[22%] h-[min(720px,80vw)] w-[min(720px,80vw)] rounded-full bg-[#4C1D95]/[0.18] blur-[180px]" />
      <div className="absolute -bottom-[18%] -right-[14%] h-[min(680px,75vw)] w-[min(680px,75vw)] rounded-full bg-[#0E7490]/[0.14] blur-[180px]" />
      <Starfield />
    </div>
  );
}
