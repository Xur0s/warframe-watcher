import initRedis from "#redisInit";
import startJobListener from "#redisSubscriber";
import logger from "../logger.js";
import TimerSyncService from "./services/TimerSyncService.js";

let isRefreshingExpiry = true;
let expiryTimeoutId = null;

async function main() {
  try {
    await initRedis("WORKER");
    await startJobListener();

    const timerSyncService = new TimerSyncService();

    await timerSyncService.getTimers();
    await timerSyncService.expireTimers();

    await handleTimers(timerSyncService);
  } catch (error) {
    logger.error("Failed to start worker:", error);
    process.exit(1);
  }
}

async function scheduleNextExpiryRefresh(timerSyncService) {
  if (!isRefreshingExpiry) return;

  let getEarliestExpiry = await timerSyncService.getEarliestExpireTime();
  if (!getEarliestExpiry) {
    logger.warn("Failed Expiry: NO TIMERS > Attempting to find new timers");
    // Tries to get the expiry time 5 times
    for (let i = 1; i < 6; i++) {
      getEarliestExpiry = await timerSyncService.getEarliestExpireTime();
      logger.info({ findingTimersTrial: i });

      if (getEarliestExpiry) {
        logger.info("Successfully found timer > Expiry continued");
        break;
      } else {
        logger.warn("Failed to find timer");
      }
      if (i == 5) return;
    }
  }

  const earliestExpiryDate = new Date(getEarliestExpiry);
  const msUntilRefresh = Math.max(0, earliestExpiryDate.getTime() - Date.now());

  expiryTimeoutId = setTimeout(async () => {
    await timerSyncService.expireTimers();
    scheduleNextExpiryRefresh(timerSyncService);
  }, msUntilRefresh);
}

async function handleTimers(timerSyncService) {
  const updateTimeoutId = setInterval(async () => {
    await timerSyncService.getTimers();
  }, 300000); //Every 5 mins

  scheduleNextExpiryRefresh(timerSyncService);

  process.on("SIGINT", () => {
    logger.info("Shutting off worker");
    isRefreshingExpiry = false;
    clearInterval(updateTimeoutId);
    clearInterval(expiryTimeoutId);
    process.exit(0);
  });
}

main().catch((error) => {
  logger.error("Unhandled error in main:", error);
  process.exit(1);
});
