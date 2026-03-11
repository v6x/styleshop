"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { postMessagePlugin } from "./postmessage-plugin";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export function AmplitudeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (AMPLITUDE_API_KEY) {
      amplitude.init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: false,
      });
      amplitude.add(postMessagePlugin());
    }
  }, []);

  return <>{children}</>;
}
