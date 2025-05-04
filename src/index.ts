import * as zlib from 'zlib';
import * as zmq from 'zeromq';
import { EDDNFSSAllBodiesFoundEvent, EDDNFSSBodySignalsEvent, EDDNFSSDiscoveryScanEvent, EDDNGenericEvent, EDDNJournalAutoScanEvent, EDDNJournalDetailedScanEvent, EDDNJournalSAASignalsFoundEvent, EDDNJournalScanEvent, EDDNJournalSSAScanCompleteEvent } from "./types";
import pino from 'pino'

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';
const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
},pino.destination({
  minLength: 1024, // Buffer before writing
  sync: false // Asynchronous logging
}));

async function run() {
  const sock = new zmq.Subscriber;

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  logger.info('EDDN listener connected to:', SOURCE_URL);

  for await (const [src] of sock) {
    const event = JSON.parse(zlib.inflateSync(Buffer.from(src as any, 'base64')).toString()) as EDDNGenericEvent;
    logger.trace(event, "Received event from EDDN");

    switch (event.$schemaRef) {
      // System discovery scan
      case "https://eddn.edcd.io/schemas/fssdiscoveryscan/1":
        processEDDNFSSDiscoveryScanEvent(event as EDDNFSSDiscoveryScanEvent)
        break;
      // Completed detailed scan of Bodies found in system
        case "https://eddn.edcd.io/schemas/fssallbodiesfound/1": 
        processEDDNFSSAllBodiesFoundEvent(event as EDDNFSSAllBodiesFoundEvent);
        break;
      case "https://eddn.edcd.io/schemas/fssbodysignals/1": 
        processEDDNFSSBodySignalsEvent(event as EDDNFSSBodySignalsEvent)
        break;
      case "https://eddn.edcd.io/schemas/journal/1":
        processEDDNJournalEvent(event as EDDNGenericEvent)
        break;
      case "https://eddn.edcd.io/schemas/fsssignaldiscovered/1":
      default: 
        logger.trace("Received unsupported event type" + event.$schemaRef);
    }
  }
}

async function processEDDNFSSAllBodiesFoundEvent (event: EDDNFSSAllBodiesFoundEvent) { 
  logger.info("Completed system scan in " + event.message.SystemName);
  // TODO: Add system to capture completed system scans.
}

async function processEDDNFSSBodySignalsEvent (event: EDDNFSSBodySignalsEvent) { 
  logger.trace("Scanned " + event.message.BodyName + ". Found " + event.message.Signals.length + " signals.");
}

async function processEDDNFSSDiscoveryScanEvent (event: EDDNFSSDiscoveryScanEvent) { 
  logger.info("Booped " + event.message.SystemName + "" + ". Found " + event.message.BodyCount + " bodies and " + event.message.NonBodyCount + " non-bodies.");
  // TODO: Add system to capture system boop events.
}

async function processEDDNJournalEvent (event: EDDNGenericEvent) {
  switch (event.message.event) {
    case "Scan":
      processEDDNJournalScanEvent(event as EDDNJournalScanEvent);
      break;
    case "SAASignalsFound":
      processEDDNJournalSAASignalsFoundEvent(event as EDDNJournalSAASignalsFoundEvent);
      break;
    default: 
      logger.trace("Received unsupported journal event:" + event.message.event)
  }
}

async function processEDDNJournalScanEvent (event: EDDNJournalScanEvent) {
  switch (event.message.ScanType) {
    case "Detailed":
      processEDDNJourneyDetailedScanEvent(event as EDDNJournalDetailedScanEvent);
      break;
    case "AutoScan":
      processEDDNJourneyAutoScanEvent(event as EDDNJournalAutoScanEvent);
      break;
    case "NavBeaconDetail":
    default:
      logger.trace("Received unsupported scan type " + event.message.ScanType);
      break;
  }
}

async function processEDDNJourneyDetailedScanEvent(event: EDDNJournalDetailedScanEvent){
  processEDDNJourneyScanEvent(event);
}

async function processEDDNJourneyAutoScanEvent(event: EDDNJournalAutoScanEvent) {
  processEDDNJourneyScanEvent(event);
}

async function processEDDNJourneyScanEvent(event: EDDNJournalScanEvent) {
  // Completed scan of body
  if (event.message.PlanetClass != undefined) {
    logger.info("Scanned " + event.message.BodyName + " (" + event.message.PlanetClass + "). Discovered:" + event.message.WasDiscovered + ", Mapped:" + event.message.WasMapped);
  } else if (event.message.StarType != undefined) {
    logger.info("Scanned " + event.message.BodyName + " (Star Type " + event.message.StarType + ")");
  }

  // TODO: Add system to capture body scan events.
}

async function processEDDNJournalSAASignalsFoundEvent(event: EDDNJournalSAASignalsFoundEvent) {
  logger.trace("Scanned " + event.message.BodyName + ". Found " + event.message.Signals.length + " signals.");
}

run();