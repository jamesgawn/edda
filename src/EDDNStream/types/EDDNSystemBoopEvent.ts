import { EDDNEvent } from "./EDDNEvent";

export interface EDDNSystemBoopEvent extends EDDNEvent { 
  BodyCount: number,
  NonBodyCount: number,
  StarPos: number[],
  SystemAddress: number,
  SystemName: string,
}