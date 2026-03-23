import apiPool from "../db/apiDb.js";

const ApiTimerModel = {
  getAllTimers: async () => {
    const result = await apiPool.query(`
        SELECT * FROM wfdata.fissures
    `);

    return result.rows;
  },

  getActiveTimers: async () => {
    const result = await apiPool.query(`
        SELECT * FROM wfdata.fissures
        WHERE expired = false
    `);

    return result.rows;
  },

  getNormalFissures: async () => {
    const result = await apiPool.query(`
        SELECT * FROM wfdata.fissures
        WHERE expired = false 
          AND is_storm = false 
          AND is_hard = false;
    `);

    return result.rows;
  },

  getHardFissures: async () => {
    const result = await apiPool.query(`
        SELECT * FROM wfdata.fissures
        WHERE expired = false 
          AND is_hard = true;
    `);

    return result.rows;
  },

  getStormFissures: async () => {
    const result = await apiPool.query(`
        SELECT * FROM wfdata.fissures
        WHERE expired = false 
          AND is_storm = true;
    `);

    return result.rows;
  },
};

export default ApiTimerModel;
