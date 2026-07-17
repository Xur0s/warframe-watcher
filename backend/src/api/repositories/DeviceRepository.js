import apiPool from "../db/apiDb.js";

// Queries the SQL database server to handle various tasks relating to the devices table
class DeviceRepository {
  static schema = "app_data";
  static table = `${DeviceRepository.schema}.devices`;

  async upsert(deviceId, expoPushToken) {
    const { rows } = await apiPool.query(
      `
        INSERT INTO ${DeviceRepository.table} (
            device_id,
            expo_push_token
        )
        VALUES ($1, $2)
        ON CONFLICT (device_id)
        DO UPDATE
        SET
            expo_push_token = EXCLUDED.expo_push_token,
            last_seen = NOW()
        RETURNING *;
      `,
      [deviceId, expoPushToken],
    );

    return rows[0];
  }

  async findById(deviceId) {
    const { rows } = await apiPool.query(
      `
        SELECT * FROM ${DeviceRepository.table}
        WHERE device_id = $1
      `,
      [deviceId],
    );

    return rows[0] ?? null;
  }

  async updateLastSeen(device_id) {
    const { rows } = await apiPool.query(
      `
        UPDATE ${DeviceRepository.table}
        SET last_seen = NOW()
        WHERE device_id = $1
        RETURNING *;
      `,
    );

    return rows[0] ?? null;
  }

  async delete(deviceId) {
    const { rowCount } = await apiPool.query(
      `
        DELETE FROM ${DeviceRepository.table}
        WHERE device_id = $1
      `,
      [deviceId],
    );

    return rowCount > 0;
  }
}

export default DeviceRepository;
