"use client";

import { usePageTracker } from "@/lib/analytics/page-tracker";

export function PageTracker() {
  usePageTracker();
  return null;
}
