import { DatabaseSync, StatementSync } from "node:sqlite";
import { Logger } from "pino";
import { PlanetScanEvent } from "../../../shared/types/PlanetScanEvent";
import {
  fromPlanetScanEventStoreDso,
  toPlanetScanEventStoreDso,
} from "./adapters/PlanetScanEventAdaptor";
import { PlanetScanEventDso } from "./types/PlanetScanEventDso";

export class PlanetScanEventStore {
  private logger: Logger;
  private db: DatabaseSync;
  private insertPreparedStatement: StatementSync;

  constructor(logger: Logger, db: DatabaseSync) {
    this.logger = logger.child({ module: "PlanetScanEventStore" });
    this.db = db;

    this.initialize();

    this.insertPreparedStatement = this.db.prepare(
      `INSERT INTO planet_scan_events (
        Atmosphere, AtmosphereType, BodyID, BodyName, CompositionIce, CompositionMetal, CompositionRock, 
        DistanceFromArrivalLS, Eccentricity, Landable, MassEM, SimplifiedPlanetClass, PlanetClass, 
        MeanAnomaly, OrbitalInclination, OrbitalPeriod, Periapsis, ReserveLevel, RotationPeriod, Radius, 
        SemiMajorAxis, ScanType, StarPosX, StarPosY, StarPosZ, SystemName, SystemAddress, SurfaceGravity, 
        SurfacePressure, TerraformState, TidalLock, Timestamp, Volcanism, WasDiscovered, WasMapped
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(BodyID) DO UPDATE SET
        Atmosphere = excluded.Atmosphere,
        AtmosphereType = excluded.AtmosphereType,
        BodyName = excluded.BodyName,
        CompositionIce = excluded.CompositionIce,
        CompositionMetal = excluded.CompositionMetal,
        CompositionRock = excluded.CompositionRock,
        DistanceFromArrivalLS = excluded.DistanceFromArrivalLS,
        Eccentricity = excluded.Eccentricity,
        Landable = excluded.Landable,
        MassEM = excluded.MassEM,
        SimplifiedPlanetClass = excluded.SimplifiedPlanetClass,
        PlanetClass = excluded.PlanetClass,
        MeanAnomaly = excluded.MeanAnomaly,
        OrbitalInclination = excluded.OrbitalInclination,
        OrbitalPeriod = excluded.OrbitalPeriod,
        Periapsis = excluded.Periapsis,
        ReserveLevel = excluded.ReserveLevel,
        RotationPeriod = excluded.RotationPeriod,
        Radius = excluded.Radius,
        SemiMajorAxis = excluded.SemiMajorAxis,
        ScanType = excluded.ScanType,
        StarPosX = excluded.StarPosX,
        StarPosY = excluded.StarPosY,
        StarPosZ = excluded.StarPosZ,
        SystemName = excluded.SystemName,
        SystemAddress = excluded.SystemAddress,
        SurfaceGravity = excluded.SurfaceGravity,
        SurfacePressure = excluded.SurfacePressure,
        TerraformState = excluded.TerraformState,
        TidalLock = excluded.TidalLock,
        Timestamp = excluded.Timestamp,
        Volcanism = excluded.Volcanism,
        WasDiscovered = excluded.WasDiscovered,
        WasMapped = excluded.WasMapped
      `
    );
  }

  private async initialize() {
    this.logger.info("Initializing PlanetScanEventStore");

    // Create the table if it doesn't exist
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS planet_scan_events (
        Atmosphere TEXT,
        AtmosphereType TEXT,
        BodyID INTEGER NOT NULL PRIMARY KEY,
        BodyName TEXT,
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
    this.logger.trace("Inserting PlanetScanEvent into database");

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
      this.logger.error("Error inserting PlanetScanEvent: ", event, error);
      this.logger.error(event);
      this.logger.error(error);
      throw error;
    }
  }

  public async getRecentEvents(limit: number = 20): Promise<PlanetScanEvent[]> {
    this.logger.info(
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
}
