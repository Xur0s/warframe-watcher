import pkg from "pg";
import logger from "../../logger.js";

const { Pool } = pkg;

const workerPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.POSTGRES_DB,
});

workerPool.on("connect", () => {});
workerPool.on("error", (err) =>
  logger.error({ err }, "Failed to connect WORKER user to database"),
);

export default workerPool;
