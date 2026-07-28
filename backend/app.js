import express from "express";
import cors from "./src/api/middleware/cors.js";
import timerRouter from "./src/api/routes/timerRoutes.js";
import deviceRouter from "./src/api/routes/deviceRoutes.js";
import preferenceRouter from "./src/api/routes/preferenceRoutes.js";
import notificationRouter from "./src/api/routes/notificationRoutes.js";
import healthRouter from "./src/api/routes/healthRoutes.js";

const app = express();

app.use(cors);
app.use(express.json());

// Set up health endpoint to be called by Docker
app.use("/health", healthRouter);

app.use("/api/fissures", timerRouter);

app.use("/api/devices", deviceRouter);
app.use("/api/preferences", preferenceRouter);
app.use("/api/notifications", notificationRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error({ error }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

export default app;
