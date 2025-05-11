import { Logger } from "pino";
import * as zlib from "zlib";
import * as zmq from "zeromq";
import {
  EDDNFSSAllBodiesFoundEvent,
  EDDNFSSBodySignalsEvent,
  EDDNFSSDiscoveryScanEvent,
  EDDNGenericEvent,
  EDDNJournalAutoScanEvent,
  EDDNJournalDetailedScanEvent,
  EDDNJournalSAASignalsFoundEvent,
  EDDNJournalScanEvent,
  EDDNJournalScanPlanetEvent,
} from "./types";
import { EventEmitter } from "../utils/EventEmitter";
import { toEDDLSystemScanCompletedEvent as toSystemScanCompletedEvent } from "./adapters/EDDNFSSAllBodiesFoundEventAdapter";
import { SystemScanCompletedEvent } from "../../../shared/types/SystemScanCompletedEvent";
import { SystemBoopEvent } from "../../../shared/types/SystemBoopEvent";
import { PlanetScanEvent } from "../../../shared/types/PlanetScanEvent";
import { toEDDLPlanetScanEvent as toPlanetScanEvent } from "./adapters/EDDNJournalScanPlanetEventAdapter";
import { toEDDLSystemBoopEvent as toSystemBoopEvent } from "./adapters/EDDNFSSDiscoveryScanEventAdapter";

export class EDDNConnector {
  private logger: Logger;
  private sourceUrl: string;
  public eventEmitter: EventEmitter<{
    SystemScanCompleted: SystemScanCompletedEvent;
    SystemBoop: SystemBoopEvent;
    PlanetScan: PlanetScanEvent;
    PlanetScanNewlyDiscovered: PlanetScanEvent;
  }> = new EventEmitter();
  private plantaryFindsByClass: Map<string, number> = new Map();

  constructor(logger: Logger, sourceUrl = "tcp://eddn.edcd.io:9500") {
    this.logger = logger.child({ module: "EDDNStream" });
    this.sourceUrl = sourceUrl;
  }

  public async start() {
    const sock = new zmq.Subscriber();

    sock.connect(this.sourceUrl);
    sock.subscribe("");
    this.logger.info("EDDN listener connected to: " + this.sourceUrl);

    for await (const [src] of sock) {
      const event = JSON.parse(
        zlib.inflateSync(Buffer.from(src as any, "base64")).toString()
      ) as EDDNGenericEvent;
      this.logger.trace(event, "Received event from EDDN");

      switch (event.$schemaRef) {
        case "https://eddn.edcd.io/schemas/fssdiscoveryscan/1":
          // System discovery scan
          this.processEDDNFSSDiscoveryScanEvent(
            event as EDDNFSSDiscoveryScanEvent
          );
          break;

        case "https://eddn.edcd.io/schemas/fssallbodiesfound/1":
          // Completed detailed scan of Bodies found in system
          this.processEDDNFSSAllBodiesFoundEvent(
            event as EDDNFSSAllBodiesFoundEvent
          );
          break;
        case "https://eddn.edcd.io/schemas/fssbodysignals/1":
          this.processEDDNFSSBodySignalsEvent(event as EDDNFSSBodySignalsEvent);
          break;
        case "https://eddn.edcd.io/schemas/journal/1":
          this.processEDDNJournalEvent(event as EDDNGenericEvent);
          break;
        case "https://eddn.edcd.io/schemas/fsssignaldiscovered/1":
        default:
          this.logger.trace(
            "Received unsupported event type" + event.$schemaRef
          );
      }
    }
  }

  private async processEDDNFSSAllBodiesFoundEvent(
    event: EDDNFSSAllBodiesFoundEvent
  ) {
    this.logger.info("Completed system scan in " + event.message.SystemName);
    this.eventEmitter.emit(
      "SystemScanCompleted",
      toSystemScanCompletedEvent(event)
    );
  }

  private async processEDDNFSSBodySignalsEvent(event: EDDNFSSBodySignalsEvent) {
    this.logger.trace(
      "Scanned " +
        event.message.BodyName +
        ". Found " +
        event.message.Signals.length +
        " signals."
    );
  }

  private async processEDDNFSSDiscoveryScanEvent(
    event: EDDNFSSDiscoveryScanEvent
  ) {
    this.logger.info(
      "Booped " +
        event.message.SystemName +
        "" +
        ". Found " +
        event.message.BodyCount +
        " bodies and " +
        event.message.NonBodyCount +
        " non-bodies."
    );
    this.eventEmitter.emit("SystemBoop", toSystemBoopEvent(event));
  }

  private async processEDDNJournalEvent(event: EDDNGenericEvent) {
    switch (event.message.event) {
      case "Scan":
        this.processEDDNJournalScanEvent(event as EDDNJournalScanEvent);
        break;
      case "SAASignalsFound":
        this.processEDDNJournalSAASignalsFoundEvent(
          event as EDDNJournalSAASignalsFoundEvent
        );
        break;
      default:
        this.logger.trace(
          "Received unsupported journal event:" + event.message.event
        );
    }
  }

  private async processEDDNJournalScanEvent(event: EDDNJournalScanEvent) {
    switch (event.message.ScanType) {
      case "Detailed":
        this.processEDDNJourneyDetailedScanEvent(
          event as EDDNJournalDetailedScanEvent
        );
        break;
      case "AutoScan":
        this.processEDDNJourneyAutoScanEvent(event as EDDNJournalAutoScanEvent);
        break;
      case "NavBeaconDetail":
      default:
        this.logger.trace(
          "Received unsupported scan type " + event.message.ScanType
        );
        break;
    }
  }

  private async processEDDNJourneyDetailedScanEvent(
    event: EDDNJournalDetailedScanEvent
  ) {
    this.processEDDNJourneyScanEvent(event);
  }

  private async processEDDNJourneyAutoScanEvent(
    event: EDDNJournalAutoScanEvent
  ) {
    this.processEDDNJourneyScanEvent(event);
  }

  private async processEDDNJourneyScanEvent(event: EDDNJournalScanEvent) {
    // Completed scan of body
    if (event.message.PlanetClass != undefined) {
      this.eventEmitter.emit(
        "PlanetScan",
        toPlanetScanEvent(event as EDDNJournalScanPlanetEvent)
      );
      if (event.message.WasDiscovered === false) {
        this.logger.info(
          "Scanned " +
            event.message.BodyName +
            " (" +
            event.message.PlanetClass +
            ")"
        );
        this.eventEmitter.emit(
          "PlanetScanNewlyDiscovered",
          toPlanetScanEvent(event as EDDNJournalScanPlanetEvent)
        );
      }
    } else if (event.message.StarType != undefined) {
      this.logger.trace(
        "Scanned " +
          event.message.BodyName +
          " (Type " +
          event.message.StarType +
          ")"
      );
    }
  }

  private async processEDDNJournalSAASignalsFoundEvent(
    event: EDDNJournalSAASignalsFoundEvent
  ) {
    this.logger.trace(
      "Scanned " +
        event.message.BodyName +
        ". Found " +
        event.message.Signals.length +
        " signals."
    );
  }
}
