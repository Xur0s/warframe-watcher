import { tiers } from "@/constants/tier";

export function normalizeTierName(name: string): keyof typeof tiers {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "_");

  switch (normalized) {
    default:
      return normalized as keyof typeof tiers;
  }
}
