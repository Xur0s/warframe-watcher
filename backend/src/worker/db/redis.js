import { createClient } from "redis";
import logger from "../../logger.js";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const redisSubscriber = createClient({
  url: process.env.REDIS_URL,
});

// Worker (Client)
redisClient.on("error", (err) => {
  logger.error({ err }, "Failed to connect WORKER to Redis");
});

redisClient.on("connect", () => {
  logger.info("Successfully connected WORKER to Redis");
});

// Subscriber
redisSubscriber.on("error", (err) => {
  logger.error({ err }, "Failed to connect SUBSCRIBER to Redis");
});

redisSubscriber.on("connect", () => {
  logger.info("Successfully connected SUBSCRIBER to Redis");
});

await redisClient.connect();
await redisSubscriber.connect();

export { redisClient, redisSubscriber };
