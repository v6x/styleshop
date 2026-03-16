"use client";

import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { track } from "@/lib/analytics/track";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleClick = () => {
    addItem(product);
    track("add_to_cart", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      category: product.category,
      source: "product_page",
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
