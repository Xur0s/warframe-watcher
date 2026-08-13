import initRedis from "./src/redis/initRedis.js";
import app from "./app.js";
import migrate from "./migrate.js";
import RedisSubscriber from "./src/redis/Subscriber.js";
import { redisClient } from "#redis";
import handleNewFissures from "./handleNewFissures.js";

async function main() {
  try {
    console.log("API: Starting...");

    // Start redis connection
    await initRedis();

    // Set up redis subscriber
    const redisSubscriber = new RedisSubscriber(redisClient);
    // Listens for "new-fissures" and sends notfications for new missions using "handleNewFissures"
    redisSubscriber.subscribe("new-fissures", handleNewFissures);

    // Runs migrate.js for SQL
    await migrate();

    // App starts listening in on port
    const PORT = 3000;
    const HOST = "0.0.0.0";

    app.listen(PORT, HOST, () => {
      console.log(`API server running on port ${PORT} and on host ${HOST}`);
    });
  } catch (err) {
    console.error("API failed", err);
    process.exit(1);
  }
}

main();
