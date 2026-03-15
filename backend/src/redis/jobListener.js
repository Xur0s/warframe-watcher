import { redisSubscriber } from "#redis";
import logger from "../logger.js";
import handleJob from "./jobHandler.js";

let started = false;

async function startJobListener() {
  if (started) {
    return;
  }
  started = true;

  await redisSubscriber.connect().then(() => {
    logger.info("Redis JOB SUBSCRIBER connected");
    redisSubscriber.subscribe("cache-jobs", async (message) => {
      await handleJob(message);
    });
    logger.info("Subscriber listening on: cache-jobs");
  });
}

export default startJobListener;
