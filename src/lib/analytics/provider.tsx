"use client";

import React, { useEffect } from "react";
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
      amplitude.add(postMessagePlugin());
      amplitude.init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: false,
      });

      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get("utm_source");
      const utmMedium = searchParams.get("utm_medium");
      const utmCampaign = searchParams.get("utm_campaign");
      const utmContent = searchParams.get("utm_content");
      const utmTerm = searchParams.get("utm_term");
      const gclid = searchParams.get("gclid");
      const fbclid = searchParams.get("fbclid");

      const isAdAttributed = !!(
        utmSource ||
        utmMedium ||
        utmCampaign ||
        utmContent ||
        utmTerm ||
        gclid ||
        fbclid
      );

      const getDeviceType = () => {
        if (typeof window === "undefined") return "unknown";
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return "tablet";
        }
        if (
          /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
          )
        ) {
          return "mobile";
        }
        return "desktop";
      };

      amplitude.track("session_started", {
        session_id: amplitude.getSessionId(),
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_term: utmTerm,
        gclid: gclid,
        fbclid: fbclid,
        is_ad_attributed: isAdAttributed,
        landing_page_url: window.location.href,
        landing_page_name: window.location.pathname,
        referrer_url: document.referrer,
        device_type: getDeviceType(),
      });
    }
  }, []);

  return <>{children}</>;
}
