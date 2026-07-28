import pkg from "pg";

const { Pool } = pkg;

const apiPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

apiPool.on("connect", () =>
  console.log("Successfully connected API user to database"),
);
apiPool.on("error", (err) =>
  console.error("Failed to connect API user to database", err),
);

export default apiPool;
