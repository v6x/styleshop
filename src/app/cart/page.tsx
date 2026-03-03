"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { CartItem } from "@/components/cart-item";
import { track } from "@/lib/analytics/track";

export default function CartPage() {
  const { items, totalPrice } = useCart();

  // BROKEN: no setInterval cleanup → duplicate fires (3-5x)
  useEffect(() => {
    if (items.length > 0) {
      setInterval(() => {
        track("cart_abandon", {
          item_count: items.length,
          cart_total: totalPrice,
          timestamp: new Date().toISOString(),
        });
      }, 10000);
    }
  }, [items.length, totalPrice]);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-500 mb-8">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-bold">
              {`$${totalPrice.toFixed(2)}`}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
