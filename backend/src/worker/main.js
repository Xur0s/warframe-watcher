import { redisClient } from "#redis";
import initRedis from "../redis/initRedis.js";
import RedisPublisher from "../redis/Publisher.js";
import FissureScheduler from "./FissureScheduler.js";
import FissureRepository from "./repositories/FissureRepository.js";
import FissureService from "./services/FissureService.js";

async function main() {
  console.log("Worker: Starting...");
  try {
    // Redis connection
    console.log("WORKER: Connecting to Redis");
    await initRedis();

    // Fissure Scheduler
    const fissureRepository = new FissureRepository();
    const fissureService = new FissureService(fissureRepository);
    const redisPublisher = new RedisPublisher(redisClient);
    const fissureScheduler = new FissureScheduler(
      fissureService,
      redisPublisher,
    );

    // Initialize scheduler to get new fissure mission
    fissureScheduler.initialize().then(() => {
      fissureScheduler.startExpiry();
    });
    // Get new fissure missions every 10 mins
    fissureScheduler.startRefresh();

    process.on("SIGINT", async () => {
      console.log("Gracefully shutting down worker...");
      await fissureScheduler.shutdown();
    });
  } catch (err) {
    console.error("Worker failed:", err);
    process.exit(1);
  }
}

main();
