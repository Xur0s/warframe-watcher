import apiPool from "../db/apiDb.js";

// Queries the SQL database server to handle various tasks relating to the preferences table
class PreferenceRepository {
  static schema = "app_data";
  static table = `${PreferenceRepository.schema}.fissure_preferences`;

  async upsert(deviceId, preference) {
    const { rows } = await apiPool.query(
      `
        INSERT INTO ${PreferenceRepository.table} (
          device_id,
          planet,
          node,
          enemy_faction,
          mission_type,
          tier,
          is_storm,
          is_hard
        )
        VALUES (
          $1, 
          $2, 
          $3, 
          $4, 
          $6, 
          $5, 
          $7, 
          $8
        )
        RETURNING *;
      `,
      [
        deviceId,
        preference.planet,
        preference.node,
        preference.enemy_faction,
        preference.mission_type,
        preference.tier,
        preference.is_storm,
        preference.is_hard,
      ],
    );

    return rows[0];
  }

  async findById(deviceId) {
    const { rows } = await apiPool.query(
      `
        SELECT * FROM ${PreferenceRepository.table}
        WHERE device_id = $1
      `,
      [deviceId],
    );

    return rows ?? null;
  }

  async delete(preferenceId) {
    const { rowCount } = await apiPool.query(
      `
        DELETE FROM ${PreferenceRepository.table}
        WHERE preference_id = $1
      `,
      [preferenceId],
    );

    return rowCount > 0;
  }
}

export default PreferenceRepository;
