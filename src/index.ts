import * as zlib from 'zlib';
import * as zmq from 'zeromq';
import { EDDNFSSAllBodiesFoundEvent, EDDNFSSBodySignalsEvent, EDDNFSSDiscoveryScanEvent, EDDNGenericEvent, EDDNJournalDetailedScanEvent, EDDNJournalSAASignalsFoundEvent, EDDNJournalScanEvent, EDDNJournalSSAScanCompleteEvent } from "./types";
import { logDeep } from './utils';
import { deepEqual } from 'assert';
import { log } from 'console';

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

async function run() {
  const sock = new zmq.Subscriber;

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  for await (const [src] of sock) {
    const event = JSON.parse(zlib.inflateSync(Buffer.from(src as any, 'base64')).toString()) as EDDNGenericEvent;

    switch (event.$schemaRef) {
      // System discovery scan
      case "https://eddn.edcd.io/schemas/fssdiscoveryscan/1":
        processEDDNFSSDiscoveryScanEvent(event as EDDNFSSDiscoveryScanEvent)
        break;
      // Bodies found in system
        case "https://eddn.edcd.io/schemas/fssallbodiesfound/1": 
        processEDDNFSSAllBodiesFoundEvent(event as EDDNFSSAllBodiesFoundEvent);
        break;
      case "https://eddn.edcd.io/schemas/fssbodysignals/1": 
        processEDDNFSSBodySignalsEvent(event as EDDNFSSBodySignalsEvent)
        break;
      case "https://eddn.edcd.io/schemas/fsssignaldiscovered/1":
        // logDeep(event);
        break;
      case "https://eddn.edcd.io/schemas/journal/1":
        processEDDNJournalEvent(event as EDDNGenericEvent)
        break;
      default: 
        //console.log(event.message.event)
    }
  }
}

async function processEDDNFSSAllBodiesFoundEvent (event: EDDNFSSAllBodiesFoundEvent) { 
  console.log("Completed system scan in " + event.message.SystemName);
}

async function processEDDNFSSBodySignalsEvent (event: EDDNFSSBodySignalsEvent) { 
  //logDeep(event);
}

async function processEDDNFSSDiscoveryScanEvent (event: EDDNFSSDiscoveryScanEvent) { 
  console.log("Booped " + event.message.SystemName + "" + ". Found " + event.message.BodyCount + " bodies and " + event.message.NonBodyCount + " non-bodies.");
}

async function processEDDNJournalEvent (event: EDDNGenericEvent) {
  switch (event.message.event) {
    case "Scan":
      processEDDNJournalScanEvent(event as EDDNJournalScanEvent);
      break;
    case "SAASignalsFound":
      processEDDNJournalSAASignalsFoundEvent(event as EDDNJournalSAASignalsFoundEvent);
      break;
  }
}

async function processEDDNJournalScanEvent (event: EDDNJournalScanEvent) {
  switch (event.message.ScanType) {
    case "Detailed":
      processEDDNJourneyDetailedScanEvent(event as EDDNJournalDetailedScanEvent);
      break;
    case "AutoScan":
      // logDeep(event);
      break;
    case "NavBeaconDetail":
      // Don't need to do anything with this yet.
      break;
    default:
      console.log("Scan type " + event.message.ScanType + " not supported.");
      break;
  }
}

async function processEDDNJourneyDetailedScanEvent(event: EDDNJournalDetailedScanEvent){
  // Completed mapping a body.
  if (event.message.PlanetClass != undefined) {
    console.log("Mapped " + event.message.BodyName + " (" + event.message.PlanetClass + ")");
  } else if (event.message.StarType != undefined) {
    console.log("Mapped " + event.message.BodyName + " (Star Type " + event.message.StarType + ")");
  }
}

async function processEDDNJournalSAASignalsFoundEvent(event: EDDNJournalSAASignalsFoundEvent) {
  console.log("Scanned " + event.message.BodyName + ". Found " + event.message.Signals.length + " signals.");
}

run();