import * as zlib from 'zlib';
import * as zmq from 'zeromq';

const SOURCE_URL = 'tcp://eddn.edcd.io:9500';

async function run() {
  const sock = new zmq.Subscriber;

  sock.connect(SOURCE_URL);
  sock.subscribe('');
  console.log('EDDN listener connected to:', SOURCE_URL);

  for await (const [src] of sock) {
    const msgContents = JSON.parse(zlib.inflateSync(Buffer.from(src as any, 'base64')).toString());
    
    console.log(
      msgContents
    )
  }

}

run();