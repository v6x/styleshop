"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { track } from "@/lib/analytics/track";
import { trackLegacyPurchase } from "@/lib/analytics/track";
import { CouponInput } from "@/components/coupon-input";
import { CheckoutProgress } from "@/components/checkout-progress";
import { ShippingStep } from "./steps/shipping-step";
import { PaymentStep } from "./steps/payment-step";
import { ReviewStep } from "./steps/review-step";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // LEGACY: checkout_started — missing deps → fires on every render
  useEffect(() => {
    if (items.length > 0) {
      track("checkout_started", {
        item_count: totalItems,
        cart_total: totalPrice,
        timestamp: new Date().toISOString(),
      });
    }
  });

  // CLEAN: checkout_step_viewed
  useEffect(() => {
    if (items.length > 0) {
      track("checkout_step_viewed", {
        step_number: step,
        step_name: ["shipping", "payment", "review"][step - 1],
      });
    }
  }, [step, items.length]);

  const handleShippingComplete = (data: {
    name: string;
    address: string;
    phone: string;
  }) => {
    setShippingData(data);

    // CLEAN: checkout_step_completed for step 1
    track("checkout_step_completed", {
      step_number: 1,
      step_name: "shipping",
    });

    setStep(2);
  };

  const handlePaymentComplete = () => {
    // BROKEN: step 2 uses "step" instead of "step_number" (property name mismatch)
    track("checkout_step_completed", {
      step: 2,
      step_name: "payment",
    });

    setStep(3);
  };

  const handlePurchase = () => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // CLEAN: checkout_step_completed for step 3
    track("checkout_step_completed", {
      step_number: 3,
      step_name: "review",
    });

    // CLEAN: purchase_complete
    track("purchase_complete", {
      order_id: orderId,
      total_amount: totalPrice,
      item_count: totalItems,
      coupon_code: "N/A",
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

      <CheckoutProgress currentStep={step} />

      <div className="space-y-6">
        {/* Order Summary (always visible) */}
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
        {step === 1 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-bold mb-4">Coupon</h2>
            <CouponInput />
          </div>
        )}

        {/* Step Content */}
        {step === 1 && <ShippingStep onNext={handleShippingComplete} />}
        {step === 2 && (
          <PaymentStep
            onNext={handlePaymentComplete}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <ReviewStep
            items={items}
            totalPrice={totalPrice}
            shipping={shippingData}
            onConfirm={handlePurchase}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}
