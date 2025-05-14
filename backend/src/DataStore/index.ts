import sqlite from "node:sqlite";
import { Logger } from "pino";

export class DataStore {
  private logger: Logger;

  constructor(logger: Logger, filePath: string) {
    this.logger = logger.child({ module: "DataStore" });
  }
}
