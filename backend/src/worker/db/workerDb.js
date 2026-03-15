import pkg from "pg";
import logger from "../../logger.js";

const { Pool } = pkg;

const workerPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_WORKER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD_WORKER,
  database: process.env.DB_DATABASE,
});

workerPool.on("connect", () => {});
workerPool.on("error", (err) =>
  logger.error({ err }, "Failed to connect WORKER user to database")
);

export default workerPool;
