import { AutoRouter } from "itty-router";
import { DataStore } from "../DataStore";

export function getRoutes(dataStore: DataStore) {
  const router = AutoRouter();
  router.get("/", () => "EDDI API");
  router.get("/ping", () => "pong");

  router.get("/planetScanEvents", async (request) => {
    const limit = request.query.limit
      ? parseInt(request.query.limit as string)
      : undefined;
    return dataStore.planetScanEventStore.getRecentEvents(limit);
  });

  return router.fetch;
}
