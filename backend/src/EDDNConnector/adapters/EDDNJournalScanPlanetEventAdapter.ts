import {
  PlanetClass,
  PlanetScanEvent,
  SimplifiedPlanetClass,
  TerraformState,
} from "../../../../shared/types/events/PlanetScanEvent";
import { EDDNJournalScanPlanetEvent } from "../types";

export function toEDDLPlanetScanEvent(
  event: EDDNJournalScanPlanetEvent
): PlanetScanEvent {
  return {
    Atmosphere: event.message.Atmosphere,
    AtmosphereType: event.message.AtmosphereType,
    BodyID: event.message.BodyID,
    BodyName: event.message.BodyName,
    CompositionIce: event.message.Composition
      ? event.message.Composition.Ice
      : 0,
    CompositionMetal: event.message.Composition
      ? event.message.Composition.Metal
      : 0,
    CompositionRock: event.message.Composition
      ? event.message.Composition.Rock
      : 0,
    DistanceFromArrivalLS: event.message.DistanceFromArrivalLS,
    Eccentricity: event.message.Eccentricity,
    Landable: event.message.Landable,
    MassEM: event.message.MassEM,
    SimplifiedPlanetClass: toSimplifiedPlanetClassEnum(
      event.message.PlanetClass
    ),
    PlanetClass: toPlanetClassEnum(event.message.PlanetClass),
    MeanAnomaly: event.message.MeanAnomaly,
    OrbitalInclination: event.message.OrbitalInclination,
    OrbitalPeriod: event.message.OrbitalPeriod,
    Periapsis: event.message.Periapsis,
    ReserveLevel: event.message.ReserveLevel,
    RotationPeriod: event.message.RotationPeriod,
    Radius: event.message.Radius,
    SemiMajorAxis: event.message.SemiMajorAxis,
    ScanType: event.message.ScanType,
    StarPosX: event.message.StarPos[0],
    StarPosY: event.message.StarPos[1],
    StarPosZ: event.message.StarPos[2],
    SystemName: event.message.StarSystem,
    SystemAddress: event.message.SystemAddress,
    SurfaceGravity: event.message.SurfaceGravity,
    SurfacePressure: event.message.SurfacePressure,
    TerraformState: toTerraformStateEnum(event.message.TerraformState),
    TidalLock: event.message.TidalLock,
    Volcanism: event.message.Volcanism,
    WasDiscovered: event.message.WasDiscovered,
    WasMapped: event.message.WasMapped,
    Timestamp: new Date(event.message.timestamp),
  };
}

function toTerraformStateEnum(terraformState: string): TerraformState {
  switch (terraformState) {
    case "Terraformable":
      return TerraformState.Terraformable;
    case "Terraforming":
      return TerraformState.Terraforming;
    case "Terraformed":
      return TerraformState.Terraformed;
    case "":
      return TerraformState.NotTerraformable;
    default:
      throw new Error(`Invalid TerraformState: ${terraformState}`);
  }
}

function toPlanetClassEnum(planetClass: string): PlanetClass {
  switch (planetClass) {
    case "Metal rich body":
      return PlanetClass.MetalRich;
    case "High metal content body":
      return PlanetClass.HighMetalContent;
    case "Rocky body":
      return PlanetClass.Rocky;
    case "Icy body":
      return PlanetClass.Icy;
    case "Rocky ice body":
      return PlanetClass.RockyIcy;
    case "Earthlike body":
      return PlanetClass.Earthlike;
    case "Water world":
      return PlanetClass.WaterWorld;
    case "Ammonia world":
      return PlanetClass.AmmoniaWorld;
    case "Water giant":
      return PlanetClass.WaterGiant;
    case "Water giant with life":
      return PlanetClass.WaterGiantWithLife;
    case "Gas giant with water based life":
      return PlanetClass.GasGiantWithWaterBasedLife;
    case "Gas giant with ammonia based life":
      return PlanetClass.GasGiantWithAmmoniaBasedLife;
    case "Sudarsky class I gas giant":
      return PlanetClass.GasGiantClassI;
    case "Sudarsky class II gas giant":
      return PlanetClass.GasGiantClassII;
    case "Sudarsky class III gas giant":
      return PlanetClass.GasGiantClassIII;
    case "Sudarsky class IV gas giant":
      return PlanetClass.GasGiantClassIV;
    case "Sudarsky class V gas giant":
      return PlanetClass.GasGiantClassV;
    case "Helium rich gas giant":
      return PlanetClass.GasGiantHeliumRich;
    case "Helium gas giant":
      return PlanetClass.GasGiantHelium;
    default:
      throw new Error(`Invalid PlanetClass: ${planetClass}`);
  }
}

function toSimplifiedPlanetClassEnum(
  planetClass: string
): SimplifiedPlanetClass {
  const convertedPlanetClass = toPlanetClassEnum(planetClass);
  switch (convertedPlanetClass) {
    case PlanetClass.MetalRich:
      return SimplifiedPlanetClass.MetalRich;
    case PlanetClass.HighMetalContent:
      return SimplifiedPlanetClass.HighMetalContent;
    case PlanetClass.Rocky:
      return SimplifiedPlanetClass.Rocky;
    case PlanetClass.Icy:
      return SimplifiedPlanetClass.Icy;
    case PlanetClass.RockyIcy:
      return SimplifiedPlanetClass.RockyIcy;
    case PlanetClass.Earthlike:
      return SimplifiedPlanetClass.Earthlike;
    case PlanetClass.WaterWorld:
      return SimplifiedPlanetClass.WaterWorld;
    case PlanetClass.AmmoniaWorld:
      return SimplifiedPlanetClass.AmonniaWorld;
    case PlanetClass.WaterGiant:
    case PlanetClass.WaterGiantWithLife:
      return SimplifiedPlanetClass.WaterGiant;
    case PlanetClass.GasGiantWithWaterBasedLife:
    case PlanetClass.GasGiantWithAmmoniaBasedLife:
    case PlanetClass.GasGiantClassI:
    case PlanetClass.GasGiantClassII:
    case PlanetClass.GasGiantClassIII:
    case PlanetClass.GasGiantClassIV:
    case PlanetClass.GasGiantClassV:
    case PlanetClass.GasGiantHeliumRich:
    case PlanetClass.GasGiantHelium:
      return SimplifiedPlanetClass.GasGiant;
    default:
      throw new Error("Invalid PlanetClass");
  }
}
