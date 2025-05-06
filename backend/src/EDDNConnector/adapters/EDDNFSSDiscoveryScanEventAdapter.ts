import { EDDLSystemBoopEvent } from "../../types/EDDLSystemBoopEvent";
import { EDDNFSSDiscoveryScanEvent } from "../types";

export function toEDDLSystemBoopEvent(
  event: EDDNFSSDiscoveryScanEvent
): EDDLSystemBoopEvent {
  return {
    BodyCount: event.message.BodyCount,
    NonBodyCount: event.message.NonBodyCount,
    StarPos: event.message.StarPos,
    SystemAddress: event.message.SystemAddress,
    SystemName: event.message.SystemName,
    Timestamp: new Date(event.message.timestamp),
  };
}
