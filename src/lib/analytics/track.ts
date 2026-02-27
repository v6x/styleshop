import * as amplitude from "@amplitude/analytics-browser";

export function track(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  amplitude.track(eventName, properties);
}

// LEGACY: 축약된 속성명 사용, purchase_complete와 중복
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
