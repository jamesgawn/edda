import { DatabaseSync, StatementSync } from "node:sqlite";
import { Logger } from "pino";
import {
  PlanetScanEvent,
  SimplifiedPlanetClass,
} from "../../../../shared/types/events/PlanetScanEvent";
import {
  fromPlanetScanEventStoreDso,
  toPlanetScanEventStoreDso,
} from "../adapters/PlanetScanEventAdaptor";
import { PlanetScanEventDso } from "../types/PlanetScanEventDso";
import { NewPlanetaryDiscoveriesBySimplifiedClassEvent } from "../../../../shared/types/events/NewPlanetaryDiscoveriesBySimplifiedClassEvent";

export class PlanetScanEventStore {
  private logger: Logger;
  private db: DatabaseSync;
  private insertPreparedStatement: StatementSync;
  private getNewlyDiscoveredBySimplifiedPlanetClass: StatementSync;

  constructor(logger: Logger, db: DatabaseSync) {
    this.logger = logger.child({ module: "PlanetScanEventStore" });
    this.db = db;

    this.initialize();

    this.insertPreparedStatement = this.db.prepare(
      `INSERT OR IGNORE INTO planet_scan_events (
        Atmosphere, AtmosphereType, BodyID, BodyName, CompositionIce, CompositionMetal, CompositionRock, 
        DistanceFromArrivalLS, Eccentricity, Landable, MassEM, SimplifiedPlanetClass, PlanetClass, 
        MeanAnomaly, OrbitalInclination, OrbitalPeriod, Periapsis, ReserveLevel, RotationPeriod, Radius, 
        SemiMajorAxis, ScanType, StarPosX, StarPosY, StarPosZ, SystemName, SystemAddress, SurfaceGravity, 
        SurfacePressure, TerraformState, TidalLock, Timestamp, Volcanism, WasDiscovered, WasMapped
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
      `
    );

    this.getNewlyDiscoveredBySimplifiedPlanetClass = this.db.prepare(
      `SELECT SimplifiedPlanetClass, count(*) as numberFound FROM planet_scan_events WHERE WasDiscovered = 0 GROUP BY SimplifiedPlanetClass`
    );
  }

