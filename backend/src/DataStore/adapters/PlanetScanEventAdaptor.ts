import {
  PlanetClass,
  PlanetScanEvent,
  SimplifiedPlanetClass,
  TerraformState,
} from "../../../../shared/types/events/PlanetScanEvent";
import { PlanetScanEventDso } from "../types/PlanetScanEventDso";

export function toPlanetScanEventStoreDso(
  planetScanEvent: PlanetScanEvent
): PlanetScanEventDso {
  return {
    ...planetScanEvent,
    Atmosphere: planetScanEvent.Atmosphere || null,
    AtmosphereType: planetScanEvent.AtmosphereType || null,
    ReserveLevel: planetScanEvent.ReserveLevel || null,
    Timestamp: planetScanEvent.Timestamp.getTime(),
    Landable: planetScanEvent.Landable ? 1 : 0,
    MeanAnomaly: planetScanEvent.MeanAnomaly || null,
    TidalLock: planetScanEvent.TidalLock ? 1 : 0,
    WasDiscovered: planetScanEvent.WasDiscovered ? 1 : 0,
    WasMapped: planetScanEvent.WasMapped ? 1 : 0,
    SimplifiedPlanetClass: planetScanEvent.SimplifiedPlanetClass,
    PlanetClass: planetScanEvent.PlanetClass,
    TerraformState: planetScanEvent.TerraformState,
  };
}

export function fromPlanetScanEventStoreDso(
  planetScanEventDso: PlanetScanEventDso
): PlanetScanEvent {
  return {
    ...planetScanEventDso,
    Atmosphere: planetScanEventDso.Atmosphere || "",
    AtmosphereType: planetScanEventDso.AtmosphereType || "",
    ReserveLevel: planetScanEventDso.ReserveLevel || "",
    Timestamp: new Date(planetScanEventDso.Timestamp),
    MeanAnomaly: planetScanEventDso.MeanAnomaly || null,
    Landable: planetScanEventDso.Landable === 1,
    TidalLock: planetScanEventDso.TidalLock === 1,
    WasDiscovered: planetScanEventDso.WasDiscovered === 1,
    WasMapped: planetScanEventDso.WasMapped === 1,
    SimplifiedPlanetClass:
      planetScanEventDso.SimplifiedPlanetClass as SimplifiedPlanetClass,
    PlanetClass: planetScanEventDso.PlanetClass as PlanetClass,
    TerraformState: planetScanEventDso.TerraformState as TerraformState,
  };
}
