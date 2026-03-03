"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { track } from "@/lib/analytics/track";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BuyNowButton } from "@/components/buy-now-button";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);

  useEffect(() => {
    if (product) {
      track("product_viewed", {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        category: product.category,
      });
    }
  }, [product]);

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
        <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">
              {`$${product.price.toFixed(2)}`}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {`$${product.originalPrice.toFixed(2)}`}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col gap-3 mt-auto">
            <AddToCartButton product={product} />
            <BuyNowButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
