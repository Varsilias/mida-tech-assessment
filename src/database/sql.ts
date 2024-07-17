// import "reflect-metadata";
import { logger } from "../config/logger.config";
import { ormConfig } from "../config/orm.config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource(ormConfig);

export const connect = () => {
  AppDataSource.initialize()
    .then(() => {
      logger.info("[MidaCore SQL DB] --> connected to DB");
    })
    .catch((error: any) => {
      console.log(error);

      logger.error(`[MidaCore SQL DB] --> [DB Connection Error] --> ${error.message}`);
    });
};
