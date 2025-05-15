import {
  PlanetClass,
  SimplifiedPlanetClass,
} from "../../../../shared/types/events/PlanetScanEvent";
import { GenericEventDso } from "./GenericEventDso";

export interface PlanetScanEventDso extends GenericEventDso {
  Atmosphere: string | null;
  AtmosphereType: string | null;
  BodyID: number;
  BodyName: string;
  CompositionIce: number;
  CompositionMetal: number;
  CompositionRock: number;
  DistanceFromArrivalLS: number;
  Eccentricity: number;
  Landable: 0 | 1;
  MassEM: number;
  SimplifiedPlanetClass: string;
  PlanetClass: string;
  MeanAnomaly: number | null;
  OrbitalInclination: number;
  OrbitalPeriod: number;
  Periapsis: number;
  ReserveLevel: string | null;
  RotationPeriod: number;
  Radius: number;
  SemiMajorAxis: number;
  ScanType: string;
  StarPosX: number;
  StarPosY: number;
  StarPosZ: number;
  SystemName: string;
  SystemAddress: number;
  SurfaceGravity: number;
  SurfacePressure: number;
  TerraformState: string;
  TidalLock: 0 | 1;
  Volcanism: string;
  WasDiscovered: 0 | 1;
  WasMapped: 0 | 1;
}
