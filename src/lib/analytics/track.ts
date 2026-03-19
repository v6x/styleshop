import * as amplitude from "@amplitude/analytics-browser";

export function track(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  amplitude.track(eventName, properties);
}
