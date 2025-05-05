
import { EDDNSystemBoopEvent } from "../types/EDDNSystemBoopEvent";
import { EDDNFSSDiscoveryScanEvent } from "../types/source-types";

export function fromEDDNFSSDiscoveryScanEvent(event: EDDNFSSDiscoveryScanEvent): EDDNSystemBoopEvent {
  return {
    BodyCount: event.message.BodyCount,
    NonBodyCount: event.message.NonBodyCount,
    StarPos: event.message.StarPos,
    SystemAddress: event.message.SystemAddress,
    SystemName: event.message.SystemName,
    Timestamp: new Date(event.message.timestamp)
  }
}