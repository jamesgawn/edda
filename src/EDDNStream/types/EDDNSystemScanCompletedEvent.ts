import { EDDNEvent } from "./EDDNEvent";

export interface EDDNSystemScanCompletedEvent extends EDDNEvent { 
  BodyCount: number,
  StarPos: number[],
  SystemAddress: number,
  SystemName: string,
}