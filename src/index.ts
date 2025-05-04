import pino from 'pino'
import { EDDNStream } from './eddn-stream';

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';
const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
},pino.destination({
  minLength: 1024, // Buffer before writing
  sync: false // Asynchronous logging
}));

async function run() { 
  const eDDNStream = new EDDNStream(logger, SOURCE_URL);
  await eDDNStream.start();
}

run();