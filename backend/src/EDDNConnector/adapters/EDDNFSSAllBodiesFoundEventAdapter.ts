import { EDDLSystemScanCompletedEvent } from "../../types/EDDLSystemScanCompletedEvent";
import { EDDNFSSAllBodiesFoundEvent } from "../types";

export function toEDDLSystemScanCompletedEvent(
  event: EDDNFSSAllBodiesFoundEvent
): EDDLSystemScanCompletedEvent {
  return {
    BodyCount: event.message.Count,
    StarPos: event.message.StarPos,
    SystemAddress: event.message.SystemAddress,
    SystemName: event.message.SystemName,
    Timestamp: new Date(event.message.timestamp),
  };
}
