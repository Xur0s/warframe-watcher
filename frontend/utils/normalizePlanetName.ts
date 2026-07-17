import { planets } from "@/constants/planet";

export function normalizePlanetName(name: string): keyof typeof planets {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "_");

  switch (normalized) {
    case "void":
      return "wf_void" as keyof typeof planets;
    default:
      return normalized as keyof typeof planets;
  }
}
