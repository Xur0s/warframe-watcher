import TimerSyncService from "./services/TimerSyncService.js";
import logger from "../logger.js";
import RedisService from "./services/RedisService.js";

const timerSyncService = new TimerSyncService();
const redisService = new RedisService();

let isRefreshingExpiry = true;
let expiryTimeoutId = null;

async function scheduleNextExpiryRefresh() {
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
    scheduleNextExpiryRefresh();
  }, msUntilRefresh);
}

await timerSyncService.getTimers();
await timerSyncService.expireTimers();
await redisService.startJobListener();

const updateTimeoutId = setInterval(async () => {
  await timerSyncService.getTimers();
}, 60000); //Every 60 seconds

scheduleNextExpiryRefresh();

process.on("SIGINT", () => {
  logger.info("Shutting off worker");
  isRefreshingExpiry = false;
  clearInterval(updateTimeoutId);
  clearInterval(expiryTimeoutId);
  process.exit(0);
});
