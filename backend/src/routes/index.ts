import { AutoRouter, error } from "itty-router";
import { DataStore } from "../DataStore";
import { Logger } from "pino";
import { NewPlanetaryDiscoveriesBySimplifiedClassResponse } from "../../../shared/types/response/NewPlanetaryDiscoveriesBySimplifiedClassResponse";
import { SimplifiedPlanetClass } from "../../../shared/types/events/PlanetScanEvent";

export function getRoutes(logger: Logger, dataStore: DataStore) {
  const router = AutoRouter();
  router.get("/", () => "ED:DSI API");
  router.get("/ping", () => "pong");

  router.get("/planetScanEvents", async (request) => {
    const limit = request.query.limit
      ? parseInt(request.query.limit as string)
      : undefined;
    return dataStore.planetScanEventStore.getRecentEvents(limit);
  });

  router.get(
    "/planetScanEvents/newlyDiscoveredBySimplifiedPlanetClass",
    async () => {
      const data =
        await dataStore.planetScanEventStore.getNewlyDiscoveredEventsBySimplifiedPlanetClass();

      return {
        status: 200,
        message: "Newly discovered planets by simplified class",
        data: data,
      } as NewPlanetaryDiscoveriesBySimplifiedClassResponse;
    }
  );

  router.get(
    "/planetScanEvents/newlyDiscoveredBySimplifiedPlanetClass/today",
    async () => {
      const today = new Date(Date.now());
      today.setHours(0, 0, 0, 0);

      const data =
        await dataStore.planetScanEventStore.getNewlyDiscoveredEventsBySimplifiedPlanetClass(
          today
        );

      return {
        status: 200,
        message: "Newly discovered planets by simplified class",
        data: data,
      } as NewPlanetaryDiscoveriesBySimplifiedClassResponse;
    }
  );

  return router.fetch;
}
