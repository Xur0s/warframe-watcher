class FissureService {
  constructor(fissureRepository, redisClient) {
    this.fissureRepository = fissureRepository;
    this.redisClient = redisClient;
  }

  // Postgres
  async postgresGetAllFissures() {
    try {
      return this.fissureRepository.getActiveTimers();
    } catch (err) {
      throw new Error(err);
    }
  }

  async postgresGetNormalFissures() {
    try {
      return this.fissureRepository.getNormalFissures();
    } catch (err) {
      throw new Error(err);
    }
  }

  async postgresGetHardFissures() {
    try {
      return this.fissureRepository.getHardFissures();
    } catch (err) {
      throw new Error(err);
    }
  }

  async postgresGetStormFissures() {
    try {
      return this.fissureRepository.getStormFissures();
    } catch (err) {
      throw new Error(err);
    }
  }

  // Redis
  async redisGetAllFissure() {
    try {
      const keys = await this.redisClient.zRange("fissures:keys", 0, -1);

      const transaction = this.redisClient.multi();
      keys.forEach((key) => transaction.get(`fissure:${key}`));
      const fissures = await transaction.exec();

      const activeFissures = fissures
        .filter((fissure) => fissure != null && fissure != undefined)
        .map((fissure) => JSON.parse(fissure));

      return activeFissures;
    } catch (err) {
      throw new Error("API: Unable to get fissures data from Redis", err);
    }
  }

  async redisGetNormalFissure() {
    try {
      const keys = await this.redisClient.zRange("fissures:keys", 0, -1);

      const transaction = this.redisClient.multi();
      keys.forEach((key) => transaction.get(`fissure:${key}`));
      const fissures = await transaction.exec();

      const activeFissures = fissures
        .filter((fissure) => fissure !== null && fissure !== undefined) // Validate items are not null or undefined
        .filter(
          (fissure) => fissure.is_hard === false && fissure.is_storm === false,
        )
        .map((fissure) => JSON.parse(fissure)); // Convert items into JS objects

      return activeFissures;
    } catch (err) {
      throw new Error("API: Unable to get fissures data from Redis", err);
    }
  }

  async redisGetHardFissure() {
    try {
      const keys = await this.redisClient.zRange("fissures:keys", 0, -1);

      const transaction = this.redisClient.multi();
      keys.forEach((key) => transaction.get(`fissure:${key}`));
      const fissures = await transaction.exec();

      const activeFissures = fissures
        .filter((fissure) => fissure !== null && fissure !== undefined)
        .filter(
          (fissure) => fissure.is_hard === true && fissure.is_storm === false,
        )
        .map((fissure) => JSON.parse(fissure));

      return activeFissures;
    } catch (err) {
      throw new Error("API: Unable to get fissures data from Redis", err);
    }
  }

  async redisGetStormFissure() {
    try {
      const keys = await this.redisClient.zRange("fissures:keys", 0, -1);

      const transaction = this.redisClient.multi();
      keys.forEach((key) => transaction.get(`fissure:${key}`));
      const fissures = await transaction.exec();

      const activeFissures = fissures
        .filter((fissure) => fissure !== null && fissure !== undefined)
        .filter(
          (fissure) => fissure.is_hard === false && fissure.is_storm === true,
        )
        .map((fissure) => JSON.parse(fissure));

      return activeFissures;
    } catch (err) {
      throw new Error("API: Unable to get fissures data from Redis", err);
    }
  }

  // Getters
  async getAllFissures() {
    try {
      return this.redisGetAllFissure();
    } catch (err) {
      console.err(err);

      try {
        console.log("API: Calling postgres for fissure data...");
        return this.postgresGetAllFissures();
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  async getNormalFissures() {
    try {
      return this.redisGetNormalFissure();
    } catch (err) {
      console.err(err);

      try {
        console.log("API: Calling postgres for fissure data...");
        return this.postgresGetNormalFissures();
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  async getHardFissures() {
    try {
      return this.redisGetHardFissure();
    } catch (err) {
      console.err(err);

      try {
        console.log("API: Calling postgres for fissure data...");
        return this.postgresGetHardFissures();
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  async getStormFissures() {
    try {
      return this.redisGetStormFissure();
    } catch (err) {
      console.err(err);

      try {
        console.log("API: Calling postgres for fissure data...");
        return this.postgresGetStormFissures();
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}

export default FissureService;
