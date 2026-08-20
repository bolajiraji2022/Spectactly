import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function GlassCard({
  hover = true,
  className = "",
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={`glass ${hover ? "glass-hover" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