  private async initialize() {
    this.logger.info("Initializing PlanetScanEventStore");

    // Create the table if it doesn't exist
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS planet_scan_events (
        Atmosphere TEXT,
        AtmosphereType TEXT,
        BodyID INTEGER NOT NULL,
        BodyName TEXT PRIMARY KEY,
        CompositionIce REAL,
        CompositionMetal REAL,
        CompositionRock REAL,
        DistanceFromArrivalLS REAL,
        Eccentricity REAL,
        Landable BOOLEAN,
        MassEM REAL,
        SimplifiedPlanetClass TEXT,
        PlanetClass TEXT,
        MeanAnomaly REAL,
        OrbitalInclination REAL,
        OrbitalPeriod REAL,
        Periapsis REAL,
        ReserveLevel TEXT,
        RotationPeriod REAL,
        Radius REAL,
        SemiMajorAxis REAL,
        ScanType TEXT,
        StarPosX REAL,
        StarPosY REAL,
        StarPosZ REAL,
        SystemName TEXT,
        SystemAddress INTEGER NOT NULL,
        SurfaceGravity REAL,
        SurfacePressure REAL,
        TerraformState TEXT,
        TidalLock BOOLEAN,
        Timestamp INTEGER NOT NULL,
        Volcanism TEXT,
        WasDiscovered BOOLEAN,
        WasMapped BOOLEAN
      )
    `);

    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_timestamp ON planet_scan_events (Timestamp)
    `);

    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_planet_class ON planet_scan_events (PlanetClass)
    `);

    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_simplified_planet_class ON planet_scan_events (SimplifiedPlanetClass)
    `);
  }

  public async insert(event: PlanetScanEvent) {
    this.logger.debug(
      "Inserting PlanetScanEvent into database (%s)",
      event.BodyID
    );

    const eventDso = toPlanetScanEventStoreDso(event);
    try {
      this.insertPreparedStatement.run(
        eventDso.Atmosphere,
        eventDso.AtmosphereType,
        eventDso.BodyID,
        eventDso.BodyName,
        eventDso.CompositionIce,
        eventDso.CompositionMetal,
        eventDso.CompositionRock,
        eventDso.DistanceFromArrivalLS,
        eventDso.Eccentricity,
        eventDso.Landable,
        eventDso.MassEM,
        eventDso.SimplifiedPlanetClass,
        eventDso.PlanetClass,
        eventDso.MeanAnomaly,
        eventDso.OrbitalInclination,
        eventDso.OrbitalPeriod,
        eventDso.Periapsis,
        eventDso.ReserveLevel,
        eventDso.RotationPeriod,
        eventDso.Radius,
        eventDso.SemiMajorAxis,
        eventDso.ScanType,
        eventDso.StarPosX,
        eventDso.StarPosY,
        eventDso.StarPosZ,
        eventDso.SystemName,
        eventDso.SystemAddress,
        eventDso.SurfaceGravity,
        eventDso.SurfacePressure,
        eventDso.TerraformState,
        eventDso.TidalLock,
        eventDso.Timestamp,
        eventDso.Volcanism,
        eventDso.WasDiscovered,
        eventDso.WasMapped
      );
    } catch (error) {
      this.logger.warn("Error inserting PlanetScanEvent: ", event, error);
      this.logger.warn(event);
      this.logger.warn(eventDso);
      this.logger.warn(error);
      throw error;
    }
  }

  public async getRecentEvents(limit: number = 20): Promise<PlanetScanEvent[]> {
    this.logger.trace(
      "Fetching recent PlanetScanEvents from database (limit: %d)",
      limit
    );

    const query = `
      SELECT * FROM planet_scan_events
      ORDER BY Timestamp DESC
      LIMIT ?
    `;

    const stmt = this.db.prepare(query);
    const rows = stmt.all(limit) as PlanetScanEventDso[];

    return rows.map((row) => fromPlanetScanEventStoreDso(row));
  }

  public async getNewlyDiscoveredEventsBySimplifiedPlanetClass(): Promise<NewPlanetaryDiscoveriesBySimplifiedClassEvent> {
    this.logger.trace(
      "Fetching newly discovered PlanetScanEvents by simplified type"
    );

    const rows = this.getNewlyDiscoveredBySimplifiedPlanetClass.all() as {
      SimplifiedPlanetClass: string;
      numberFound: number;
    }[];

    const metalRichResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.MetalRich
    );
    const highMetalContentResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.HighMetalContent
    );
    const rockyResult = rows.find(
      (result) => result.SimplifiedPlanetClass === SimplifiedPlanetClass.Rocky
    );
    const icyResult = rows.find(
      (result) => result.SimplifiedPlanetClass === SimplifiedPlanetClass.Icy
    );
    const rockyIcyResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.RockyIcy
    );
    const earthlikeResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.Earthlike
    );
    const waterWorldResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.WaterWorld
    );
    const ammoniumWorldResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.AmonniaWorld
    );
    const waterGiantResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.WaterGiant
    );
    const gasGiantResult = rows.find(
      (result) =>
        result.SimplifiedPlanetClass === SimplifiedPlanetClass.GasGiant
    );

    return {
      MetalRich: metalRichResult ? metalRichResult.numberFound : 0,
      HighMetalContent: highMetalContentResult
        ? highMetalContentResult.numberFound
        : 0,
      Rocky: rockyResult ? rockyResult.numberFound : 0,
      Icy: icyResult ? icyResult.numberFound : 0,
      RockyIcy: rockyIcyResult ? rockyIcyResult.numberFound : 0,
      Earthlike: earthlikeResult ? earthlikeResult.numberFound : 0,
      WaterWorld: waterWorldResult ? waterWorldResult.numberFound : 0,
      AmmoniaWorld: ammoniumWorldResult ? ammoniumWorldResult.numberFound : 0,
      WaterGiant: waterGiantResult ? waterGiantResult.numberFound : 0,
      GasGiant: gasGiantResult ? gasGiantResult.numberFound : 0,
    };
  }
}
