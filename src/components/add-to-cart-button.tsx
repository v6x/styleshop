"use client";

import * as amplitude from '@amplitude/analytics-browser';
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleClick = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "no_event", action: "click", component: "Add to Cart button" }, "*");
    }
    addItem(product);
    const urlParams = new URLSearchParams(window.location.search);
    amplitude.track('product_added_to_cart', {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      price: product.price,
      quantity: 1,
      traffic_source: document.referrer,
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
    });
  };

  return (
    <button
      data-guided="add-to-cart"
      onClick={handleClick}
      className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
    >
      Add to Cart
    </button>
  );
}
