import { SystemScanCompletedEvent } from "../../../../shared/types/events/SystemScanCompletedEvent";
import { EDDNFSSAllBodiesFoundEvent } from "../types";

export function toEDDLSystemScanCompletedEvent(
  event: EDDNFSSAllBodiesFoundEvent
): SystemScanCompletedEvent {
  return {
    BodyCount: event.message.Count,
    StarPos: event.message.StarPos,
    SystemAddress: event.message.SystemAddress,
    SystemName: event.message.SystemName,
    Timestamp: new Date(event.message.timestamp),
  };
}
