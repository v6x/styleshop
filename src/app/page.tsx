"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { PromoBanner } from "@/components/promo-banner";
import { track } from "@/lib/analytics/track";

export default function HomePage() {
  const featured = products.slice(0, 4);

  const handlePromoClick = () => {
    // LEGACY: duplicates promo_banner_click with different properties
    track("promo_click", {
      banner: "winter_sale",
      dest: "/products",
      ts: Date.now(),
    });
  };

  const handleViewAllClick = () => {
    track("view_all_clicked", {
      source_section: "featured_products",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-12 sm:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Style Your Life
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Discover trendy fashion items. New styles updated every week.
        </p>
        <Link
          href="/products"
          className="inline-block mt-8 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Promo Banner — BROKEN event (discount_percentage missing) + LEGACY duplicate */}
      <section className="mb-12" onClick={handlePromoClick}>
        <PromoBanner
          title="Winter Sale"
          description="Up to max discount on winter items"
          discount={30}
          link="/products"
        />
      </section>

      {/* Featured Products */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
