import { EDDLEvent } from "./EDDLEvent";

export interface EDDLSystemBoopEvent extends EDDLEvent {
  BodyCount: number;
  NonBodyCount: number;
  StarPos: number[];
  SystemAddress: number;
  SystemName: string;
}
