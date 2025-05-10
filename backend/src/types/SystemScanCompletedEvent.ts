import { GenericEvent } from "./GenericEvent";

export interface SystemScanCompletedEvent extends GenericEvent {
  BodyCount: number;
  StarPos: number[];
  SystemAddress: number;
  SystemName: string;
}
