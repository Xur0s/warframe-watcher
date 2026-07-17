import savePreferences from "../api/preferences.js";
import getDeviceId from "./deviceId.js";

async function savePreference(preference) {
  const deviceId = await getDeviceId();

  await savePreferences(deviceId, normalizePreference(preference));
}

function normalizePreference(preference) {
  return {
    planet: preference.planet ?? null,
    node: preference.node ?? null,
    enemy_faction: preference.enemyFaction ?? null,
    mission_type: preference.missionType ?? null,
    tier: preference.relic ?? null,
    is_storm: false,
    is_hard:
      preference.difficulty && preference.difficulty === "Steel Path"
        ? true
        : false,
  };
}

export default savePreference;
