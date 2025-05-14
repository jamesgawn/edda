import { AutoRouter } from "itty-router";
import { DataStore } from "../DataStore";

export function getRoutes(dataStore: DataStore) {
  const router = AutoRouter();
  router.get("/", () => "EDDI API");
  router.get("/ping", () => "pong");

  router.get("/planetScanEvents", async (query) => {
    return dataStore.planetScanEventStore.getRecentEvents(query.limit);
  });

  return router.fetch;
}
