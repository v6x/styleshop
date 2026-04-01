"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { use, useEffect, useState, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BuyNowButton } from "@/components/buy-now-button";
import { VariantSelector } from "@/components/variant-selector";
import { WishlistButton } from "@/components/wishlist-button";
import { RecentlyViewed } from "@/components/recently-viewed";
import { useRecentlyViewed } from "@/lib/hooks/use-recently-viewed";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);
  const { items: recentlyViewed, add: addToRecentlyViewed } =
    useRecentlyViewed();
  const [pageLoadTime] = useState(Date.now());
  const reviewsRef = useRef<HTMLDivElement>(null);

  const handleImageInteraction = () => {
    if (!product) return;
    const timeOnPageSec = (Date.now() - pageLoadTime) / 1000;
    amplitude.track("product_image_interacted", {
      product_id: product.id,
      interaction_type: "click",
      image_index: 0,
      total_images: 1,
      time_on_page_sec: timeOnPageSec,
      session_id: amplitude.getSessionId(),
    });
  };

  useEffect(() => {
    if (product) {
      const isReturnVisit = recentlyViewed.some((item) => item.id === product.id);

      amplitude.track("product_page_viewed", {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        price: product.price,
        currency: "USD",
        brand: product.brand,
        is_return_visit: isReturnVisit,
        referrer_source: document.referrer,
        in_stock: product.inStock,
        variant_count: product.variants?.length ?? 0,
        session_id: amplitude.getSessionId(),
      });

      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed, recentlyViewed]);

  useEffect(() => {
    const reviewsElement = reviewsRef.current;
    if (!reviewsElement || !product) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeOnPageSec = (Date.now() - pageLoadTime) / 1000;
          amplitude.track("product_reviews_viewed", {
            product_id: product.id,
            trigger_method: "scroll_into_view",
            review_count: product.reviewCount,
            average_rating: product.rating,
            time_on_page_sec: timeOnPageSec,
            session_id: amplitude.getSessionId(),
          });
          observer.disconnect(); // Fire only once
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(reviewsElement);

    return () => {
      observer.disconnect();
    };
  }, [product, pageLoadTime]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/products"
        className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {/* Image */}
        <div
          className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleImageInteraction}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <WishlistButton product={product} />
          </div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

          <div ref={reviewsRef} className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">
              {`${product.price.toFixed(2)}`}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {`${product.originalPrice.toFixed(2)}`}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selector */}
          <div className="mb-6">
            <VariantSelector product={product} />
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            <AddToCartButton product={product} />
            <BuyNowButton product={product} />
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <RecentlyViewed items={recentlyViewed} currentProductId={product.id} />
    </div>
  );
}
