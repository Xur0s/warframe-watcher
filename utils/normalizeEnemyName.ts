import { enemies } from "@/constants/enemy";

export function normalizeEnemyName(
  name: string,
  planet_name: string
): keyof typeof enemies {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "_");

  switch (planet_name) {
    case "kuva_fortress":
      return "kuva_grineer" as keyof typeof enemies;
    default:
      return normalized as keyof typeof enemies;
  }
}
