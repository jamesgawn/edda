import { SystemBoopEvent } from "../../../../shared/types/SystemBoopEvent";
import { EDDNFSSDiscoveryScanEvent } from "../types";

export function toEDDLSystemBoopEvent(
  event: EDDNFSSDiscoveryScanEvent
): SystemBoopEvent {
  return {
    BodyCount: event.message.BodyCount,
    NonBodyCount: event.message.NonBodyCount,
    StarPos: event.message.StarPos,
    SystemAddress: event.message.SystemAddress,
    SystemName: event.message.SystemName,
    Timestamp: new Date(event.message.timestamp),
  };
}
