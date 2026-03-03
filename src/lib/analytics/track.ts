import * as amplitude from "@amplitude/analytics-browser";

export function track(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  amplitude.track(eventName, properties);
}

// LEGACY: uses abbreviated property names, duplicates purchase_complete
export function trackLegacyPurchase(
  orderId: string,
  amount: number,
  itemCount: number,
) {
  amplitude.track("evt_purchase", {
    oid: orderId,
    amt: amount,
    cnt: itemCount,
  });
}
