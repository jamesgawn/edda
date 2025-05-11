import {
  PlanetClass,
  SimplifiedPlanetClass,
} from "../../../../shared/types/PlanetScanEvent";

export function toPlanetClassEnum(planetClass: string): PlanetClass {
  if (Object.values(PlanetClass).includes(planetClass as PlanetClass)) {
    return planetClass as PlanetClass;
  }
  throw new Error(`Invalid PlanetClass: ${planetClass}`);
}

export function toSimplifiedPlanetClassEnum(
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
