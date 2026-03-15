import logger from "../../logger.js";
import { redisClient } from "../../redis/index.js";
import ApiTimerModel from "../models/apiModel.js";

const TimerController = {
  getActiveTimers: async (req, res) => {
    const fetchFromDb = async () => {
      const dbTimers = await ApiTimerModel.getActiveTimers();

      process.nextTick(() => {
        redisClient
          .publish(
            "cache-jobs",
            JSON.stringify({
              type: "CACHE_FISSURES",
              data: dbTimers,
            })
          )
          .catch((err) => logger.error({ err }, "Cache publish failed"));
      });

      return res.json(dbTimers);
    };

    try {
      const activeKeys = await redisClient.zRange("fissures:expires", 0, -1);

      if (!activeKeys) {
        return fetchFromDb();
      }

      const multi = redisClient.multi();
      activeKeys.forEach((key) => multi.get(`fissures:${key}`));
      const activeTimers = await multi.exec();

      const missingTimers = activeTimers.filter(([err]) => err == null);
      if (missingTimers.length > 0) {
        throw new Error(`Failed to get all timers from Redis`);
      }

      const cachedTimers = activeTimers.map((data) => JSON.parse(data));
      return res.json(cachedTimers);
    } catch (err) {
      logger.error({ err });
      return fetchFromDb();
    }
  },

  getNormalFissures: async (req, res) => {
    const fetchFromDb = async () => {
      const dbTimers = await ApiTimerModel.getNormalFissures();

      process.nextTick(() => {
        redisClient
          .publish(
            "cache-jobs",
            JSON.stringify({
              type: "CACHE_FISSURES",
              data: dbTimers,
            })
          )
          .catch((err) => logger.error({ err }, "Cache publish failed"));
      });

      return res.json(dbTimers);
    };

    try {
      const activeKeys = await redisClient.zRange("fissures:expires", 0, -1);

      if (!activeKeys) {
        return fetchFromDb();
      }

      const multi = redisClient.multi();
      activeKeys.forEach((key) => multi.get(`fissures:${key}`));
      const activeTimers = await multi.exec();

      const missingTimers = activeTimers.filter(([err]) => err == null);
      if (missingTimers.length > 0) {
        throw new Error(`Failed to get all timers from Redis`);
      }

      const cachedTimers = activeTimers.map((data) => JSON.parse(data));
      const normalFissures = cachedTimers.filter(
        (data) => !data.is_storm && !data.is_hard
      );

      return res.json(normalFissures);
    } catch (err) {
      logger.error({ err });
      return fetchFromDb();
    }
  },

  getHardFissures: async (req, res) => {
    const fetchFromDb = async () => {
      const dbTimers = await ApiTimerModel.getHardFissures();

      process.nextTick(() => {
        redisClient
          .publish(
            "cache-jobs",
            JSON.stringify({
              type: "CACHE_FISSURES",
              data: dbTimers,
            })
          )
          .catch((err) => logger.error({ err }, "Cache publish failed"));
      });

      return res.json(dbTimers);
    };

    try {
      const activeKeys = await redisClient.zRange("fissures:expires", 0, -1);

      if (!activeKeys) {
        return fetchFromDb();
      }

      const multi = redisClient.multi();
      activeKeys.forEach((key) => multi.get(`fissures:${key}`));
      const activeTimers = await multi.exec();

      const missingTimers = activeTimers.filter(([err]) => err == null);
      if (missingTimers.length > 0) {
        throw new Error(`Failed to get all timers from Redis`);
      }

      const cachedTimers = activeTimers.map((data) => JSON.parse(data));
      const hardFissures = cachedTimers.filter((data) => data.is_hard);

      return res.json(hardFissures);
    } catch (err) {
      logger.error({ err });
      return fetchFromDb();
    }
  },

  getStormFissures: async (req, res) => {
    const fetchFromDb = async () => {
      const dbTimers = await ApiTimerModel.getStormFissures();

      process.nextTick(() => {
        redisClient
          .publish(
            "cache-jobs",
            JSON.stringify({
              type: "CACHE_FISSURES",
              data: dbTimers,
            })
          )
          .catch((err) => logger.error({ err }, "Cache publish failed"));
      });

      return res.json(dbTimers);
    };

    try {
      const activeKeys = await redisClient.zRange("fissures:expires", 0, -1);

      if (!activeKeys) {
        return fetchFromDb();
      }

      const multi = redisClient.multi();
      activeKeys.forEach((key) => multi.get(`fissures:${key}`));
      const activeTimers = await multi.exec();

      const missingTimers = activeTimers.filter(([err]) => err == null);
      if (missingTimers.length > 0) {
        throw new Error(`Failed to get all timers from Redis`);
      }

      const cachedTimers = activeTimers.map((data) => JSON.parse(data));
      const stormFissures = cachedTimers.filter((data) => data.is_storm);

      return res.json(stormFissures);
    } catch (err) {
      logger.error({ err });
      return fetchFromDb();
    }
  },
};

export default TimerController;
