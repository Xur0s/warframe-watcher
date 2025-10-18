import { redisClient, redisSubscriber } from "../db/redis.js";
import logger from "../../logger.js";

class RedisService {
  async startJobListener() {
    try {
      await redisSubscriber.subscribe("cache-jobs", (message) => {
        this.handleJob(message);
      });

      logger.info("Listening for cache jobs");
    } catch (err) {
      logger.error({ err }, "Failed to listen for cache jobs");
    }
  }

  async handleJob(message) {
    try {
      const job = JSON.parse(message);
      logger.info({ job }, "Recieved cache job");

      if (job.type === "CACHE_FISSURES") {
        const timerData = job.data;
        for (const timer in timerData) {
          const expiryDate = new Date(timer.expiry);
          const msTTL = Math.max(0, expiryDate.getTime() - Date.now());
          const secondsTTL = Math.ceil(msTTL / 1000);

          if (msTTL <= 0) continue;

          redisClient.setEx(
            `fissures:${timer.id}`,
            secondsTTL,
            JSON.stringify(timer)
          );
        }
        logger.info({ job }, "Completed cache job: Cached fissured");
      }
    } catch (err) {
      logger.error({ err }, "Failed to complete cache job");
    }
  }
}

export default RedisService;
