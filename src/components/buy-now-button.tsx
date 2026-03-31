"use client";

import * as amplitude from '@amplitude/analytics-browser';
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";

export function BuyNowButton({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleClick = () => {
    amplitude.track('buy_now_button_clicked', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      currency: 'USD',
      timestamp_ms: Date.now(),
    });
    addItem(product);
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full border border-gray-900 text-gray-900 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
    >
      Buy Now
    </button>
  );
}
