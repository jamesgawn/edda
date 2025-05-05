import pino from 'pino'
import { EDDNStream } from './EDDNStream';
import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'http'
import { AutoRouter } from 'itty-router'

// Setup Logging
const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
},pino.destination({
  minLength: 1024,
  sync: false
}));

// Setup data feed from EDDN
const SOURCE_URL = 'tcp://eddn.edcd.io:9500';
const eDDNStream = new EDDNStream(logger, SOURCE_URL);

// Setup API Router
const router = AutoRouter();
router.get('/ping', () => ("pong"));
const ittyServer = createServerAdapter(router.fetch)

async function  run() {
  try {
    eDDNStream.start();
    
    const httpServerPort = process.env.LOG_LEVEL || 3001;
    const httpServer = createServer(ittyServer)
    httpServer.listen(httpServerPort)
    logger.info('Server listening on http://localhost:' + httpServerPort);

  } catch (err) {
    logger.error(err, 'Error starting server');
    process.exit(1);
  }
}

run();