import { EDDNSystemScanCompletedEvent } from "../types/EDDNSystemScanCompletedEvent";
import { EDDNFSSAllBodiesFoundEvent } from "../types/source-types";

export function fromEDDNFSSAllBodiesFoundEvent(event: EDDNFSSAllBodiesFoundEvent): EDDNSystemScanCompletedEvent {
  return {
    BodyCount: event.message.Count,
    StarPos: event.message.StarPos,
    SystemAddress: event.message.SystemAddress,
    SystemName: event.message.SystemName,
    Timestamp: new Date(event.message.timestamp)
  }
}