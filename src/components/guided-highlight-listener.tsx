"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HIGHLIGHT_CLASS = "guided-highlight";
const OVERLAY_ID = "guided-overlay";
const STYLE_ID = "guided-highlight-styles";

const HIGHLIGHT_CSS = `
#${OVERLAY_ID} {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 9998;
  pointer-events: auto;
  transition: opacity 200ms ease-out;
}

.${HIGHLIGHT_CLASS} {
  position: relative;
  z-index: 9999;
  pointer-events: auto;
  box-shadow:
    0 0 0 4px #f97316,
    0 0 0 8px rgba(249, 115, 22, 0.3),
    0 0 40px rgba(249, 115, 22, 0.35);
  border-radius: 12px;
  animation: guided-pulse 2s ease-in-out infinite;
  transform: scale(1.02);
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}

@keyframes guided-pulse {
  0%, 100% {
    box-shadow:
      0 0 0 4px #f97316,
      0 0 0 8px rgba(249, 115, 22, 0.3),
      0 0 40px rgba(249, 115, 22, 0.35);
  }
  50% {
    box-shadow:
      0 0 0 6px #f97316,
      0 0 0 12px rgba(249, 115, 22, 0.25),
      0 0 60px rgba(249, 115, 22, 0.5);
  }
}

/* Non-highlighted siblings get dimmed */
[data-guided].guided-dimmed {
  opacity: 0.35;
  filter: grayscale(0.6);
  pointer-events: none;
  transition: opacity 300ms ease-out, filter 300ms ease-out;
}
`;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = HIGHLIGHT_CSS;
  document.head.appendChild(style);
}

function cleanup() {
  document.getElementById(OVERLAY_ID)?.remove();
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(HIGHLIGHT_CLASS);
    el.removeAttribute("aria-current");
  });
  document.querySelectorAll(".guided-dimmed").forEach((el) => {
    el.classList.remove("guided-dimmed");
  });
}

const VALID_TARGETS = new Set(["product-card", "add-to-cart"]);

function applyHighlight(target: string, index?: number) {
  if (!VALID_TARGETS.has(target)) return;
  cleanup();

  // Add dim overlay
  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  document.body.appendChild(overlay);

  // Select target elements
  const elements = document.querySelectorAll<HTMLElement>(
    `[data-guided="${target}"]`,
  );

  if (index !== undefined && index >= 0 && index < elements.length) {
    // Highlight only the specified element; dim the rest
    elements.forEach((el, i) => {
      if (i === index) {
        el.classList.add(HIGHLIGHT_CLASS);
        el.setAttribute("aria-current", "true");
      } else {
        el.classList.add("guided-dimmed");
      }
    });
  } else {
    // Fallback: highlight all (legacy behavior)
    elements.forEach((el) => {
      el.classList.add(HIGHLIGHT_CLASS);
    });
  }
}

/**
 * Listens for guided_highlight messages from parent window.
 * Only activates when running inside an iframe.
 *
 * Protocol:
 *   Parent → StyleShop: { type: "guided_highlight", target: "product-card" | "add-to-cart" | null, index?: number }
 *   StyleShop → Parent: { type: "guided_highlight_ready" }  (on page navigation)
 */
export function GuidedHighlightListener() {
  const pathname = usePathname();

  // Setup message listener (once)
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    injectStyles();

    function handleMessage(e: MessageEvent) {
      if (!e.data || e.data.type !== "guided_highlight") return;

      const target = e.data.target as string | null;
      const index = typeof e.data.index === "number" ? e.data.index : undefined;

      if (target) {
        applyHighlight(target, index);
      } else {
        cleanup();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      cleanup();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Signal parent on every page navigation (pathname change)
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    // Small delay to ensure new page DOM is rendered
    const timer = setTimeout(() => {
      window.parent.postMessage({ type: "guided_highlight_ready" }, "*");
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
