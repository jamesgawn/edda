import type { GenericEvent } from "./GenericEvent";

enum PlanetClass {
  MetalRich = "Metal rich body",
  HighMetalContent = "High metal content body",
  Rocky = "Rocky body",
  Icy = "Icy body",
  RockyIcy = "Rocky ice body",
  Earthlike = "Earthlike body",
  WaterWorld = "Water world",
  AmmoniaWorld = "Ammonia world",
  WaterGiant = "Water giant",
  WaterGiantWithLife = "Water giant with life",
  GasGiantWithWaterBasedLife = "Gas giant with water based life",
  GasGiantWithAmmoniaBasedLife = "Gas giant with ammonia based life",
  SudarskyClassI = "Sudarsky class I gas giant",
  SudarskyClassII = "Sudarsky class II gas giant",
  SudarskyClassIII = "Sudarsky class III gas giant",
  SudarskyClassIV = "Sudarsky class IV gas giant",
  SudarskyClassV = "Sudarsky class V gas giant",
  HeliumRich = "Helium rich gas giant",
  HeliumGasGiant = "Helium gas giant",
}

export interface PlanetScanEvent extends GenericEvent {
  Atmosphere: string;
  AtmosphereType: string;
  BodyID: number;
  BodyName: string;
  Composition: {
    Ice: number;
    Metal: number;
    Rock: number;
  };
  DistanceFromArrivalLS: number;
  Eccentricity: number;
  Landable: boolean;
  MassEM: number;
  PlanetClass: PlanetClass;
  MeanAnomaly: number;
  OrbitalInclination: number;
  OrbitalPeriod: number;
  Periapsis: number;
  ReserveLevel: string;
  RotationPeriod: number;
  Radius: number;
  SemiMajorAxis: number;
  ScanType: string;
  StarPos: number[];
  SystemName: string;
  SystemAddress: number;
  SurfaceGravity: number;
  SurfacePressure: number;
  TerraformState: string;
  TidalLock: boolean;
  Volcanism: string;
  WasDiscovered: boolean;
  WasMapped: boolean;
}
