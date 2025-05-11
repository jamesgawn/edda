import type { GenericEvent } from "./GenericEvent";

export enum SimplifiedPlanetClass {
  MetalRich = "Metal Rich",
  HighMetalContent = "High Metal Content",
  Rocky = "Rocky",
  Icy = "Icy",
  RockyIcy = "Ricky Icy",
  Earthlike = "Earthlike",
  WaterWorld = "Water World",
  AmonniaWorld = "Amonnia World",
  WaterGiant = "Water Giant",
  GasGiant = "Gas Giant",
}
export enum PlanetClass {
  MetalRich = "Metal-Rich",
  HighMetalContent = "High Metal Content",
  Rocky = "Rocky",
  Icy = "Icy",
  RockyIcy = "Rocky Ice",
  Earthlike = "Earthlike",
  WaterWorld = "Water World",
  AmmoniaWorld = "Ammonia World",
  WaterGiant = "Water Giant",
  WaterGiantWithLife = "Water Giant with Life",
  GasGiantWithWaterBasedLife = "Gas Giant with Water Based Life",
  GasGiantWithAmmoniaBasedLife = "Gas Giant with Ammonia Based Life",
  GasGiantClassI = "Gas Giant - Class I",
  GasGiantClassII = "Gas Giant - Class II",
  GasGiantClassIII = "Gas Giant - Class III",
  GasGiantClassIV = "Gas Giant - Class IV",
  GasGiantClassV = "Gas Giant - Class V",
  GasGiantHeliumRich = "Gas Giant - Helium Rich",
  GasGiantHelium = "Gas Giant - Helium",
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
