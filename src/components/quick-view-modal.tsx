"use client";

import { useEffect } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { track } from "@/lib/analytics/track";
import { useToast } from "@/components/toast-provider";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { show } = useToast();

  useEffect(() => {
    // BROKEN: cross-file duplicate of product_viewed (#2) + price is string type mismatch
    track("product_viewed", {
      product_id: product.id,
      product_name: product.name,
      price: `$${product.price.toFixed(2)}`,
      category: product.category,
      source: "quick_view",
    });
  }, [product]);

  const handleAddToCart = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "no_event", action: "click", component: "Add to Cart button" }, "*");
    }
    addItem(product);
    show("Added to cart!", "success");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="aspect-[4/3] bg-gray-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow"
          >
            ×
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 mb-4">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
