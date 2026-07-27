import { redisClient, redisSubscriber } from "#redis";

async function initRedis() {
  try {
    await Promise.all([redisClient.connect(), redisSubscriber.connect()]);

    console.log("Redis clients conenction established");
  } catch (err) {
    console.error("Redis client connection failed", err);
    throw err;
  }
}

export default initRedis;
