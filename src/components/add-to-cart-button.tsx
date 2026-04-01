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
    amplitude.track('product_added_to_cart', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      currency: "USD",
      quantity: 1,
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
