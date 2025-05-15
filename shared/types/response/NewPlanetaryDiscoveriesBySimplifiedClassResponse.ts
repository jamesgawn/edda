import { NewPlanetaryDiscoveriesBySimplifiedClassEvent } from "../events/NewPlanetaryDiscoveriesBySimplifiedClassEvent";
import { GenericResponse } from "./GenericResponse";

export type NewPlanetaryDiscoveriesBySimplifiedClassResponse = {
  data: NewPlanetaryDiscoveriesBySimplifiedClassEvent;
} & GenericResponse;
