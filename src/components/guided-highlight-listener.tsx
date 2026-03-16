"use client";

import { useEffect } from "react";

const HIGHLIGHT_CLASS = "guided-highlight";
const OVERLAY_ID = "guided-overlay";
const STYLE_ID = "guided-highlight-styles";

const HIGHLIGHT_CSS = `
#${OVERLAY_ID} {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  pointer-events: auto;
  transition: opacity 200ms ease-out;
}

.${HIGHLIGHT_CLASS} {
  position: relative;
  z-index: 9999;
  pointer-events: auto;
  box-shadow: 0 0 0 3px #00a36d, 0 0 20px rgba(0, 163, 109, 0.4);
  border-radius: 12px;
  animation: guided-pulse 1.5s ease-in-out infinite;
}

@keyframes guided-pulse {
  0%, 100% { box-shadow: 0 0 0 3px #00a36d, 0 0 15px rgba(0, 163, 109, 0.3); }
  50% { box-shadow: 0 0 0 5px #00a36d, 0 0 25px rgba(0, 163, 109, 0.5); }
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
  });
}

function applyHighlight(target: string) {
  cleanup();

  // Add dim overlay
  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  document.body.appendChild(overlay);

  // Highlight target elements
  const elements = document.querySelectorAll(`[data-guided="${target}"]`);
  elements.forEach((el) => {
    el.classList.add(HIGHLIGHT_CLASS);
  });
}

/**
 * Listens for guided_highlight messages from parent window.
 * Only activates when running inside an iframe.
 *
 * Protocol:
 *   Parent → StyleShop: { type: "guided_highlight", target: "product-card" | "add-to-cart" | null }
 *   StyleShop → Parent: { type: "guided_highlight_ready" }  (on mount / page navigation)
 */
export function GuidedHighlightListener() {
  useEffect(() => {
    // Only activate inside iframe
    if (typeof window === "undefined" || window.parent === window) return;

    injectStyles();

    function handleMessage(e: MessageEvent) {
      if (!e.data || e.data.type !== "guided_highlight") return;

      const target = e.data.target as string | null;

      if (target) {
        applyHighlight(target);
      } else {
        cleanup();
      }
    }

    window.addEventListener("message", handleMessage);

    // Signal parent that we're ready (handles iframe page navigation)
    window.parent.postMessage({ type: "guided_highlight_ready" }, "*");

    return () => {
      cleanup();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null;
}
