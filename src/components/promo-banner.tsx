"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/track";

interface PromoBannerProps {
  title: string;
  description: string;
  discount: number;
  link: string;
}

export function PromoBanner({
  title,
  description,
  discount,
  link,
}: PromoBannerProps) {
  const handleClick = () => {
    // BROKEN: discount_percentage 속성이 누락됨
    track("promo_banner_click", {
      banner_title: title,
      link,
    });
  };

  return (
    <Link
      href={link}
      onClick={handleClick}
      className="block bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80 mb-1">{description}</p>
          <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
        </div>
        <span className="text-3xl sm:text-4xl font-bold">{discount}%</span>
      </div>
    </Link>
  );
}
