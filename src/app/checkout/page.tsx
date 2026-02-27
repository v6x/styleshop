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

    // LEGACY/DUPLICATE: evt_purchase (축약 속성, purchase_complete와 중복)
    trackLegacyPurchase(orderId, totalPrice, totalItems);

    // LEGACY/DUPLICATE: coupon_applied (apply_coupon과 중복)
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
        <h1 className="text-2xl font-bold mb-4">결제</h1>
        <p className="text-gray-500">장바구니가 비어있습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">결제</h1>

      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold mb-4">주문 내역</h2>
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-sm py-2"
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>
                {(item.product.price * item.quantity).toLocaleString()}원
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold">
            <span>합계</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

        {/* Coupon — LEGACY/DUPLICATE 이벤트 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold mb-4">쿠폰</h2>
          <CouponInput />
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold mb-4">배송 정보</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="배송 주소"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="연락처"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold"
        >
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
}
