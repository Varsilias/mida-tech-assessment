import app from "./app";
import { logger } from "./config/logger.config";
import { EnvConfig } from "./config/env.config";

const PORT = new EnvConfig().PORT;

app.listen(PORT, () => {
  logger.info(`[Mida Core Service] - [${process.env.ENV}] --> listening on port: ${PORT}`);
});
