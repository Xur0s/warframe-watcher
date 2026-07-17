import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({
  url: redisUrl,
});

const redisSubscriber = redisClient.duplicate();

export { redisClient, redisSubscriber };
