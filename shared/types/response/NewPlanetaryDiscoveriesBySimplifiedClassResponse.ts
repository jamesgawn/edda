import type { NewPlanetaryDiscoveriesBySimplifiedClassEvent } from "../events/NewPlanetaryDiscoveriesBySimplifiedClassEvent";
import type { GenericResponse } from "./GenericResponse";

export type NewPlanetaryDiscoveriesBySimplifiedClassResponse = {
  data: NewPlanetaryDiscoveriesBySimplifiedClassEvent;
} & GenericResponse;
