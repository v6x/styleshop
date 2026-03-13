"use client";

import { Product } from "@/lib/types";
import { useWishlist } from "@/lib/wishlist-store";
import { track } from "@/lib/analytics/track";
import { useToast } from "@/components/toast-provider";

interface WishlistButtonProps {
  product: Product;
  size?: "sm" | "md";
}

export function WishlistButton({ product, size = "md" }: WishlistButtonProps) {
  const { toggle, has } = useWishlist();
  const { show } = useToast();
  const isWished = has(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);

    const action = isWished ? "removed" : "added";

    // CLEAN: wishlist_toggled
    track("wishlist_toggled", {
      product_id: product.id,
      product_name: product.name,
      action,
    });

    if (action === "added") {
      track("wishlist_added", {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
      });
    }

    show(
      isWished ? "Removed from wishlist" : "Added to wishlist",
      isWished ? "info" : "success",
    );
  };

  const sizeClass = size === "sm" ? "w-8 h-8 text-base" : "w-10 h-10 text-xl";

  return (
    <button
      onClick={handleClick}
      className={`${sizeClass} rounded-full flex items-center justify-center transition-colors ${
        isWished
          ? "bg-red-50 text-red-500"
          : "bg-white/80 text-gray-400 hover:text-red-500"
      }`}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWished ? "♥" : "♡"}
    </button>
  );
}
