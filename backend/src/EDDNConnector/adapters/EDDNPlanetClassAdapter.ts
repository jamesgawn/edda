import {
  PlanetClass,
  SimplifiedPlanetClass,
} from "../../../../shared/types/PlanetScanEvent";

export function toPlanetClassEnum(planetClass: string): PlanetClass {
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
