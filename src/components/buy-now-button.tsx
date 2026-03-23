"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { track } from "@/lib/analytics/track";

export function BuyNowButton({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleClick = () => {
    addItem(product);

    // BROKEN: price, product_name, source properties are missing
    track("click_buy_now", {
      product_id: product.id,
    });

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
