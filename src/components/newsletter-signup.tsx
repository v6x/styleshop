"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/track";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value: string) => {
    setEmail(value);

    // BROKEN: fires on every keystroke instead of on submit
    track("newsletter_signup", {
      email: value,
      source: "footer",
      timestamp: new Date().toISOString(),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // LEGACY: abbreviated event name, but fires correctly on submit
    track("newsletter_sub", {
      email,
      src: "footer",
      ts: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-sm text-green-400">
        Thanks for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <button
        type="submit"
        className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
