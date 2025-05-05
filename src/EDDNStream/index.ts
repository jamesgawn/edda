import { Logger } from 'pino'
import * as zlib from 'zlib';
import * as zmq from 'zeromq';
import { EDDNFSSAllBodiesFoundEvent, EDDNFSSBodySignalsEvent, EDDNFSSDiscoveryScanEvent, EDDNGenericEvent, EDDNJournalAutoScanEvent, EDDNJournalDetailedScanEvent, EDDNJournalSAASignalsFoundEvent, EDDNJournalScanEvent, EDDNJournalSSAScanCompleteEvent } from "./types";
import { EventEmitter } from '../utils/EventEmitter';


export class EDDNStream {
  private logger: Logger;
  private sourceUrl: string;
  public eventEmitter: EventEmitter<{allBodiesFound: EDDNFSSAllBodiesFoundEvent}> = new EventEmitter();

  constructor(logger: Logger, sourceUrl = 'tcp://eddn.edcd.io:9500') {
    this.logger = logger.child({ module: "EDDNStream" });
    this.sourceUrl = sourceUrl;
  }

  public async start() {
      const sock = new zmq.Subscriber;
    
      sock.connect(this.sourceUrl);
      sock.subscribe('');
      this.logger.info('EDDN listener connected to:', this.sourceUrl);
    
      for await (const [src] of sock) {
        const event = JSON.parse(zlib.inflateSync(Buffer.from(src as any, 'base64')).toString()) as EDDNGenericEvent;
        this.logger.trace(event, "Received event from EDDN");
    
        switch (event.$schemaRef) {
          case "https://eddn.edcd.io/schemas/fssdiscoveryscan/1":
             // System discovery scan 
            this.processEDDNFSSDiscoveryScanEvent(event as EDDNFSSDiscoveryScanEvent)
            break;
          
          case "https://eddn.edcd.io/schemas/fssallbodiesfound/1": 
            // Completed detailed scan of Bodies found in system
            this.processEDDNFSSAllBodiesFoundEvent(event as EDDNFSSAllBodiesFoundEvent);
            break;
          case "https://eddn.edcd.io/schemas/fssbodysignals/1": 
          this.processEDDNFSSBodySignalsEvent(event as EDDNFSSBodySignalsEvent)
            break;
          case "https://eddn.edcd.io/schemas/journal/1":
            this.processEDDNJournalEvent(event as EDDNGenericEvent)
            break;
          case "https://eddn.edcd.io/schemas/fsssignaldiscovered/1":
          default: 
            this.logger.trace("Received unsupported event type" + event.$schemaRef);
        }
      }
  }


  private async processEDDNFSSAllBodiesFoundEvent (event: EDDNFSSAllBodiesFoundEvent) { 
    this.logger.info("Completed system scan in " + event.message.SystemName);
    // TODO: Add system to capture completed system scans.
    this.eventEmitter.emit("allBodiesFound", event);
  }

  private async processEDDNFSSBodySignalsEvent (event: EDDNFSSBodySignalsEvent) { 
    this.logger.trace("Scanned " + event.message.BodyName + ". Found " + event.message.Signals.length + " signals.");
  }
  
  private async processEDDNFSSDiscoveryScanEvent (event: EDDNFSSDiscoveryScanEvent) { 
    this.logger.info("Booped " + event.message.SystemName + "" + ". Found " + event.message.BodyCount + " bodies and " + event.message.NonBodyCount + " non-bodies.");
    // TODO: Add system to capture system boop events.
  }
  
  private async processEDDNJournalEvent (event: EDDNGenericEvent) {
    switch (event.message.event) {
      case "Scan":
        this.processEDDNJournalScanEvent(event as EDDNJournalScanEvent);
        break;
      case "SAASignalsFound":
        this.processEDDNJournalSAASignalsFoundEvent(event as EDDNJournalSAASignalsFoundEvent);
        break;
      default: 
        this.logger.trace("Received unsupported journal event:" + event.message.event)
    }
  }
  
  private async processEDDNJournalScanEvent (event: EDDNJournalScanEvent) {
    switch (event.message.ScanType) {
      case "Detailed":
        this.processEDDNJourneyDetailedScanEvent(event as EDDNJournalDetailedScanEvent);
        break;
      case "AutoScan":
        this. processEDDNJourneyAutoScanEvent(event as EDDNJournalAutoScanEvent);
        break;
      case "NavBeaconDetail":
      default:
        this.logger.trace("Received unsupported scan type " + event.message.ScanType);
        break;
    }
  }
  
  private async processEDDNJourneyDetailedScanEvent(event: EDDNJournalDetailedScanEvent){
    this.processEDDNJourneyScanEvent(event);
  }

  private async processEDDNJourneyAutoScanEvent(event: EDDNJournalAutoScanEvent) {
    this.processEDDNJourneyScanEvent(event);
  }
  
  private async processEDDNJourneyScanEvent(event: EDDNJournalScanEvent) {
    // Completed scan of body
    if (event.message.PlanetClass != undefined) {
      this.logger.info("Scanned " + event.message.BodyName + " (" + event.message.PlanetClass + "). Discovered:" + event.message.WasDiscovered + ", Mapped:" + event.message.WasMapped);
    } else if (event.message.StarType != undefined) {
      this.logger.info("Scanned " + event.message.BodyName + " (Star Type " + event.message.StarType + ")");
    }
  
    // TODO: Add system to capture body scan events.
  }
  
  private async processEDDNJournalSAASignalsFoundEvent(event: EDDNJournalSAASignalsFoundEvent) {
    this.logger.trace("Scanned " + event.message.BodyName + ". Found " + event.message.Signals.length + " signals.");
  }

}