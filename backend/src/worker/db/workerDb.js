import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import logger from "../../logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import pkg from "pg";

const { Pool } = pkg;

const workerPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

workerPool.on("connect", () =>
  logger.info("Successfully connected WORKER user to database")
);
workerPool.on("error", (err) =>
  logger.error({ err }, "Failed to connect WORKER user to database")
);

export default workerPool;
