import initRedis from "./src/redis/initRedis.js";
import app from "./app.js";
import migrate from "./migrate.js";
import healthRouter from "./src/api/routes/healthRoutes.js";

async function main() {
  try {
    console.log("API: Starting...");

    // Start redis connection
    await initRedis();

    // Runs migrate.js for SQL
    await migrate();

    // App starts listening in on port
    const PORT = 3000;
    const HOST = "0.0.0.0";

    app.listen(PORT, HOST, () => {
      console.log(`API server running on port ${PORT} and on host ${HOST}`);
    });

    // Set up health endpoint to be called by Docker
    app.use("/health", healthRouter);
  } catch (err) {
    console.error("API failed", err);
    process.exit(1);
  }
}

main();
