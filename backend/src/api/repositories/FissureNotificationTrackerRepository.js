import apiPool from "../db/apiDb";

class FissureNotificationRepository {
  static schema = "app_data";
  static table = `${FissureNotificationRepository.schema}.fissures_notification`;

  async insert(fissureId, deviceId) {
    const { rows } = await apiPool.query(
      `
        INSERT INTO (${FissureNotificationRepository.table})
        VALUES ($1, $2, "Pending")
        ON CONFLICT (fissure_id, device_id)
        DO NOTHING
        RETURNING *;
      `,
      [fissureId, deviceId],
    );

    return rows[0];
  }

  async delete(fissureId) {
    const { rowCount } = apiPool.query(
      `
        DELETE FROM ${FissureNotificationRepository.table}
        WHERE fissure_id = $1;
      `,
      [fissureId],
    );

    return rowCount > 0;
  }

  // Select unsent fissures
  async selectPendingNotifications() {
    const { rows } = await apiPool.query(
      `
        SELECT * FROM ${FissureNotificationRepository.table}
        WHERE status = 'Pending';
      `,
    );

    return rows;
  }

  async updateNotificationSent(fissureId) {
    const { rows } = apiPool.query(
      `
        UPDATE ${FissureNotificationRepository.table}
        SET notification_sent = TRUE
        WHERE fissure_id = $1
        RETURNING *;
      `,
      [fissureId],
    );

    return rows[0] ?? null;
  }
}

export default FissureNotificationRepository;
