import initRedis from "#redisInit";
import FissureScheduler from "./FissureScheduler.js";
import FissureRepository from "./repositories/FissureRepository.js";
import FissureService from "./services/FissureService.js";

async function main() {
  console.log("Worker: Starting...");
  try {
    // Set up redis connections
    await initRedis();

    // Fissure Scheduler
    const fissureRepository = new FissureRepository();
    const fissureService = new FissureService(fissureRepository);
    const fissureScheduler = new FissureScheduler(fissureService);

    // Get new fissure missions every 10 mins
    fissureScheduler.startRefresh();
    // Checks expiry time of missions and marks them as expired in postgres database
    fissureScheduler.startExpiry();

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
