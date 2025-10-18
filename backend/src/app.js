import express from "express";
import cors from "./api/middleware/cors.js";
import timerRouter from "./api/routes/timerRoutes.js";
import logger from "./logger.js";

const app = express();

app.use(cors);
app.use(express.json());

app.use("/api/fissures", timerRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error, req, res, next) => {
  logger.error({ error }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

export default app;
