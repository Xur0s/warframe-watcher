import { createClient } from "redis";
import logger from "../../logger.js";

// API (Client)
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  logger.error({ err }, "Failed to connect API to Redis");
});

redisClient.on("connect", () => {
  logger.info("Successfully connected API to Redis");
});

// Publisher
const redisPublisher = createClient({
  url: process.env.REDIS_URL,
});

redisPublisher.on("error", (err) => {
  logger.error({ err }, "Failed to connect PUBLISHER to Redis");
});

redisPublisher.on("connect", () => {
  logger.info("Successfully connected PUBLISHER to Redis");
});

try {
  await redisClient.connect();
  await redisPublisher.connect();
} catch {}

export { redisClient, redisPublisher };
