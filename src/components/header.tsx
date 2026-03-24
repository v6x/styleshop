"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";

export function Header() {
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            StyleShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900"
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className="relative text-gray-600 hover:text-gray-900"
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-gray-900"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
