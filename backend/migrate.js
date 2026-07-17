import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resourceLimits } from "node:worker_threads";
import { Client } from "pg";

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASSWORD,
});

async function migrate() {
  await client.connect();

  // Ensures migration table exists
  await client.query(`
        CREATE TABLE IF NOT EXISTS meta.migrations (
            id TEXT PRIMARY KEY,
            applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // Looks into app folder and finds database/migrations
  const migrationsDir = path.join(__dirname, "database", "migrations");

  const files = fs
    .readdirSync(migrationsDir) // Returns an array of file names inside of the dirctory
    .filter((file) => file.endsWith(".sql")) // Ensures there is only file names with '.sql' left in the array
    .sort(); // Sorts file names numerically/alphabetically

  // For each file name, find file name in migrations table,
  // if can't then run the file and put the file name into table
  for (const file of files) {
    const result = await client.query(
      "SELECT 1 FROM meta.migrations WHERE id = $1",
      [file],
    );

    if (result.rowCount > 0) {
      continue;
    }

    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");

    // Starts an SQL transaction
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO meta.migrations (id) VALUES ($1)", [file]);

      // Commit changes and conclude SQL transaction
      await client.query("COMMIT");
    } catch (err) {
      // Discard changes and conclude SQL transaction
      await client.query("ROLLBACK");

      throw err;
    }
  }

  await client.end();

  console.log("Database up to data.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
