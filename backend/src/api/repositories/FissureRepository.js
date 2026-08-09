import apiPool from "../db/apiDb.js";

class FissureRepository {
  static schema = "app_data";
  static table = `${FissureRepository.schema}.fissures`;

  async getAllFissures() {
    const { rows } = await apiPool.query(`
        SELECT * FROM ${FissureRepository.table} 
    `);

    return rows;
  }

  async getActiveTimers() {
    const { rows } = await apiPool.query(`
        SELECT * FROM ${FissureRepository.table}
        WHERE expired = false
    `);

    return rows;
  }

  async getNormalFissures() {
    const { rows } = await apiPool.query(`
        SELECT * FROM ${FissureRepository.table}
        WHERE expired = false 
          AND is_storm = false 
          AND is_hard = false;
    `);

    return rows;
  }

  async getHardFissures() {
    const { rows } = await apiPool.query(`
        SELECT * FROM ${FissureRepository.table}
        WHERE expired = false 
          AND is_hard = true;
    `);

    return rows;
  }

  async getStormFissures() {
    const { rows } = await apiPool.query(`
        SELECT * FROM ${FissureRepository.table}
        WHERE expired = false 
          AND is_hard = true;
    `);

    return rows;
  }
}

export default FissureRepository;
