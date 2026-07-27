import db from "../db/workerDb.js";

class FissureRepository {
  static schema = "app_data";
  static table = `${FissureRepository.schema}.fissures`;

  async insert(fissureData) {
    const query = `
      INSERT INTO ${FissureRepository.table} (
        id,
        activation,
        expiry,
        planet,
        node,
        enemy_faction,
        mission_type,
        tier,
        expired,
        is_storm,
        is_hard
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
    `;

    const values = [
      fissureData.id,
      fissureData.activation,
      fissureData.expiry,
      fissureData.planet,
      fissureData.node,
      fissureData.enemy_faction,
      fissureData.mission_type,
      fissureData.tier,
      fissureData.expired,
      fissureData.is_storm,
      fissureData.is_hard,
    ];

    const result = await db.query(query, values);

    return result.rows;
  }

  async updateExpiry() {
    const result = await db.query(
      `UPDATE ${FissureRepository.table}
       SET expired = true
       WHERE expired = false
       AND expiry < NOW()
       RETURNING *`,
    );

    return result.rows;
  }

  async selectEarliestExpiry() {
    const result = await db.query(
      `SELECT MIN(expiry) as earliest_expiry
       FROM ${FissureRepository.table}
       WHERE expired = false`,
    );

    return result.rows[0]?.earliest_expiry || null;
  }
}

export default FissureRepository;
