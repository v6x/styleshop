import { Types } from "@amplitude/analytics-browser";

export function postMessagePlugin(): Types.EnrichmentPlugin {
  return {
    name: "postmessage-plugin",
    type: "enrichment" as const,

    setup() {
      return Promise.resolve();
    },

    execute(event) {
      if (
        typeof window !== "undefined" &&
        window.parent !== window &&
        event.event_type
      ) {
        window.parent.postMessage(
          {
            type: "amplitude_event",
            eventType: event.event_type,
            properties: event.event_properties ?? {},
          },
          "*",
        );
      }
      return Promise.resolve(event);
    },
  };
}
