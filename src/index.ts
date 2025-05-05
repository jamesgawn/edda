import pino from 'pino'
import { EDDNStream } from './EDDNStream';
import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'http'
import { AutoRouter } from 'itty-router'
import { Server } from 'socket.io';

// Setup Logging
const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
},pino.destination({
  minLength: 1024,
  sync: false
}));

// Setup HTTP Server
const httpServerPort = process.env.LOG_LEVEL || 3001;

// Setup data feed from EDDN
const SOURCE_URL = 'tcp://eddn.edcd.io:9500';
const eDDNStream = new EDDNStream(logger, SOURCE_URL);

// Setup API Router
const router = AutoRouter();
router.get('/ping', () => ("pong"));
const ittyServer = createServerAdapter(router.fetch)
const httpServer = createServer(ittyServer)

// Setup SocketIO Stream
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
  logger.info('Client connected');
});
io.on("disconnect", (socket) => {
  logger.info('Client disconnected');
});

// Setup EDDN Stream to Socket IO Stream
eDDNStream.eventEmitter.addHandler("EDDNSystemBoop", (data) => {
  io.emit("EDDNSystemBoop", data);
})
eDDNStream.eventEmitter.addHandler("EDDNPlanetScan", (data) => {
  io.emit("EDDNPlanetScan", data);
})
eDDNStream.eventEmitter.addHandler("EDDNSystemScanCompleted", (data) => {
  io.emit("EDDNSystemScanCompleted", data);
})

async function  run() {
  try {
    eDDNStream.start();
    
    httpServer.listen(httpServerPort)
    logger.info('Server listening on http://localhost:' + httpServerPort);

  } catch (err) {
    logger.error(err, 'Error starting server');
    process.exit(1);
  }
}

run();