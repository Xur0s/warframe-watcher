import logger from "../../logger.js";

import pkg from "pg";

const { Pool } = pkg;

const apiPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_API,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD_API,
  database: process.env.DB_DATABASE,
});

apiPool.on("connect", () =>
  logger.info("Successfully connected API user to database")
);
apiPool.on("error", (err) =>
  logger.error({ err }, "Failed to connect API user to database")
);

export default apiPool;
