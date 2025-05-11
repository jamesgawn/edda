import { GenericEvent } from "./GenericEvent";

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
  PlanetClass: string;
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
