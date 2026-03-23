import { redisClient } from "#redis";
import logger from "../logger.js";

async function initRedis(name = "CLIENT") {
  await redisClient.connect().then(
    () => {
      logger.info(`Redis ${name} connected`);
    },
    (error) => {
      logger.error({ error }, `Redis ${name} connection failed`);
    }
  );
}

export default initRedis;
