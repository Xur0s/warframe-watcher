import apiPool from "../db/apiDb.js";

const ApiTimerModel = {
  getAllTimers: async () => {
    const result = await apiPool.query(`
        SELECT * FROM warframe_data_schema.normal_fissures
    `);

    return result.rows;
  },

  getActiveTimers: async () => {
    const result = await apiPool.query(`
        SELECT * FROM warframe_data_schema.normal_fissures
        WHERE expired = false
    `);

    return result.rows;
  },
};

export default ApiTimerModel;
