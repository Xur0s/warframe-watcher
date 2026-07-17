import initRedis from "#redisInit";
import app from "./src/app.js";

await initRedis("API");

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`API server running on port ${PORT} and on host ${HOST}`);
});
