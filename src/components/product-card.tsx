"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { AddToCartButton } from "./add-to-cart-button";
import { WishlistButton } from "./wishlist-button";
import { QuickViewModal } from "./quick-view-modal";

export function ProductCard({ product }: { product: Product }) {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                SALE
              </span>
            )}
            {/* Wishlist button */}
            <div className="absolute top-3 right-3">
              <WishlistButton product={product} size="sm" />
            </div>
            {/* Quick View trigger */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-gray-900 px-4 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow"
            >
              Quick View
            </button>
          </div>
        </Link>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 mb-2 hover:underline">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold">
              {`$${product.price.toFixed(2)}`}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {`$${product.originalPrice.toFixed(2)}`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}
