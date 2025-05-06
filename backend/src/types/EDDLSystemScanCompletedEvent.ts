import { EDDLEvent } from "./EDDLEvent";

export interface EDDLSystemScanCompletedEvent extends EDDLEvent {
  BodyCount: number;
  StarPos: number[];
  SystemAddress: number;
  SystemName: string;
}
