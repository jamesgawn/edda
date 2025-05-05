
import { EDDNPlanetScanEvent } from "../types/EDDNPlanetScanEvent";
import { EDDNJournalScanPlanetEvent } from "../types/source-types";

export function fromJournalScanPlanetEventMessage(event: EDDNJournalScanPlanetEvent): EDDNPlanetScanEvent {
  return {
    Atmosphere: event.message.Atmosphere,
    AtmosphereType: event.message.AtmosphereType,
    BodyID: event.message.BodyID,
    BodyName: event.message.BodyName,
    Composition: event.message.Composition,
    DistanceFromArrivalLS: event.message.DistanceFromArrivalLS,
    Eccentricity: event.message.Eccentricity,
    Landable: event.message.Landable,
    MassEM: event.message.MassEM,
    PlanetClass: event.message.PlanetClass,
    MeanAnomaly: event.message.MeanAnomaly,
    OrbitalInclination: event.message.OrbitalInclination,
    OrbitalPeriod: event.message.OrbitalPeriod,
    Periapsis: event.message.Periapsis,
    ReserveLevel: event.message.ReserveLevel,
    RotationPeriod: event.message.RotationPeriod,
    Radius: event.message.Radius,
    SemiMajorAxis: event.message.SemiMajorAxis,
    ScanType: event.message.ScanType,
    StarPos: event.message.StarPos,
    SystemName: event.message.StarSystem,
    SystemAddress: event.message.SystemAddress,
    SurfaceGravity: event.message.SurfaceGravity,
    SurfacePressure: event.message.SurfacePressure,
    TerraformState: event.message.TerraformState,
    TidalLock: event.message.TidalLock,
    Volcanism: event.message.Volcanism,
    WasDiscovered: event.message.WasDiscovered,
    WasMapped: event.message.WasMapped,
    Timestamp: new Date(event.message.timestamp)
  }
}