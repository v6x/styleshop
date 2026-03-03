"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/track";

export function CouponInput() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (!code.trim()) return;

    // LEGACY/DUPLICATE: apply_coupon and coupon_applied fire from different locations
    track("apply_coupon", {
      coupon_code: code,
      page: "coupon_input",
    });

    setApplied(true);
  };

  if (applied) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <span>Coupon applied: {code}</span>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter coupon code"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <button
        onClick={handleApply}
        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
