import Link from "next/link";
import { NewsletterSignup } from "./newsletter-signup";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">StyleShop</h3>
            <p className="text-sm text-gray-400">
              Trendy fashion for everyone. New styles updated weekly.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-medium mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/wishlist" className="hover:text-white transition-colors">
                Wishlist
              </Link>
              <Link href="/cart" className="hover:text-white transition-colors">
                Cart
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-sm font-medium mb-3">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe for exclusive deals and new arrivals.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
          © 2026 StyleShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
