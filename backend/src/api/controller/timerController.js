import ApiTimerModel from "../models/apiModel.js";
import { redisClient, redisPublisher } from "../db/redis.js";
import logger from "../../logger.js";

const TimerController = {
  getActiveTimers: async (req, res) => {
    const fetchFromDb = async () => {
      const dbTimers = await ApiTimerModel.getActiveTimers();

      process.nextTick(() => {
        redisPublisher
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
};

export default TimerController;
