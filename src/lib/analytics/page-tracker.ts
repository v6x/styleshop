"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "./track";

export function usePageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    track("page_viewed", {
      page_path: pathname,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }, [pathname]);
}
