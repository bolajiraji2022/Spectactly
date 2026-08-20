export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatSqft(value: number): string {
  return `${new Intl.NumberFormat("en-US").format(value)} sq ft`;
}

export function estimatePrice(sqft: number, rate: number): number {
  const raw = sqft * rate;
  const rounded = Math.round(raw / 10) * 10;
  return Math.max(450, rounded);
}
