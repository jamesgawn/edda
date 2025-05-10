import pino from "pino";
import { EDDNConnector } from "./EDDNConnector";
import { createServerAdapter } from "@whatwg-node/server";
import { createServer } from "http";
import { AutoRouter } from "itty-router";
import { Server } from "socket.io";

// Setup Logging
const logger = pino(
  {
    level: process.env.LOG_LEVEL || "debug",
  },
  pino.destination({
    minLength: 1024,
    sync: false,
  })
);

// Setup HTTP Server
const httpServerPort = process.env.HTTP_PORT || 3001;

// Setup data feed from EDDN
const SOURCE_URL = "tcp://eddn.edcd.io:9500";
const eDDNConnector = new EDDNConnector(logger, SOURCE_URL);

// Setup API Router
const router = AutoRouter();
router.get("/ping", () => "pong");
const ittyServer = createServerAdapter(router.fetch);
const httpServer = createServer(ittyServer);

// Setup SocketIO Stream
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  logger.info("Client connected");
});
io.on("disconnect", (socket) => {
  logger.info("Client disconnected");
});

// Setup EDDN Stream to Socket IO Stream
eDDNConnector.eventEmitter.addHandler("SystemBoop", (data) => {
  io.emit("SystemBoop", data);
});
eDDNConnector.eventEmitter.addHandler("PlanetScan", (data) => {
  io.emit("PlanetScan", data);
});
eDDNConnector.eventEmitter.addHandler("PlanetScanNewlyDiscovered", (data) => {
  io.emit("PlanetScanNewlyDiscovered", data);
});
eDDNConnector.eventEmitter.addHandler("SystemScanCompleted", (data) => {
  io.emit("SystemScanCompleted", data);
});

async function run() {
  try {
    eDDNConnector.start();

    httpServer.listen(httpServerPort);
    logger.info("Server listening on http://localhost:" + httpServerPort);
  } catch (err) {
    logger.error(err, "Error starting server");
    process.exit(1);
  }
}

run();
