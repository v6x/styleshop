"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { track } from "@/lib/analytics/track";
import { trackLegacyPurchase } from "@/lib/analytics/track";
import { CouponInput } from "@/components/coupon-input";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePurchase = () => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // CLEAN: purchase_complete
    track("purchase_complete", {
      order_id: orderId,
      total_amount: totalPrice,
      item_count: totalItems,
      items: items.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });

    // LEGACY/DUPLICATE: evt_purchase (abbreviated props, duplicates purchase_complete)
    trackLegacyPurchase(orderId, totalPrice, totalItems);

    // LEGACY/DUPLICATE: coupon_applied (duplicates apply_coupon)
    track("coupon_applied", {
      coupon_code: "N/A",
      page: "checkout",
      cart_total: totalPrice,
    });

    clearCart();
    router.push(`/checkout/complete?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-sm py-2"
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>
                {`$${(item.product.price * item.quantity).toFixed(2)}`}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>{`$${totalPrice.toFixed(2)}`}</span>
          </div>
        </div>

        {/* Coupon — LEGACY/DUPLICATE event */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold mb-4">Coupon</h2>
          <CouponInput />
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Shipping Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold"
        >
          {`Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
