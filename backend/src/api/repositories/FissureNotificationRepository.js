import apiPool from "../db/apiDb";

class FissureNotificationRepository {
  static schema = "app_data";
  static table = `${FissureNotificationRepository.schema}.fissures_notification`;

  async insert(fissureId) {
    const { rows } = apiPool.query(
      `
        INSERT INTO (${FissureNotificationRepository.table})
        VALUES ($1)
        RETURNING *;
      `,
      [fissureId],
    );

    return rows[0];
  }

  async delete(fissureId) {
    const { rowCount } = apiPool.query(
      `
        DELETE FROM ${FissureNotificationRepository.table}
        WHERE fissure_id = $1
      `,
      [fissureId],
    );

    return rowCount > 0;
  }

  async select(fissureId) {
    const { rows } = apiPool.query(
      `
        SELECT * FROM ${FissureNotificationRepository.table}
        WHERE fissure_id = $1
      `,
      [fissureId],
    );

    return rows;
  }
}

export default FissureNotificationRepository;
