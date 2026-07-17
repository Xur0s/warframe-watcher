import apiPool from "../db/apiDb.js";

// Queries the SQL database server to find user preferences that match a given mission
// uses multiple tables to acomplish queries (device table, preferences table)
class NotificationRepository {
  static schema = "app_data";
  static device_table = `${NotificationRepository.schema}.devices`;
  static preference_table = `${NotificationRepository.schema}.fissure_preferences`;

  async findExpoPushTokensMatchingMission(mission) {
    // Format mission keys
    const relevantKeys = this.getRelevantKeys(mission);

    // Query checks if all the keys of the mission matches the preference of each device
    // If the preference key for a user is NULL then it matches that key
    const { rows } = await apiPool.query(
      `
        SELECT DISTINCT d.expo_push_token
        FROM ${NotificationRepository.preference_table} as p
        JOIN ${NotificationRepository.device_table} as d
            ON p.device_id = d.device_id
        WHERE
            (p.planet IS NULL OR p.planet = $1)
        AND (p.node IS NULL or p.node = $2)
        AND (p.enemy_faction IS NULL or p.enemy_faction = $3)
        AND (p.mission_type IS NULL or p.mission_type = $4)
        AND (p.tier IS NULL or p.tier = $5)
        AND (p.is_storm IS NULL OR p.is_storm = $6)
        AND (p.is_hard IS NULL or p.is_hard = $7)  
      `,
      [
        relevantKeys.planet,
        relevantKeys.node,
        relevantKeys.enemy_faction,
        relevantKeys.mission_type,
        relevantKeys.tier,
        relevantKeys.is_storm,
        relevantKeys.is_hard,
      ],
    );

    return rows.map((r) => r.expo_push_token);
  }

  getRelevantKeys(mission) {
    // Only get keys which filters holds
    // otherwise an error occurs during SQL query
    return {
      planet: mission.planet,
      node: mission.node,
      enemy_faction: mission.enemy_faction,
      mission_type: mission.mission_type,
      tier: mission.tier,
      is_storm: mission.is_storm,
      is_hard: mission.is_hard,
    };
  }
}

export default NotificationRepository;
