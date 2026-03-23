import db from "../db/workerDb.js";

const WorkerTimerModel = {
  insert: async (timerData) => {
    const query = `
      INSERT INTO wfdata.fissures (
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
      timerData.id,
      timerData.activation,
      timerData.expiry,
      timerData.planet,
      timerData.node,
      timerData.enemy_faction,
      timerData.mission_type,
      timerData.tier,
      timerData.expired,
      timerData.is_storm,
      timerData.is_hard,
    ];

    const result = await db.query(query, values);

    return result.rows;
  },

  updateExpiry: async () => {
    const result = await db.query(
      `UPDATE wfdata.fissures
       SET expired = true
       WHERE expired = false
       AND expiry < NOW()
       RETURNING *`
    );

    return result.rows;
  },

  selectEarliestExpiry: async () => {
    const result = await db.query(
      `SELECT MIN(expiry) as earliest_expiry
       FROM wfdata.fissures
       WHERE expired = false`
    );

    return result.rows[0]?.earliest_expiry || null;
  },
};

export default WorkerTimerModel;
