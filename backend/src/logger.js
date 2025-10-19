import pino from "pino";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: { colorize: true },
    },
  ],
});

const logger = pino(
  {
    level: "info",
  },
  transport
);

export default logger;
