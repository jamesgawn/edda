import type { GenericEvent } from "./GenericEvent";

export enum SimplifiedPlanetClass {
  MetalRich,
  HighMetalContent,
  Rocky,
  Icy,
  RockyIcy,
  Earthlike,
  WaterWorld,
  AmonniaWorld,
  WaterGiant,
  GasGiant,
}
export enum PlanetClass {
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
  GasGiantClassI = "Sudarsky class I gas giant",
  GasGiantClassII = "Sudarsky class II gas giant",
  GasGiantClassIII = "Sudarsky class III gas giant",
  GasGiantClassIV = "Sudarsky class IV gas giant",
  GasGiantClassV = "Sudarsky class V gas giant",
  GasGiantHeliumRich = "Helium rich gas giant",
  GasGiantHelium = "Helium gas giant",
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
  SimplifiedPlanetClass: SimplifiedPlanetClass;
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
