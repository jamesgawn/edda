import { GenericEvent } from "./GenericEvent";

export interface SystemBoopEvent extends GenericEvent {
  BodyCount: number;
  NonBodyCount: number;
  StarPos: number[];
  SystemAddress: number;
  SystemName: string;
}
