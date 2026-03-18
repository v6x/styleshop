"use client";

import { useEffect, useRef } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { postMessagePlugin } from "./postmessage-plugin";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export function AmplitudeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (AMPLITUDE_API_KEY) {
      amplitude.add(postMessagePlugin());
      amplitude.init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: false,
      });
    }
  }, []);

  return <>{children}</>;
}
