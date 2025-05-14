import { DatabaseSync } from "node:sqlite";
import { Logger } from "pino";
import { PlanetScanEventStore } from "./PlanetScanEventStore";

export class DataStore {
  private logger: Logger;
  private db: DatabaseSync;
  public planetScanEventStore: PlanetScanEventStore;

  constructor(logger: Logger, filePath: string) {
    this.logger = logger.child({ module: "DataStore" });

    this.logger.info("Initializing DataStore with file path: " + filePath);

    this.db = new DatabaseSync(filePath);
    this.planetScanEventStore = new PlanetScanEventStore(this.logger, this.db);
  }
}
