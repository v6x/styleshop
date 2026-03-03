"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { CartItem } from "@/components/cart-item";
import { track } from "@/lib/analytics/track";

export default function CartPage() {
  const { items, totalPrice } = useCart();

  // BROKEN: setInterval cleanup 없음 → 중복 발화 (3-5회)
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (items.length > 0) {
      intervalId = setInterval(() => {
        track("cart_abandon", {
          item_count: items.length,
          cart_total: totalPrice,
          timestamp: new Date().toISOString(),
        });
      }, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [items.length, totalPrice]);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <p className="text-gray-500 mb-8">장바구니가 비어있습니다.</p>
        <Link
          href="/products"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          쇼핑하기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">총 금액</span>
            <span className="text-xl font-bold">
              {totalPrice.toLocaleString()}원
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            결제하기
          </Link>
        </div>
      </div>
    </div>
  );
}
